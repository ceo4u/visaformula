import { useState, useEffect } from "react";
import { BookOpen, Star, MapPin, Clock, Users, Filter, ArrowRight, Target, Sparkles } from "lucide-react";

// Toast Helper
function Toast({ message, visible, onClose }: { message: string, visible: boolean, onClose: () => void }) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(onClose, 2600);
            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c1a2e] text-white px-6 py-3 rounded-full text-xs font-bold z-50 transition-all duration-300 shadow-2xl flex items-center gap-2 border border-amber-900 ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}>
            <Sparkles className="w-4 h-4 text-[#a78bfa] animate-pulse" />
            {message}
        </div>
    );
}

const institutes = [
    { name: "British Council", city: "Mumbai", rating: 4.9, batches: "Morning / Evening / Weekend", fee: "18,500", students: "5K+", nextBatch: "Jun 14", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop" },
    { name: "IDP Education", city: "Delhi", rating: 4.8, batches: "Morning / Afternoon", fee: "16,000", students: "4K+", nextBatch: "Jun 18", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
    { name: "IELTS Academy Pro", city: "Hyderabad", rating: 4.7, batches: "Weekend Intensive", fee: "12,000", students: "2.5K+", nextBatch: "Jun 20", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop" },
    { name: "Pearson PTE Center", city: "Bangalore", rating: 4.6, batches: "Full-time / Part-time", fee: "14,000", students: "1.8K+", nextBatch: "Jun 16", image: "https://images.unsplash.com/photo-1577036421869-7c8d388d2123?w=400&h=300&fit=crop" },
    { name: "Global English Hub", city: "Pune", rating: 4.8, batches: "Morning / Online", fee: "10,500", students: "3K+", nextBatch: "Jun 15", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop" },
    { name: "Prep Zone IELTS", city: "Chennai", rating: 4.5, batches: "Evening / Weekend", fee: "11,000", students: "2K+", nextBatch: "Jun 22", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&h=300&fit=crop" },
];

const scoreTargets = [
    { band: "6.0", desc: "Most study permits", color: "bg-amber-50 text-amber-700 border-amber-200/50" },
    { band: "6.5", desc: "Canada Express Entry", color: "bg-yellow-50 text-amber-700 border-yellow-200/50" },
    { band: "7.0", desc: "UK/Australia skilled", color: "bg-emerald-50 text-emerald-700 border-emerald-200/50" },
    { band: "8.0", desc: "Maximum CRS points", color: "bg-purple-50 text-purple-700 border-purple-200/50" },
];

export function IELTSPortal() {
    const [cityFilter, setCityFilter] = useState("All");
    const [toastMsg, setToastMsg] = useState("");
    const [isToastVisible, setIsToastVisible] = useState(false);

    const cities = ["All", ...Array.from(new Set(institutes.map(i => i.city)))];
    const filtered = cityFilter === "All" ? institutes : institutes.filter(i => i.city === cityFilter);

    const triggerToast = (msg: string) => {
        setToastMsg(msg);
        setIsToastVisible(true);
    };

    const handleBooking = (instName: string) => {
        triggerToast(`📚 Opening batch registration for ${instName}...`);
        setTimeout(() => {
            window.location.href = `/apply-visa?type=ielts&name=${encodeURIComponent(instName)}`;
        }, 1200);
    };

    return (
        <div className="bg-[#fff5f5] min-h-screen pb-20">
            <Toast message={toastMsg} visible={isToastVisible} onClose={() => setIsToastVisible(false)} />

            {/* Premium Indigo Hero */}
            <div className="relative py-24 px-4 overflow-hidden border-b border-purple-950">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&h=900&fit=crop&q=90"
                        alt="Students studying in class"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b]/95 via-[#1e1b4b]/85 to-[#0c1a2e]/95" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-950/45 to-transparent" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                    <span className="bg-white/10 text-purple-300 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/20 mb-4 inline-block backdrop-blur-md">
                        📚 Exam Preparation
                    </span>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-white leading-tight">
                        Ace Your IELTS & Language Exams.<br /><span className="bg-gradient-to-r from-[#c084fc] to-[#a78bfa] bg-clip-text text-transparent">Unlock Global Opportunities.</span>
                    </h1>
                    <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-medium">
                        Compare top-rated coaching centers near you, verify batch schedules, read reviews, and lock in exclusive scholarship discounts.
                    </p>
                </div>
            </div>

            {/* Score Targets */}
            <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-20 mb-12">
                <div className="bg-white rounded-3xl shadow-lg border border-yellow-100 p-6">
                    <h3 className="font-sora font-extrabold text-navy text-sm mb-4 flex items-center gap-2">
                        <Target className="w-4.5 h-4.5 text-purple-600" /> Target Scores by Program
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {scoreTargets.map(s => (
                            <div key={s.band} className={`rounded-2xl border p-4 text-center ${s.color}`}>
                                <div className="font-sora font-extrabold text-2xl leading-none text-navy">{s.band}</div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-2">{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-6xl mx-auto px-4">
                
                {/* City Filter Tabs */}
                <div className="flex items-center gap-2 flex-wrap mb-8">
                    <Filter className="w-4 h-4 text-gray-400 mr-2" />
                    {cities.map(c => (
                        <button 
                            key={c} 
                            onClick={() => { setCityFilter(c); triggerToast(`Showing prep centers in ${c}`); }}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                                cityFilter === c 
                                    ? "bg-purple-600 text-white border-transparent shadow-md" 
                                    : "bg-white text-gray-500 border-yellow-100 hover:bg-yellow-50"
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {/* Grid layout of prep centers */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(inst => (
                        <div key={inst.name} onClick={() => handleBooking(inst.name)} className="bg-white rounded-3xl border border-yellow-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between">
                            <div>
                                <div className="h-44 overflow-hidden relative">
                                    <img src={inst.image} alt={inst.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-sora font-extrabold text-navy text-base group-hover:text-purple-600 transition-colors leading-snug">{inst.name}</h3>
                                    
                                    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold mt-2 mb-4 uppercase">
                                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-purple-500" /> {inst.city}</span>
                                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {inst.rating}</span>
                                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {inst.students} students</span>
                                    </div>
                                    
                                    <div className="space-y-1.5 text-xs text-gray-500 font-semibold mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-amber-400" /> {inst.batches}
                                        </div>
                                        <div className="text-[11px]">
                                            📅 Next Batch Starts: <span className="text-[#f59e0b] font-bold">{inst.nextBatch}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 pb-6 pt-4 border-t border-yellow-50 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-none">Course Fee</span>
                                    <span className="font-sora font-extrabold text-navy text-lg mt-0.5">₹{inst.fee}</span>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleBooking(inst.name); }}
                                    className="bg-purple-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-purple-700 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                                >
                                    Book Batch <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

