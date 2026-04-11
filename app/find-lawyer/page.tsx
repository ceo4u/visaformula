"use client";

import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Sparkles, Flag, Users, Briefcase, Globe, MapPin, Plus, Minus } from "lucide-react";
import Link from "next/link";

const results = [
    {
        rank: 1,
        name: "Aristha Law Group, P.C.",
        rating: 4.5,
        reviews: 128,
        status: "Open",
        statusOpen: true,
        price: "$$$",
        distance: "1.2 mi",
        tags: [{ icon: Flag, label: "Employment Visa" }, { icon: Briefcase, label: "Emergency Services" }],
        desc: "Specializing in H-1B, O-1, and EB-1 petitions for tech professionals. Known for high success rates in complex RFE responses.",
        aiInsight: "Users report Aristha handled an urgent deportation stay within 4 hours. Highly recommended for critical timelines.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
        emergency: true,
    },
    {
        rank: 2,
        name: "Marcus Chen & Associates",
        rating: 5.0,
        reviews: 84,
        status: "Closes 5PM",
        statusOpen: false,
        price: "$$",
        distance: "3.5 mi",
        tags: [{ icon: Users, label: "Family Reunification" }],
        desc: "Dedicated to connecting families across borders. Expertise in K-1 visas, green card renewals, and naturalization interviews.",
        aiInsight: "Consistently rated 5 stars for clear communication and transparent flat-fee pricing structures.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        emergency: false,
    },
    {
        rank: 3,
        name: "Global Frontier Legal",
        rating: 4.5,
        reviews: 214,
        status: "Open",
        statusOpen: true,
        price: "$$$$",
        distance: "0.8 mi",
        tags: [{ icon: Briefcase, label: "EB-5 Investor" }, { icon: Globe, label: "Asylum" }],
        desc: "Premium legal advisory for high-net-worth investors and complex corporate relocation. Multilingual staff available 24/7.",
        aiInsight: "Expert team handles large-scale corporate transfers with high precision. Best for institutional clients.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
        emergency: false,
    },
];

function StarRating({ count }: { count: number }) {
    return (
        <div className="flex text-primary">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-[18px] h-[18px]" fill={i <= count ? "currentColor" : "none"} strokeWidth={i <= count ? 0 : 1.5} />
            ))}
        </div>
    );
}

export default function FindLawyerPage() {
    return (
        <div>
            {/* Filter Bar */}
            <header className="bg-surface-container-lowest border-b border-surface-container-high py-4 sticky top-16 z-40">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                            <span className="text-sm font-bold text-on-surface whitespace-nowrap mr-2">243 experts found</span>
                            {["Lawyers", "4.5+ ★", "Emergency", "Price ▾"].map((filter, i) => (
                                <button key={filter} className={`flex items-center gap-1 px-3 py-1.5 border rounded-full text-sm font-medium transition-colors whitespace-nowrap ${i === 2 ? "border-red-200 bg-red-50 text-red-700" : "border-surface-container-highest hover:bg-surface-container-low"}`}>
                                    {filter}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-on-surface-variant font-medium">Sort:</span>
                            <button className="flex items-center gap-1 text-sm font-bold text-on-surface">
                                Recommended ▾
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto flex flex-col md:flex-row">
                {/* Results List */}
                <section className="w-full md:w-[60%] p-6 space-y-6">
                    {results.map((r, idx) => (
                        <motion.div
                            key={r.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link href={`/lawyer/${r.rank}`}>
                                <div className={`bg-surface-container-lowest rounded-xl shadow-editorial overflow-hidden flex flex-col sm:flex-row p-5 gap-5 hover:shadow-editorial-lg transition-shadow ${r.emergency ? "border-l-[3px] border-primary" : ""}`}>
                                    <div className="flex-shrink-0 flex flex-col items-center">
                                        <span className="text-lg font-black text-on-surface mb-2">{r.rank}.</span>
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-surface-container-high">
                                            <img alt={r.name} src={r.image} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <div className="flex-grow space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-bold text-on-surface hover:text-primary transition-colors font-heading">{r.name}</h2>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <StarRating count={Math.floor(r.rating)} />
                                                    <span className="text-sm font-medium text-on-surface-variant ml-1">{r.reviews} reviews</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${r.statusOpen ? "bg-tertiary-container text-white" : "bg-surface-container-highest text-on-surface-variant"}`}>
                                                    {r.status}
                                                </span>
                                                <div className="text-xs font-bold text-on-surface-variant mt-1">{r.price} • {r.distance}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 py-1">
                                            {r.tags.map((tag) => (
                                                <span key={tag.label} className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container text-xs font-bold text-on-surface rounded-lg">
                                                    <tag.icon className="w-3 h-3" /> {tag.label}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed">{r.desc}</p>
                                        <div className="bg-surface-container-low p-3 rounded-lg flex gap-3 items-start border border-surface-container-high mt-3">
                                            <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                            <p className="text-xs text-on-surface italic">&ldquo;{r.aiInsight}&rdquo; — VisaHub AI</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Pagination */}
                    <div className="flex items-center justify-center pt-8 gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container-high hover:bg-surface-container-low text-on-surface-variant transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {[1, 2, 3, 4].map((p) => (
                            <button key={p} className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium ${p === 1 ? "bg-primary text-white font-bold shadow-md" : "border border-surface-container-high hover:bg-surface-container-low text-on-surface-variant"} transition-colors`}>
                                {p}
                            </button>
                        ))}
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-container-high hover:bg-surface-container-low text-on-surface-variant transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </section>

                {/* Map Panel */}
                <aside className="hidden md:block w-[40%] sticky top-32 h-[calc(100vh-8rem)] overflow-hidden bg-surface-container border-l border-surface-container-high">
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=900&fit=crop')" }} />
                        {/* Map Pins */}
                        {[{ top: "25%", left: "35%", rank: 1 }, { top: "55%", left: "60%", rank: 2 }, { top: "40%", left: "20%", rank: 3 }].map((pin) => (
                            <div key={pin.rank} className="absolute group" style={{ top: pin.top, left: pin.left }}>
                                <div className="bg-primary text-white font-bold text-xs px-2 py-1 rounded shadow-lg transform -translate-x-1/2 -translate-y-full mb-1">{pin.rank}</div>
                                <MapPin className="w-8 h-8 text-primary drop-shadow-md" fill="currentColor" />
                            </div>
                        ))}
                        {/* Zoom Controls */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            <button className="bg-white p-2 rounded-lg shadow-md hover:bg-neutral-50 transition-colors"><Plus className="w-4 h-4" /></button>
                            <button className="bg-white p-2 rounded-lg shadow-md hover:bg-neutral-50 transition-colors"><Minus className="w-4 h-4" /></button>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
