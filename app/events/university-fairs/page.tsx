"use client";

import { useState, useEffect } from "react";
import { 
    Search, MapPin, Calendar, Globe, Sparkles, 
    CheckCircle, GraduationCap, ArrowRight, Award, BookOpen
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
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy text-white px-6 py-3 rounded-full text-xs font-bold z-50 transition-all duration-300 shadow-2xl flex items-center gap-2 border border-sky-950 ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}>
            <Sparkles className="w-4 h-4 text-[#a78bfa] animate-pulse" />
            {message}
        </div>
    );
}

// 1. Upcoming Local Fairs (Horizontal Cards)
const localFairs = [
    { id: "lf1", name: "QS World University Tour — Mumbai", location: "Grand Hyatt, Mumbai", date: "14", monthName: "Jun", month: "June 2026", type: "mumbai", destCountry: "canada", time: "10 AM – 5 PM · Free Entry", tags: ["🇨🇦 Canada", "🇬🇧 UK", "80+ universities"], rating: 4.9, registered: 342, bg: "from-[#a78bfa] to-[#7c3aed]" },
    { id: "lf2", name: "British Council UK University Fair — Bangalore", location: "Taj West End, Bangalore", date: "05", monthName: "Jul", month: "July 2026", type: "bangalore", destCountry: "uk", time: "10 AM – 4 PM · Free Entry", tags: ["🇬🇧 Russell Group", "Scholarships"], rating: 4.9, registered: 187, bg: "from-[#fb7185] to-[#e11d48]" },
    { id: "lf3", name: "IDP Study Abroad Fair — Delhi", location: "The Lalit, New Delhi", date: "22", monthName: "Jun", month: "June 2026", type: "delhi", destCountry: "australia", time: "11 AM – 6 PM · Free Entry", tags: ["🇦🇺 Australia", "🇳🇿 New Zealand"], rating: 4.8, registered: 218, bg: "from-[#38bdf8] to-[#0284c7]" }
];

// 2. Grid Premium Packages (₹999 Fairs)
const megaFairs = [
    { id: "mf1", name: "Canada Universities Mega Fair", organizer: "CIEC · Mumbai + Delhi + Bangalore", unis: "62 Canadian universities", price: 999, dates: "Jul 18–19", tags: ["UofT", "UBC"], logo: "🇨🇦", country: "canada" },
    { id: "mf2", name: "UK & Ireland University Fair", organizer: "British Council Official", unis: "48 UK + 12 Irish unis", price: 999, dates: "Aug 2–3", tags: ["Oxford", "Imperial"], logo: "🇬🇧", country: "uk" },
    { id: "mf3", name: "Study in Germany Fair", organizer: "DAAD Official Partner", unis: "35 German universities", price: 999, dates: "Sep 6–7", tags: ["TU Munich", "Free education"], logo: "🇩🇪", country: "germany" }
];

export default function UniversityFairsPage() {
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

    return (
        <div className="bg-[#f7fbff] min-h-screen pb-20">
            <Toast message={toastMsg} visible={isToastVisible} onClose={() => setIsToastVisible(false)} />

            {/* Premium Purple-Indigo Hero */}
            <div className="relative bg-gradient-to-br from-white via-violet-50/30 to-white pt-16 pb-12 px-4 overflow-hidden border-b border-purple-100">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_-10%,rgba(167,139,250,0.25),transparent_55%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="bg-purple-50 text-[#7c3aed] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-purple-200/40 mb-4 inline-block">
                        🎓 Universities Fairs
                    </span>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold text-navy tracking-tight mb-3">
                        Meet Top Universities. <br /><span className="bg-gradient-to-r from-purple-400 to-[#7c3aed] bg-clip-text text-transparent">Get Your Student Visa Ready.</span>
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                        Attend world-class university fairs in India and abroad. Talk directly to admissions officers, explore scholarship options, and receive conditional offers on the spot.
                    </p>

                    {/* Fairs Search Box */}
                    <div className="bg-white rounded-2xl border border-purple-100 shadow-xl p-4 max-w-3xl mx-auto text-left">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Fair Location</label>
                                <select value={fairLoc} onChange={e => setFairLoc(e.target.value)} className="w-full bg-purple-50/10 border border-purple-100 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Anywhere</option>
                                    <option>📍 Mumbai</option>
                                    <option>📍 Delhi</option>
                                    <option>📍 Bangalore</option>
                                    <option>🌐 Online</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Study Destination</label>
                                <select value={fairDest} onChange={e => setFairDest(e.target.value)} className="w-full bg-purple-50/10 border border-purple-100 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>All Countries</option>
                                    <option>🇨🇦 Canada</option>
                                    <option>🇬🇧 UK</option>
                                    <option>🇦🇺 Australia</option>
                                    <option>🇺🇸 USA</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Month</label>
                                <select value={fairMonth} onChange={e => setFairMonth(e.target.value)} className="w-full bg-purple-50/10 border border-purple-100 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Any Month</option>
                                    <option>May 2026</option>
                                    <option>June 2026</option>
                                    <option>July 2026</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => triggerToast("🎓 Searching university fairs...")} className="w-full bg-gradient-to-r from-purple-500 to-[#7c3aed] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-purple-150 transition-all">
                            <Search className="w-4 h-4" /> Search Fairs
                        </button>
                    </div>
                </div>
            </div>

            {/* Stat Strip */}
            <div className="bg-purple-50/30 border-y border-purple-100 py-4">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="border-r border-purple-100 last:border-0">
                        <div className="font-sora font-extrabold text-navy text-2xl">120+</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Fairs Every Year</div>
                    </div>
                    <div className="border-r border-purple-100 last:border-0">
                        <div className="font-sora font-extrabold text-navy text-2xl">500+</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Universities Attend</div>
                    </div>
                    <div className="border-r border-purple-100 last:border-0">
                        <div className="font-sora font-extrabold text-[#7c3aed] text-2xl">Free Entry</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">To Most Fairs</div>
                    </div>
                    <div>
                        <div className="font-sora font-extrabold text-emerald-500 text-2xl">Spot Check</div>
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
                                    ? "bg-[#7c3aed] text-white border-transparent shadow-md" 
                                    : "bg-white text-gray-500 border-sky-100 hover:bg-sky-50"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="mb-6">
                    <span className="text-[10px] font-bold text-[#7c3aed] uppercase tracking-widest block mb-1">Upcoming Fairs</span>
                    <h2 className="font-sora font-bold text-navy text-xl">University Fairs Near You</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Register for free. Meet verified international admissions officers directly.</p>
                </div>

                {/* Horizontal Local Fair Cards */}
                <div className="flex flex-col gap-3 mb-10">
                    {filteredLocal.map(fair => (
                        <div key={fair.id} onClick={() => triggerToast(`🎓 ${fair.name} details`)} className="group bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300 flex flex-col md:flex-row gap-0 cursor-pointer">
                            <div className={`w-full md:w-20 bg-gradient-to-br ${fair.bg} flex flex-row md:flex-col items-center justify-center text-white shrink-0 p-3 md:p-2 gap-2 md:gap-0`}>
                                <div className="font-sora font-extrabold text-2xl sm:text-3xl line-height-1">{fair.date}</div>
                                <div className="text-[9px] font-bold text-white/85 uppercase tracking-widest mt-0.5">{fair.monthName}</div>
                            </div>
                            <div className="flex-1 p-4 min-w-0">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div>
                                        <h3 className="font-sora font-bold text-navy text-sm group-hover:text-[#7c3aed] transition-colors leading-snug">{fair.name}</h3>
                                        <div className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                                            {fair.location} · {fair.time}
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-2.5">
                                            {fair.tags.map(t => (
                                                <span key={t} className="bg-sky-50 text-sky-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-sky-100">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0 sm:self-start">
                                        <div className="text-emerald-500 font-bold text-xs">Free Registration</div>
                                        <span className="inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full mt-1.5 bg-purple-50 text-[#7c3aed] border border-purple-100">
                                            ⭐ {fair.rating} · {fair.registered} spots
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4 pt-3 border-t border-sky-50">
                                    <span className="text-[10px] text-gray-400">Admissions + Profile Assessment on Spot</span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); triggerToast(`🎓 Registered for ${fair.name}!`); }}
                                        className={`bg-gradient-to-r ${fair.bg} text-white px-5 py-1.5 rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-[0.97]`}
                                    >
                                        Register Free →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3 Columns Grid Mega Fairs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMega.map(fair => (
                        <div key={fair.id} onClick={() => triggerToast(`🎓 ${fair.name} package`)} className="group bg-white rounded-2xl border border-sky-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                            <div className="flex gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-50/50 border border-sky-100 flex items-center justify-center text-2xl shrink-0">
                                    {fair.logo}
                                </div>
                                <div>
                                    <h4 className="font-sora font-bold text-navy text-xs sm:text-sm leading-snug group-hover:text-[#7c3aed] transition-colors">{fair.name}</h4>
                                    <div className="text-[10px] text-gray-400 mt-0.5 leading-normal">{fair.organizer}</div>
                                    <div className="text-[10px] text-[#7c3aed] font-semibold mt-1">{fair.unis}</div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-4">
                                {fair.tags.map(t => (
                                    <span key={t} className="bg-sky-50 text-sky-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-sky-100">{t}</span>
                                ))}
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-sky-50">
                                <div className="text-[10px] text-gray-400 font-bold">{fair.dates}</div>
                                <div className="flex items-center gap-3">
                                    <span className="font-sora font-extrabold text-navy text-sm">₹{fair.price}</span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); triggerToast(`Booking ${fair.name} package!`); }}
                                        className="bg-[#7c3aed] text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-[0.97]"
                                    >
                                        Book Space
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Free Entry Alert Banner */}
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 flex gap-4 items-start shadow-sm mt-8">
                    <div className="text-3xl shrink-0">✅</div>
                    <div>
                        <h4 className="font-sora font-bold text-[#0c6b4a] text-xs sm:text-sm mb-1">Free Entry to Most Fairs — You Only Pay for Premium Visa Prep</h4>
                        <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                            While fair entrance is officially free, Visara's ₹999 premium prep package saves months of effort: includes pre-fair profiles and transcript checks, post-fair student visa consults with certified advisors, and customized application checklists.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
