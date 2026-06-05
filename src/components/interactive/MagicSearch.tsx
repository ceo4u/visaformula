import { useState } from "react";
import { Search, Globe, MapPin, Briefcase, ChevronDown } from "lucide-react";

const countries = ["India", "Pakistan", "Bangladesh", "Nepal", "Sri Lanka", "Nigeria", "Philippines", "Brazil", "UAE", "China", "Other"];
const residingCountries = ["India", "USA", "Canada", "UK", "Australia", "UAE", "Germany", "Other"];
const destinationCountries = ["USA", "Canada", "UK", "Australia", "Germany", "New Zealand", "Ireland", "Singapore"];
const visaTypes = ["F-1 Student", "H-1B", "Study Permit", "Work Permit", "Tourist", "Green Card", "PR", "Other"];
const purposes = ["Study", "Work", "Tourist", "Express Entry", "Visa Appeal", "PR", "Work Permit Auth"];

export function MagicSearch({ className = "" }: { className?: string }) {
    const [passport, setPassport] = useState("");
    const [residing, setResiding] = useState("");
    const [currentVisa, setCurrentVisa] = useState("");
    const [destination, setDestination] = useState("");
    const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
    const showVisaField = residing !== "" && residing !== "India";

    const togglePurpose = (p: string) => {
        setSelectedPurposes(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (passport) params.set("passport", passport);
        if (residing) params.set("residing", residing);
        if (currentVisa) params.set("visa", currentVisa);
        if (destination) params.set("dest", destination);
        if (selectedPurposes.length) params.set("purpose", selectedPurposes.join(","));
        window.location.href = `/smart-search?${params.toString()}`;
    };

    return (
        <div className={`bg-white rounded-2xl shadow-card border border-red-100 p-6 ${className}`}>
            <h3 className="font-sora font-bold text-lg text-navy mb-5">Find the right expert for your visa journey</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Passport */}
                <div className="relative">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Passport / Citizenship</label>
                    <div className="relative">
                        <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select value={passport} onChange={(e) => setPassport(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-red-50/50 border border-red-100 rounded-xl text-sm font-medium appearance-none outline-none focus:border-[#ef4444] focus:ring-2 focus:ring-red-100 transition-all cursor-pointer">
                            <option value="">Select country</option>
                            {countries.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Residing */}
                <div className="relative">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Currently Residing In</label>
                    <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select value={residing} onChange={(e) => { setResiding(e.target.value); if (e.target.value === "India") setCurrentVisa(""); }}
                            className="w-full pl-10 pr-4 py-3 bg-red-50/50 border border-red-100 rounded-xl text-sm font-medium appearance-none outline-none focus:border-[#ef4444] focus:ring-2 focus:ring-red-100 transition-all cursor-pointer">
                            <option value="">Select country</option>
                            {residingCountries.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Current Visa (conditional) */}
                {showVisaField && (
                    <div className="relative animate-fade-up">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Current Visa Type</label>
                        <div className="relative">
                            <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select value={currentVisa} onChange={(e) => setCurrentVisa(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-red-50/50 border border-red-200 rounded-xl text-sm font-medium appearance-none outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all cursor-pointer">
                                <option value="">Select visa type</option>
                                <option value="Other">Other</option>
                                {visaTypes.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                )}

                {/* Destination */}
                <div className="relative">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">I Want To Go To</label>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select value={destination} onChange={(e) => setDestination(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-red-50/50 border border-red-100 rounded-xl text-sm font-medium appearance-none outline-none focus:border-[#ef4444] focus:ring-2 focus:ring-red-100 transition-all cursor-pointer">
                            <option value="">Select destination</option>
                            {destinationCountries.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Purpose Chips */}
            <div className="mb-5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Purpose</label>
                <div className="flex flex-wrap gap-2">
                    {purposes.map(p => (
                        <button key={p} onClick={() => togglePurpose(p)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedPurposes.includes(p)
                                    ? "bg-red-500 text-white shadow-sm"
                                    : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <button onClick={handleSearch}
                className="w-full bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white py-4 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-red-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Find Experts
            </button>
        </div>
    );
}

