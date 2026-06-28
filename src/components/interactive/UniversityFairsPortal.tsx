import { useState, useEffect } from "react";
import { 
    Search, MapPin, Calendar, Globe, Sparkles, 
    CheckCircle, GraduationCap, ArrowRight, Award, BookOpen, Clock
} from "lucide-react";

// Toast Helper
function Toast({ message, visible, onClose }: { message: string, visible: boolean, onClose: () => void }) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(onClose, 2600);
            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy text-white px-6 py-3 rounded-full text-xs font-bold z-50 transition-all duration-300 shadow-2xl flex items-center gap-2 border border-red-900 ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}>
            <Sparkles className="w-4 h-4 text-[#a78bfa] animate-pulse" />
            {message}
        </div>
    );
}

const bgGradientMap: Record<string, string> = {
    "from-[#a78bfa] to-[#7c3aed]": "bg-gradient-to-br from-[#a78bfa] to-[#7c3aed]",
    "from-[#fb7185] to-[#e11d48]": "bg-gradient-to-br from-[#fb7185] to-[#e11d48]",
    "from-[#fca5a5] to-[#dc2626]": "bg-gradient-to-br from-[#fca5a5] to-[#dc2626]",
};

// 1. Upcoming Local Fairs (Horizontal Cards)
const localFairs = [
    { id: "lf1", name: "QS World University Tour — Mumbai", location: "Grand Hyatt, Mumbai", date: "14", monthName: "Jun", month: "June 2026", type: "mumbai", destCountry: "canada", time: "10 AM – 5 PM · Free Entry", tags: ["🇨🇦 Canada", "🇬🇧 UK", "80+ universities"], rating: 4.9, registered: 342, image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=360&fit=crop" },
    { id: "lf2", name: "British Council UK University Fair — Bangalore", location: "Taj West End, Bangalore", date: "05", monthName: "Jul", month: "July 2026", type: "bangalore", destCountry: "uk", time: "10 AM – 4 PM · Free Entry", tags: ["🇬🇧 Russell Group", "Scholarships"], rating: 4.9, registered: 187, image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=360&fit=crop" },
    { id: "lf3", name: "IDP Study Abroad Fair — Delhi", location: "The Lalit, New Delhi", date: "22", monthName: "Jun", month: "June 2026", type: "delhi", destCountry: "australia", time: "11 AM – 6 PM · Free Entry", tags: ["🇦🇺 Australia", "🇳🇿 New Zealand"], rating: 4.8, registered: 218, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=360&fit=crop" }
];

// 2. Grid Premium Packages (₹999 Fairs)
const megaFairs = [
    { id: "mf1", name: "Canada Universities Mega Fair", organizer: "CIEC · Mumbai + Delhi + Bangalore", unis: "62 Canadian universities", price: 999, dates: "Jul 18–19", tags: ["UofT", "UBC"], logo: "🇨🇦", country: "canada" },
    { id: "mf2", name: "UK & Ireland University Fair", organizer: "British Council Official", unis: "48 UK + 12 Irish unis", price: 999, dates: "Aug 2–3", tags: ["Oxford", "Imperial"], logo: "🇬🇧", country: "uk" },
    { id: "mf3", name: "Study in Germany Fair", organizer: "DAAD Official Partner", unis: "35 German universities", price: 999, dates: "Sep 6–7", tags: ["TU Munich", "Free education"], logo: "🇩🇪", country: "germany" }
];

export function UniversityFairsPortal() {
    const [toastMsg, setToastMsg] = useState("");
    const [isToastVisible, setIsToastVisible] = useState(false);

    // Search dropdown fields
    const [fairLoc, setFairLoc] = useState("Anywhere");
    const [fairDest, setFairDest] = useState("All Countries");
    const [fairMonth, setFairMonth] = useState("Any Month");
    const [activeCountryFilter, setActiveCountryFilter] = useState("all");

    const triggerToast = (msg: string) => {
        setToastMsg(msg);
        setIsToastVisible(true);
    };

    // Filter Logic
    const getFilteredLocalFairs = () => {
        return localFairs.filter(f => {
            // Location Filter
            const locMap: any = { "📍 Mumbai": "mumbai", "📍 Delhi": "delhi", "📍 Bangalore": "bangalore", "🌐 Online": "online" };
            if (fairLoc !== "Anywhere" && f.type !== locMap[fairLoc]) return false;

            // Study Destination Filter
            const destMap: any = { "🇨🇦 Canada": "canada", "🇬🇧 UK": "uk", "🇦🇺 Australia": "australia", "🇺🇸 USA": "usa" };
            if (fairDest !== "All Countries" && f.destCountry !== destMap[fairDest]) return false;

            // Month Filter
            if (fairMonth !== "Any Month" && f.month !== fairMonth) return false;

            // Chip Country Filter
            if (activeCountryFilter !== "all" && f.destCountry !== activeCountryFilter) return false;

            return true;
        });
    };

    const getFilteredMegaFairs = () => {
        return megaFairs.filter(f => {
            if (activeCountryFilter !== "all" && f.country !== activeCountryFilter) return false;
            return true;
        });
    };

    const filteredLocal = getFilteredLocalFairs();
    const filteredMega = getFilteredMegaFairs();

    const handleBooking = (tourName: string) => {
        window.location.reload();
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <Toast message={toastMsg} visible={isToastVisible} onClose={() => setIsToastVisible(false)} />

            {/* Premium Purple-Indigo Hero */}
            <div className="relative pt-32 pb-20 lg:pt-44 lg:pb-24 px-4 overflow-hidden border-b border-slate-900">
                {/* Full-bleed premium background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1800&h=900&fit=crop&q=90"
                        alt="Ivy League university campus"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d]/95 via-[#0a0f1d]/85 to-[#0a0f1d]/95" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-transparent" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                    <span className="bg-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/20 mb-4 inline-block backdrop-blur-md">
                        🎓 Universities Fairs
                    </span>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-white leading-tight">
                        Meet Top Universities. <br /><span className="text-slate-300">Get Your Student Visa Ready.</span>
                    </h1>
                    <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-medium">
                        Attend world-class university fairs in India and abroad. Talk directly to admissions officers, explore scholarship options, and receive conditional offers on the spot.
                    </p>

                    {/* Fairs Search Box */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-4 max-w-3xl mx-auto text-left">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Fair Location</label>
                                <select value={fairLoc} onChange={e => setFairLoc(e.target.value)} className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none">
                                    <option>Anywhere</option>
                                    <option>📍 Mumbai</option>
                                    <option>📍 Delhi</option>
                                    <option>📍 Bangalore</option>
                                    <option>🌐 Online</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Study Destination</label>
                                <select value={fairDest} onChange={e => setFairDest(e.target.value)} className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none">
                                    <option>All Countries</option>
                                    <option>🇨🇦 Canada</option>
                                    <option>🇬🇧 UK</option>
                                    <option>🇦🇺 Australia</option>
                                    <option>🇺🇸 USA</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Month</label>
                                <select value={fairMonth} onChange={e => setFairMonth(e.target.value)} className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none">
                                    <option>Any Month</option>
                                    <option>May 2026</option>
                                    <option>June 2026</option>
                                    <option>July 2026</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => triggerToast("🎓 Searching university fairs...")} className="w-full bg-black hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 hover:shadow-lg transition-all">
                            <Search className="w-4 h-4" /> Search Fairs
                        </button>
                    </div>
                </div>
            </div>

            {/* Stat Strip */}
            <div className="bg-slate-100/50 border-y border-slate-200 py-4">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="border-r border-slate-200 last:border-0">
                        <div className="font-sora font-extrabold text-slate-900 text-2xl">120+</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Fairs Every Year</div>
                    </div>
                    <div className="border-r border-slate-200 last:border-0">
                        <div className="font-sora font-extrabold text-slate-900 text-2xl">500+</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Universities Attend</div>
                    </div>
                    <div className="border-r border-slate-200 last:border-0">
                        <div className="font-sora font-extrabold text-slate-900 text-2xl">Free Entry</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">To Most Fairs</div>
                    </div>
                    <div>
                        <div className="font-sora font-extrabold text-slate-900 text-2xl">Spot Check</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Student Visa Assistance</div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto px-4 mt-8">
                {/* Chip Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {[
                        { key: "all", label: "All Fairs" },
                        { key: "canada", label: "🇨🇦 Canada" },
                        { key: "uk", label: "🇬🇧 UK" },
                        { key: "australia", label: "🇦🇺 Australia" }
                    ].map(item => (
                        <button 
                            key={item.key} 
                            onClick={() => { setActiveCountryFilter(item.key); triggerToast(`Showing ${item.label} Fairs`); }}
                            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                                activeCountryFilter === item.key 
                                    ? "bg-black text-white border-transparent shadow-md" 
                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="mb-6">
                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest block mb-1">Upcoming Fairs</span>
                    <h2 className="font-sora font-bold text-slate-900 text-xl">University Fairs Near You</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Register for free. Meet verified international admissions officers directly.</p>
                </div>

                {/* 3 Columns Grid Local Fairs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {filteredLocal.map(fair => (
                        <div key={fair.id} onClick={() => handleBooking(fair.name)} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between">
                            <div>
                                {/* Realistic Event Image Header */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img 
                                        src={fair.image} 
                                        alt={fair.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Date overlay badge */}
                                    <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md border border-white/20 text-white rounded-2xl w-14 h-14 flex flex-col items-center justify-center shrink-0 shadow-lg">
                                        <span className="font-sora font-extrabold text-lg leading-none">{fair.date}</span>
                                        <span className="text-[9px] font-bold uppercase tracking-widest mt-1">{fair.monthName}</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <span className="inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full mb-2.5 bg-slate-100 text-slate-800 border border-slate-200">
                                        ⭐ {fair.rating} · {fair.registered} spots
                                    </span>
                                    <h3 className="font-sora font-bold text-slate-900 text-sm group-hover:text-black transition-colors leading-snug mb-4">{fair.name}</h3>

                                    {/* Middle: Location & Time */}
                                    <div className="text-xs text-slate-600 space-y-1.5 mb-4 font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {fair.location}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {fair.time}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {fair.tags.map(t => (
                                            <span key={t} className="bg-slate-50 text-slate-700 text-[9px] font-bold px-2.5 py-1 rounded-full border border-slate-200">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom: Action row */}
                            <div className="flex justify-between items-center p-6 pt-4 border-t border-slate-100 mt-auto">
                                <span className="text-[10px] text-slate-700 font-extrabold uppercase tracking-wider">Free Registration</span>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleBooking(fair.name); }}
                                    className="bg-black hover:bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-[0.97]"
                                >
                                    Register Free →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3 Columns Grid Mega Fairs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMega.map(fair => (
                        <div key={fair.id} onClick={() => handleBooking(fair.name)} className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                            <div className="flex gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shrink-0">
                                    {fair.logo}
                                </div>
                                <div>
                                    <h4 className="font-sora font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-black transition-colors">{fair.name}</h4>
                                    <div className="text-[10px] text-gray-400 mt-0.5 leading-normal">{fair.organizer}</div>
                                    <div className="text-[10px] text-slate-700 font-bold mt-1">{fair.unis}</div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-4">
                                <span className="bg-slate-50 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-slate-200">{fair.tags[0]}</span>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                <div className="text-[10px] text-gray-400 font-bold">{fair.dates}</div>
                                <div className="flex items-center gap-3">
                                    <span className="font-sora font-extrabold text-slate-900 text-sm">₹{fair.price}</span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleBooking(fair.name); }}
                                        className="bg-black hover:bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-[0.97]"
                                    >
                                        Book Space
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Free Entry Alert Banner */}
                <div className="bg-slate-100/50 border border-slate-200 rounded-2xl p-5 flex gap-4 items-start shadow-sm mt-8">
                    <div className="text-3xl shrink-0">✓</div>
                    <div>
                        <h4 className="font-sora font-bold text-slate-900 text-xs sm:text-sm mb-1">Free Entry to Most Fairs — You Only Pay for Premium Visa Prep</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                            While fair entrance is officially free, VisaFormula's ₹999 premium prep package saves months of effort: includes pre-fair profiles and transcript checks, post-fair student visa consults with certified advisors, and customized application checklists.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
