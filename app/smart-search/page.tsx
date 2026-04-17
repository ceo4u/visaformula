"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Globe, Briefcase, ChevronDown, Star, ArrowRight, Calculator, X } from "lucide-react";
import { ExpertCard } from "@/components/ExpertCard";

const countries = ["India", "Pakistan", "Bangladesh", "Nepal", "Sri Lanka", "Nigeria", "Philippines", "Brazil", "UAE", "China"];
const residingCountries = ["India", "USA", "Canada", "UK", "Australia", "UAE", "Germany"];
const destinationCountries = ["USA", "Canada", "UK", "Australia", "Germany", "New Zealand", "Ireland", "Singapore"];
const visaTypes = ["F-1 Student", "H-1B", "Study Permit", "Work Permit", "Tourist", "Green Card", "PR"];
const purposes = ["Study", "Work", "Tourist", "Express Entry", "Visa Appeal", "PR", "Work Permit Auth"];
const serviceTypes = ["New Application", "Appeal", "Extension", "Status Change", "Work Auth", "PR"];

const allExperts = [
    { name: "Marcus Thorne, JD", role: "Immigration Attorney", rating: 4.5, reviews: 142, location: "New York, NY", price: "from $150", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face", badges: ["Open now", "Verified"], tags: ["US Visa", "H-1B", "L-1", "F-1 Appeal"] },
    { name: "Elena Rodriguez", role: "Immigration Consultant", rating: 5.0, reviews: 89, location: "Brooklyn, NY", price: "from $100", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face", badges: ["Verified"], tags: ["Green Card", "Family", "Express Entry"] },
    { name: "Raj Patel", role: "Express Entry Specialist", rating: 4.8, reviews: 234, location: "Hyderabad, India", price: "from ₹3,000", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face", badges: ["Open now", "Verified"], tags: ["Express Entry", "Canada PR", "CRS"] },
    { name: "Sarah Chen", role: "Study Visa Expert", rating: 4.7, reviews: 178, location: "Mumbai, India", price: "from ₹2,500", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face", badges: ["Verified"], tags: ["Study Visa", "Canada", "Australia", "IELTS"] },
    { name: "Amit Sharma", role: "PR & Citizenship Advisor", rating: 4.9, reviews: 312, location: "Pune, India", price: "from ₹4,000", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face", badges: ["Verified", "Open now"], tags: ["Canada PR", "Express Entry", "PNP"] },
    { name: "Dr. James Wilson", role: "UK Immigration Solicitor", rating: 4.6, reviews: 156, location: "London, UK", price: "from £120", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face", badges: ["Verified"], tags: ["UK Visa", "Tier-2", "Skilled Worker"] },
];

function SmartSearchContent() {
    const searchParams = useSearchParams();
    const [passport, setPassport] = useState(searchParams.get("passport") || "");
    const [residing, setResiding] = useState(searchParams.get("residing") || "");
    const [currentVisa, setCurrentVisa] = useState(searchParams.get("visa") || "");
    const [destination, setDestination] = useState(searchParams.get("dest") || "");
    const [selectedPurposes, setSelectedPurposes] = useState<string[]>(searchParams.get("purpose")?.split(",").filter(Boolean) || []);
    const [serviceType, setServiceType] = useState("");
    const [cities, setCities] = useState<string[]>([]);
    const [cityInput, setCityInput] = useState("");
    const showVisaField = residing !== "" && residing !== "India";
    const showCRS = selectedPurposes.includes("Express Entry");

    const [crsAge, setCrsAge] = useState(30);
    const [crsEdu, setCrsEdu] = useState(3);
    const [crsWork, setCrsWork] = useState(3);
    const [crsLang, setCrsLang] = useState(8);

    const crsScore = Math.min(600, (47 - crsAge) * 3 + crsEdu * 25 + crsWork * 15 + crsLang * 8 + 100);

    const togglePurpose = (p: string) => setSelectedPurposes(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

    const addCity = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && cityInput.trim()) {
            setCities(prev => [...prev, cityInput.trim()]);
            setCityInput("");
        }
    };

    const filteredExperts = allExperts.filter(e => {
        if (destination && !e.tags.some(t => t.toLowerCase().includes(destination.toLowerCase()))) return true;
        return true;
    });

    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#0ea5e9] via-[#0284c7] to-[#0369a1] text-white py-16 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="font-sora text-3xl md:text-4xl font-extrabold mb-3">Smart Expert Search</h1>
                    <p className="text-white/80 text-base max-w-xl mx-auto">Tell us about your situation and we&apos;ll find the best immigration experts for you.</p>
                </div>
            </section>

            {/* Search Panel */}
            <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-10 mb-10">
                <div className="bg-white rounded-2xl shadow-card border border-sky-100 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Passport</label>
                            <div className="relative">
                                <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select value={passport} onChange={(e) => setPassport(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm font-medium appearance-none outline-none focus:border-[#0ea5e9] cursor-pointer">
                                    <option value="">Select</option>
                                    {countries.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Residing In</label>
                            <div className="relative">
                                <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select value={residing} onChange={(e) => { setResiding(e.target.value); if (e.target.value === "India") setCurrentVisa(""); }}
                                    className="w-full pl-10 pr-4 py-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm font-medium appearance-none outline-none focus:border-[#0ea5e9] cursor-pointer">
                                    <option value="">Select</option>
                                    {residingCountries.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        {showVisaField && (
                            <div className="animate-fade-up">
                                <label className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1 block">Current Visa</label>
                                <div className="relative">
                                    <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
                                    <select value={currentVisa} onChange={(e) => setCurrentVisa(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl text-sm font-medium appearance-none outline-none focus:border-amber-400 cursor-pointer">
                                        <option value="">Select</option>
                                        {visaTypes.map(v => <option key={v}>{v}</option>)}
                                    </select>
                                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Destination</label>
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select value={destination} onChange={(e) => setDestination(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm font-medium appearance-none outline-none focus:border-[#0ea5e9] cursor-pointer">
                                    <option value="">Select</option>
                                    {destinationCountries.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Multi-city */}
                    <div className="mb-4">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Your City (multiple)</label>
                        <div className="flex flex-wrap gap-1.5 p-2 bg-sky-50/50 border border-sky-100 rounded-xl min-h-[44px] items-center">
                            {cities.map(c => (
                                <span key={c} className="inline-flex items-center gap-1 bg-[#0ea5e9] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                    📍{c} <button onClick={() => setCities(prev => prev.filter(x => x !== c))}><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                            <input value={cityInput} onChange={(e) => setCityInput(e.target.value)} onKeyDown={addCity} placeholder="Type city & press Enter..." className="flex-1 min-w-[150px] bg-transparent outline-none text-sm py-1 px-2" />
                        </div>
                    </div>

                    {/* Purpose + Service */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {purposes.map(p => (
                            <button key={p} onClick={() => togglePurpose(p)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedPurposes.includes(p) ? "bg-[#0ea5e9] text-white" : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-sky-50"}`}>
                                {p}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {serviceTypes.map(s => (
                            <button key={s} onClick={() => setServiceType(s)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${serviceType === s ? "bg-navy text-white" : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"}`}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CRS Calculator */}
            {showCRS && (
                <section className="max-w-5xl mx-auto px-4 mb-10 animate-fade-up">
                    <div className="bg-gradient-to-br from-sky-50 to-white border border-sky-200 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Calculator className="w-5 h-5 text-[#0ea5e9]" />
                            <h3 className="font-sora font-bold text-navy">CRS Score Calculator</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 mb-1 block">Age</label>
                                <input type="number" value={crsAge} onChange={(e) => setCrsAge(+e.target.value)} className="w-full p-2.5 border border-sky-100 rounded-xl text-sm bg-white outline-none focus:border-[#0ea5e9]" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 mb-1 block">Education (1-5)</label>
                                <input type="number" value={crsEdu} onChange={(e) => setCrsEdu(+e.target.value)} min={1} max={5} className="w-full p-2.5 border border-sky-100 rounded-xl text-sm bg-white outline-none focus:border-[#0ea5e9]" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 mb-1 block">Work Exp (years)</label>
                                <input type="number" value={crsWork} onChange={(e) => setCrsWork(+e.target.value)} className="w-full p-2.5 border border-sky-100 rounded-xl text-sm bg-white outline-none focus:border-[#0ea5e9]" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 mb-1 block">Language (CLB)</label>
                                <input type="number" value={crsLang} onChange={(e) => setCrsLang(+e.target.value)} className="w-full p-2.5 border border-sky-100 rounded-xl text-sm bg-white outline-none focus:border-[#0ea5e9]" />
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-sky-100 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-600">Estimated CRS Score:</span>
                            <span className="font-sora text-3xl font-extrabold text-[#0ea5e9]">{crsScore}</span>
                        </div>
                    </div>
                </section>
            )}

            {/* Upsell Callouts */}
            {selectedPurposes.includes("Study") && (
                <section className="max-w-5xl mx-auto px-4 mb-6 animate-fade-up">
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4">
                        <span className="text-2xl">📚</span>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-navy">Your profile needs IELTS 6.5+</p>
                            <p className="text-xs text-gray-500">Book a preparation course near you to boost your score.</p>
                        </div>
                        <a href="/training/ielts" className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">Find Centers <ArrowRight className="w-4 h-4" /></a>
                    </div>
                </section>
            )}

            {/* Results */}
            <section className="max-w-6xl mx-auto px-4 pb-16">
                <h2 className="font-sora text-xl font-bold text-navy mb-6">{filteredExperts.length} Experts Found</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExperts.map((expert, i) => (
                        <ExpertCard key={i} expert={expert} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default function SmartSearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-[#0ea5e9] border-t-transparent rounded-full" /></div>}>
            <SmartSearchContent />
        </Suspense>
    );
}
