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
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c1a2e] text-white px-6 py-3 rounded-full text-xs font-bold z-50 transition-all duration-300 shadow-2xl flex items-center gap-2 border border-slate-950 ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}>
            <Sparkles className="w-4 h-4 text-slate-300 animate-pulse" />
            {message}
        </div>
    );
}

const exhibitions = [
    { id: "ex1", name: "GITEX Global 2026", category: "tech", categoryLabel: "💻 Tech", badge: "🔥 Popular", location: "Dubai World Trade Centre", country: "uae", date: "Oct 13–17, 2026", month: "June 2026", price: 48000, tags: ["AI & Technology", "4,500+ exhibitors"], image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=360&fit=crop", description: "The premier global tech show in Dubai, showcasing breakthrough innovations in AI, smart cities, and cloud." },
    { id: "ex2", name: "Hannover Messe 2026", category: "trade", categoryLabel: "🏭 Industry", badge: "", location: "Hannover, Germany", country: "germany", date: "May 4–8, 2026", month: "May 2026", price: 82000, tags: ["Industrial Tech", "Schengen Visa"], image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=360&fit=crop", description: "The world's leading trade fair for industrial technology. Features automation, machinery, and smart manufacturing." },
    { id: "ex3", name: "Art Dubai 2026", category: "art", categoryLabel: "🎨 Art", badge: "", location: "Madinat Jumeirah", country: "uae", date: "Mar 18–21, 2026", month: "June 2026", price: 42000, tags: ["Contemporary Art", "100+ galleries"], image: "https://images.unsplash.com/photo-1531058020387-3be344559be6?w=600&h=360&fit=crop", description: "The leading international art fair in the Middle East, bringing together contemporary works and global curators." },
    { id: "ex4", name: "MEDICA 2026", category: "medical", categoryLabel: "🏥 Medical", badge: "", location: "Düsseldorf, Germany", country: "germany", date: "Nov 17–20, 2026", month: "May 2026", price: 88000, tags: ["Medical Devices", "Pharma"], image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&h=360&fit=crop", description: "The world's largest medical trade show, attracting thousands of exhibitors and experts in healthcare technologies." },
    { id: "ex5", name: "CES 2026 — Las Vegas", category: "tech", categoryLabel: "💡 Electronics", badge: "", location: "Las Vegas, USA", country: "usa", date: "Jan 6–9, 2026", month: "June 2026", price: 115000, tags: ["Consumer Tech", "USA B-1 Visa"], image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=360&fit=crop", description: "The most influential tech event in the world — the proving ground for breakthrough consumer electronics." }
];

export function ExhibitionsPortal() {
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

    const handleBooking = (tourName: string) => {
        window.location.reload();
    };

    return (
        <div className="bg-[#fff5f5] min-h-screen pb-20">
            <Toast message={toastMsg} visible={isToastVisible} onClose={() => setIsToastVisible(false)} />

            {/* Premium Radial Hero */}
            <div className="relative pt-32 pb-20 lg:pt-44 lg:pb-24 px-4 overflow-hidden border-b border-slate-900">
                {/* Full-bleed premium background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&h=900&fit=crop&q=90"
                        alt="Futuristic global exhibition convention hall"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a2e]/90 via-[#0c1a2e]/75 to-[#0c1a2e]/95" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                    <span className="bg-white/10 text-white text-[10px] font-bold tracking-wider px-3.5 py-1.5 rounded-full border border-white/20 mb-4 inline-block backdrop-blur-md">
                        🏛️ Exhibition Packages
                    </span>
                    <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-white leading-tight">
                        Global Exhibitions. <br /><span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Visa Sorted Before You Go.</span>
                    </h1>
                    <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-medium">
                        Trade shows, tech expos, art exhibitions, industry fairs worldwide — attend with your business or tourist visa completely handled by our experts.
                    </p>

                    {/* Exhibition Search Bar Box */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-4 max-w-3xl mx-auto text-left">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5 block">Exhibition Type</label>
                                <select value={exhType} onChange={e => setExhType(e.target.value)} className="w-full bg-slate-50 border border-slate-150 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>All Types</option>
                                    <option>🏭 Trade Show</option>
                                    <option>💻 Tech Expo</option>
                                    <option>🎨 Art Exhibition</option>
                                    <option>🏥 Medical</option>
                                    <option>👗 Fashion</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5 block">Country</label>
                                <select value={exhCountry} onChange={e => setExhCountry(e.target.value)} className="w-full bg-slate-50 border border-slate-150 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Anywhere</option>
                                    <option>🇩🇪 Germany</option>
                                    <option>🇦🇪 UAE / Dubai</option>
                                    <option>🇺🇸 USA</option>
                                    <option>🇬🇧 UK</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5 block">Month</label>
                                <select value={exhMonth} onChange={e => setExhMonth(e.target.value)} className="w-full bg-slate-50 border border-slate-150 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Any Month</option>
                                    <option>May 2026</option>
                                    <option>June 2026</option>
                                    <option>July 2026</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => triggerToast("🔍 Searching exhibitions...")} className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-black transition-all">
                            <Search className="w-4 h-4" /> Search Exhibitions
                        </button>
                    </div>
                </div>
            </div>

            {/* Stat Strip */}
            <div className="bg-slate-50/50 border-y border-slate-100 py-4">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="border-r border-slate-100 last:border-0">
                        <div className="font-sans font-extrabold text-navy text-2xl">240+</div>
                        <div className="text-[10px] font-bold text-gray-400 mt-0.5">Exhibitions Listed</div>
                    </div>
                    <div className="border-r border-slate-100 last:border-0">
                        <div className="font-sans font-extrabold text-navy text-2xl">45+</div>
                        <div className="text-[10px] font-bold text-gray-400 mt-0.5">Countries Covered</div>
                    </div>
                    <div className="border-r border-slate-100 last:border-0">
                        <div className="font-sans font-extrabold text-slate-900 text-2xl">Business Visa</div>
                        <div className="text-[10px] font-bold text-gray-400 mt-0.5">Included in Package</div>
                    </div>
                    <div>
                        <div className="font-sans font-extrabold text-emerald-500 text-2xl">48 Hours</div>
                        <div className="text-[10px] font-bold text-gray-400 mt-0.5">Avg Visa Processing</div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto px-4 mt-8">
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
                                    ? "bg-slate-900 text-white border-transparent shadow-md" 
                                    : "bg-white text-gray-500 border-slate-200 hover:bg-slate-50"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="mb-6">
                    <span className="text-[10px] font-bold text-slate-800 tracking-widest block mb-1">Featured Exhibitions</span>
                    <h2 className="font-sans font-bold text-navy text-xl">Upcoming Global Exhibitions</h2>
                    <p className="text-xs text-gray-400 mt-0.5">All packages include business visa assistance + delegation pass registration + premium hotel stay + airport transfers.</p>
                </div>

                {/* Grid Cards */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(ex => {
                        const countryCode = ex.country ? ex.country.toUpperCase() : "EX";
                        return (
                            <div key={ex.id} onClick={() => handleBooking(ex.name)} className="group bg-[#090f1f] rounded-[2rem] border border-slate-800/80 hover:border-rose-500/30 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-rose-950/15 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between">
                                <div>
                                    {/* Image with gradient overlay and text */}
                                    <div className="relative h-60 overflow-hidden">
                                        <img src={ex.image} alt={ex.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {/* Dark bottom gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/50 to-transparent" />
                                        
                                        {/* Badges on top of image */}
                                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                                            <span className="bg-white/10 backdrop-blur-md text-white font-extrabold border border-white/20 rounded-lg px-2.5 py-1 text-[9px] tracking-wider">
                                                {countryCode}
                                            </span>
                                            <span className="bg-white/10 backdrop-blur-md text-white font-extrabold border border-white/20 rounded-lg px-2.5 py-1 text-[9px] tracking-wider">
                                                {ex.categoryLabel}
                                            </span>
                                        </div>

                                        {/* Overlaid Title */}
                                        <div className="absolute bottom-4 left-5 right-5 z-10">
                                            <span className="text-rose-400 font-medium tracking-normal text-[9px] block mb-1">GLOBAL EXHIBITION</span>
                                            <h3 className="font-sans font-extrabold text-white text-base leading-snug">{ex.name}</h3>
                                        </div>
                                    </div>

                                    {/* Card Content body */}
                                    <div className="p-5 pt-4">
                                        {/* Date & Location Group */}
                                        <div className="flex flex-col gap-2 text-slate-300 text-[11px] font-bold mb-4 border-b border-slate-800/60 pb-3">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                                <span>{ex.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                                <span>{ex.location}</span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-[11px] text-slate-400 leading-relaxed mb-4">{ex.description}</p>

                                        {/* Tags with checkmarks */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {ex.tags.map(t => (
                                                <span key={t} className="bg-slate-900/50 text-slate-200 text-[9px] font-bold px-2.5 py-1 rounded-full border border-slate-800/80 flex items-center gap-1">
                                                    <CheckCircle className="w-2.5 h-2.5 text-rose-400" /> {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer / Bottom Row */}
                                <div className="p-5 pt-3 border-t border-slate-800/60 flex items-center justify-between mt-auto">
                                    <div>
                                        <div className="text-[8px] text-slate-500 font-medium tracking-normal">STARTING FROM</div>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="font-sans font-extrabold text-white text-base">₹{ex.price.toLocaleString()}</span>
                                            <span className="text-[9px] text-slate-500 font-medium">/ delegate</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleBooking(ex.name); }}
                                        className="bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97] shadow-md shadow-rose-950/20"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Business Visa Banner */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex gap-4 items-start shadow-sm mt-8">
                    <div className="text-3xl shrink-0">🛂</div>
                    <div>
                        <h4 className="font-sans font-bold text-navy text-xs sm:text-sm mb-1">Business Visa Included in Every Exhibition Package</h4>
                        <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                            TravlTik assigns a verified business visa coordinator for every delegation booking. We handle local sponsor invitations, event registration confirmation documents, premium hotel bookings, and fast-track processing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

