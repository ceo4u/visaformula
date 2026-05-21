"use client";

import { useState, useEffect } from "react";
import { 
    Search, MapPin, Calendar, Globe, Sparkles, 
    ArrowRight, CheckCircle, Cpu, Hammer, Palette, Activity
} from "lucide-react";

// Toast Notification Helper
function Toast({ message, visible, onClose }: { message: string, visible: boolean, onClose: () => void }) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(onClose, 2600);
            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy text-white px-6 py-3 rounded-full text-xs font-bold z-50 transition-all duration-300 shadow-2xl flex items-center gap-2 border border-sky-950 ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}>
            <Sparkles className="w-4 h-4 text-[#0ea5e9] animate-pulse" />
            {message}
        </div>
    );
}

// Exhibitions Data
const exhibitions = [
    { id: "ex1", name: "GITEX Global 2025", category: "tech", categoryLabel: "💻 Tech", badge: "🔥 Popular", location: "Dubai World Trade Centre", country: "uae", date: "Oct 13–17, 2025", month: "June 2025", price: 48000, tags: ["AI & Technology", "4,500+ exhibitors"], image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=360&fit=crop", description: "The premier global tech show in Dubai, showcasing breakthrough innovations in AI, smart cities, and cloud." },
    { id: "ex2", name: "Hannover Messe 2025", category: "trade", categoryLabel: "🏭 Industry", badge: "", location: "Hannover, Germany", country: "germany", date: "May 4–8, 2025", month: "May 2025", price: 82000, tags: ["Industrial Tech", "Schengen Visa"], image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=360&fit=crop", description: "The world's leading trade fair for industrial technology. Features automation, machinery, and smart manufacturing." },
    { id: "ex3", name: "Art Dubai 2026", category: "art", categoryLabel: "🎨 Art", badge: "", location: "Madinat Jumeirah", country: "uae", date: "Mar 18–21, 2026", month: "June 2025", price: 42000, tags: ["Contemporary Art", "100+ galleries"], image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=600&h=360&fit=crop", description: "The leading international art fair in the Middle East, bringing together contemporary works and global curators." },
    { id: "ex4", name: "MEDICA 2025", category: "medical", categoryLabel: "🏥 Medical", badge: "", location: "Düsseldorf, Germany", country: "germany", date: "Nov 17–20, 2025", month: "May 2025", price: 88000, tags: ["Medical Devices", "Pharma"], image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=360&fit=crop", description: "The world's largest medical trade show, attracting thousands of exhibitors and experts in healthcare technologies." },
    { id: "ex5", name: "CES 2026 — Las Vegas", category: "tech", categoryLabel: "💡 Electronics", badge: "", location: "Las Vegas, USA", country: "usa", date: "Jan 6–9, 2026", month: "June 2025", price: 115000, tags: ["Consumer Tech", "USA B-1 Visa"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=360&fit=crop", description: "The most influential tech event in the world — the proving ground for breakthrough consumer electronics." }
];

export default function ExhibitionsPage() {
    const [toastMsg, setToastMsg] = useState("");
    const [isToastVisible, setIsToastVisible] = useState(false);

    // Filter and Search States
    const [exhType, setExhType] = useState("All Types");
    const [exhCountry, setExhCountry] = useState("Anywhere");
    const [exhMonth, setExhMonth] = useState("Any Month");
    const [activeCategory, setActiveCategory] = useState("all");

    const triggerToast = (msg: string) => {
        setToastMsg(msg);
        setIsToastVisible(true);
    };

    const getFilteredExhibitions = () => {
        return exhibitions.filter(ex => {
            // Select Dropdown - Type mapping
            const typeMap: any = {
                "🏭 Trade Show": "trade",
                "💻 Tech Expo": "tech",
                "🎨 Art Exhibition": "art",
                "🏥 Medical": "medical",
                "👗 Fashion": "fashion"
            };
            if (exhType !== "All Types" && ex.category !== typeMap[exhType]) return false;

            // Country mapping
            const countryMap: any = {
                "🇩🇪 Germany": "germany",
                "🇦🇪 UAE / Dubai": "uae",
                "🇺🇸 USA": "usa",
                "🇬🇧 UK": "uk"
            };
            if (exhCountry !== "Anywhere" && ex.country !== countryMap[exhCountry]) return false;

            // Month mapping
            if (exhMonth !== "Any Month" && ex.month !== exhMonth) return false;

            // Chip filter
            if (activeCategory !== "all" && ex.category !== activeCategory) return false;

            return true;
        });
    };

    const filtered = getFilteredExhibitions();

    return (
        <div className="bg-[#f7fbff] min-h-screen pb-20">
            <Toast message={toastMsg} visible={isToastVisible} onClose={() => setIsToastVisible(false)} />

            {/* Premium Radial Hero */}
            <div className="relative bg-gradient-to-br from-white via-sky-50/50 to-white pt-16 pb-12 px-4 overflow-hidden border-b border-sky-100">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_-10%,rgba(186,230,253,0.45),transparent_60%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="bg-sky-100 text-[#0ea5e9] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-sky-200/40 mb-4 inline-block">
                        🏛️ Exhibition Packages
                    </span>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold text-navy tracking-tight mb-3">
                        Global Exhibitions. <br /><span className="bg-gradient-to-r from-sky-400 to-[#0284c7] bg-clip-text text-transparent">Visa Sorted Before You Go.</span>
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                        Trade shows, tech expos, art exhibitions, industry fairs worldwide — attend with your business or tourist visa completely handled by our experts.
                    </p>

                    {/* Exhibition Search Bar Box */}
                    <div className="bg-white rounded-2xl border border-sky-100 shadow-xl p-4 max-w-3xl mx-auto text-left">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Exhibition Type</label>
                                <select value={exhType} onChange={e => setExhType(e.target.value)} className="w-full bg-sky-50/30 border border-sky-100 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>All Types</option>
                                    <option>🏭 Trade Show</option>
                                    <option>💻 Tech Expo</option>
                                    <option>🎨 Art Exhibition</option>
                                    <option>🏥 Medical</option>
                                    <option>👗 Fashion</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Country</label>
                                <select value={exhCountry} onChange={e => setExhCountry(e.target.value)} className="w-full bg-sky-50/30 border border-sky-100 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Anywhere</option>
                                    <option>🇩🇪 Germany</option>
                                    <option>🇦🇪 UAE / Dubai</option>
                                    <option>🇺🇸 USA</option>
                                    <option>🇬🇧 UK</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Month</label>
                                <select value={exhMonth} onChange={e => setExhMonth(e.target.value)} className="w-full bg-sky-50/30 border border-sky-100 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Any Month</option>
                                    <option>May 2025</option>
                                    <option>June 2025</option>
                                    <option>July 2025</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => triggerToast("🔍 Searching exhibitions...")} className="w-full bg-gradient-to-r from-sky-400 to-[#0ea5e9] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-sky-150 transition-all">
                            <Search className="w-4 h-4" /> Search Exhibitions
                        </button>
                    </div>
                </div>
            </div>

            {/* Stat Strip */}
            <div className="bg-sky-50/50 border-y border-sky-100 py-4">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="border-r border-sky-100 last:border-0">
                        <div className="font-sora font-extrabold text-navy text-2xl">240+</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Exhibitions Listed</div>
                    </div>
                    <div className="border-r border-sky-100 last:border-0">
                        <div className="font-sora font-extrabold text-navy text-2xl">45+</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Countries Covered</div>
                    </div>
                    <div className="border-r border-sky-100 last:border-0">
                        <div className="font-sora font-extrabold text-[#0ea5e9] text-2xl">Business Visa</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Included in Package</div>
                    </div>
                    <div>
                        <div className="font-sora font-extrabold text-emerald-500 text-2xl">48 Hours</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Avg Visa Processing</div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto px-4 mt-8">
                {/* Chip Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {[
                        { key: "all", label: "All Exhibitions" },
                        { key: "tech", label: "💻 Tech Expo" },
                        { key: "trade", label: "🏭 Trade Show" },
                        { key: "art", label: "🎨 Art Shows" },
                        { key: "medical", label: "🏥 Medical" }
                    ].map(item => (
                        <button 
                            key={item.key} 
                            onClick={() => { setActiveCategory(item.key); triggerToast(`Showing ${item.label}`); }}
                            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                                activeCategory === item.key 
                                    ? "bg-[#0ea5e9] text-white border-transparent shadow-md" 
                                    : "bg-white text-gray-500 border-sky-100 hover:bg-sky-50"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="mb-6">
                    <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest block mb-1">Featured Exhibitions</span>
                    <h2 className="font-sora font-bold text-navy text-xl">Upcoming Global Exhibitions</h2>
                    <p className="text-xs text-gray-400 mt-0.5">All packages include business visa assistance + delegation pass registration + premium hotel stay + airport transfers.</p>
                </div>

                {/* Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(ex => (
                        <div key={ex.id} onClick={() => triggerToast(`💻 ${ex.name} details`)} className="group bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                            <div className="relative h-44 overflow-hidden">
                                <img src={ex.image} alt={ex.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 left-3 flex gap-1.5">
                                    <span className="bg-sky-50 text-[#0ea5e9] text-[9px] font-bold px-2 py-0.5 rounded-full border border-sky-100">{ex.categoryLabel}</span>
                                    {ex.badge && <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">{ex.badge}</span>}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-sora font-bold text-navy text-sm mb-1 group-hover:text-[#0ea5e9] transition-colors leading-snug">{ex.name}</h3>
                                <div className="text-[10px] text-gray-400 font-bold mb-3 flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5 text-sky-400" /> {ex.location} · {ex.date}
                                </div>
                                <p className="text-[11px] text-gray-500 leading-relaxed mb-4">{ex.description}</p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {ex.tags.map(t => (
                                        <span key={t} className="bg-sky-50/50 text-gray-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-sky-100/50">{t}</span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-sky-50">
                                    <div>
                                        <div className="font-sora font-extrabold text-[#0ea5e9] text-base">₹{ex.price.toLocaleString()}</div>
                                        <div className="text-[9px] text-gray-400">visa + hotel + pass</div>
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); triggerToast(`📅 Booking ${ex.name}!`); }}
                                        className="bg-gradient-to-r from-sky-400 to-[#0ea5e9] text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-[0.97]"
                                    >
                                        Book Delegation
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Business Visa Banner */}
                <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 flex gap-4 items-start shadow-sm mt-8">
                    <div className="text-3xl shrink-0">🛂</div>
                    <div>
                        <h4 className="font-sora font-bold text-navy text-xs sm:text-sm mb-1">Business Visa Included in Every Exhibition Package</h4>
                        <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                            Visara assigns a verified business visa coordinator for every delegation booking. We handle local sponsor invitations, event registration confirmation documents, premium hotel bookings, and fast-track processing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
