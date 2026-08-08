import { useState, useEffect } from "react";
import { Search, MapPin, Globe, Briefcase, ChevronDown, Star, ArrowRight, Calculator, X } from "lucide-react";
import { ExpertCard } from "../ExpertCard";

const countries = ["India", "Pakistan", "Bangladesh", "Nepal", "Sri Lanka", "Nigeria", "Philippines", "Brazil", "UAE", "China"];
const residingCountries = ["India", "USA", "Canada", "UK", "Australia", "UAE", "Germany"];
const destinationCountries = ["USA", "Canada", "UK", "Australia", "Germany", "New Zealand", "Ireland", "Singapore"];
const visaTypes = ["F-1 Student", "H-1B", "Study Permit", "Work Permit", "Tourist", "Green Card", "PR"];
const purposes = ["Study", "Work", "Tourist", "Visa Appeal", "PR"];
const serviceTypes = ["New Application", "Appeal", "Extension", "Status Change", "Work Auth", "PR"];

const allExperts = [
    { name: "Marcus Thorne, JD", role: "Immigration Attorney", rating: 4.5, reviews: 142, location: "New York, NY", price: "from $150", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face", badges: ["Open now", "Verified"], tags: ["US Visa", "H-1B", "L-1", "F-1 Appeal"] },
    { name: "Elena Rodriguez", role: "Immigration Consultant", rating: 5.0, reviews: 89, location: "Brooklyn, NY", price: "from $100", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face", badges: ["Verified"], tags: ["Green Card", "Family", "Express Entry"] },
    { name: "Raj Patel", role: "Express Entry Specialist", rating: 4.8, reviews: 234, location: "Hyderabad, India", price: "from ₹3,000", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face", badges: ["Open now", "Verified"], tags: ["Express Entry", "Canada PR", "CRS"] },
    { name: "Sarah Chen", role: "Study Visa Expert", rating: 4.7, reviews: 178, location: "Mumbai, India", price: "from ₹2,500", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face", badges: ["Verified"], tags: ["Study Visa", "Canada", "Australia", "IELTS"] },
    { name: "Amit Sharma", role: "PR & Citizenship Advisor", rating: 4.9, reviews: 312, location: "Pune, India", price: "from ₹4,000", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face", badges: ["Verified", "Open now"], tags: ["Canada PR", "Express Entry", "PNP"] },
    { name: "Dr. James Wilson", role: "UK Immigration Solicitor", rating: 4.6, reviews: 156, location: "London, UK", price: "from £120", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=face", badges: ["Verified"], tags: ["UK Visa", "Tier-2", "Skilled Worker"] },
];

export function SmartSearchPortal() {
    const [passport, setPassport] = useState("");
    const [residing, setResiding] = useState("");
    const [currentVisa, setCurrentVisa] = useState("");
    const [destination, setDestination] = useState("");
    const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
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

    useEffect(() => {
        if (typeof window !== "undefined") {
            const searchParams = new URLSearchParams(window.location.search);
            setPassport(searchParams.get("passport") || "");
            setResiding(searchParams.get("residing") || "");
            setCurrentVisa(searchParams.get("visa") || "");
            setDestination(searchParams.get("dest") || "");
            setSelectedPurposes(searchParams.get("purpose")?.split(",").filter(Boolean) || []);
        }
    }, []);

    const togglePurpose = (p: string) => setSelectedPurposes(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

    const addCity = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && cityInput.trim()) {
            setCities(prev => [...prev, cityInput.trim()]);
            setCityInput("");
        }
    };

    const filteredExperts = allExperts.filter(e => {
        if (destination && !e.tags.some(t => t.toLowerCase().includes(destination.toLowerCase()))) return false;
        return true;
    });

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="relative text-white py-24 px-4 overflow-hidden border-b border-slate-900">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&h=900&fit=crop&q=90"
                        alt="Workspace desk"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/50 to-slate-900/60"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(239,68,68,0.06),transparent_60%)]"></div>
                </div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <h1 className="font-sora text-3xl md:text-5xl font-extrabold mb-3">Smart Expert Search</h1>
                    <p className="text-white/80 text-base max-w-xl mx-auto font-medium">Tell us about your situation and we&apos;ll find the best immigration experts for you.</p>
                </div>
            </section>

            {/* Search Panel */}
            <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-10 mb-10">
                <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 tracking-wider mb-1 block">Passport</label>
                            <div className="relative">
                                <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select value={passport} onChange={(e) => setPassport(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-red-50/50 border border-red-100 rounded-xl text-sm font-medium appearance-none outline-none focus:border-red-500 cursor-pointer">
                                    <option value="">Select</option>
                                    {countries.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 tracking-wider mb-1 block">Residing In</label>
                            <div className="relative">
                                <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select value={residing} onChange={(e) => { setResiding(e.target.value); if (e.target.value === "India") setCurrentVisa(""); }}
                                    className="w-full pl-10 pr-4 py-3 bg-red-50/50 border border-red-100 rounded-xl text-sm font-medium appearance-none outline-none focus:border-red-500 cursor-pointer">
                                    <option value="">Select</option>
                                    {residingCountries.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        {showVisaField && (
                            <div className="animate-fade-up">
                                <label className="text-[11px] font-bold text-red-500 tracking-wider mb-1 block">Current Visa</label>
                                <div className="relative">
                                    <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
                                    <select value={currentVisa} onChange={(e) => setCurrentVisa(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-red-50/50 border border-red-200 rounded-xl text-sm font-medium appearance-none outline-none focus:border-red-500 cursor-pointer">
                                        <option value="">Select</option>
                                        {visaTypes.map(v => <option key={v}>{v}</option>)}
                                    </select>
                                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 tracking-wider mb-1 block">Destination</label>
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select value={destination} onChange={(e) => setDestination(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-red-50/50 border border-red-100 rounded-xl text-sm font-medium appearance-none outline-none focus:border-red-500 cursor-pointer">
                                    <option value="">Select</option>
                                    {destinationCountries.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Multi-city */}
                    <div className="mb-4">
                        <label className="text-[11px] font-bold text-gray-500 tracking-wider mb-1 block">Your City (multiple)</label>
                        <div className="flex flex-wrap gap-1.5 p-2 bg-red-50/50 border border-red-100 rounded-xl min-h-[44px] items-center">
                            {cities.map(c => (
                                <span key={c} className="inline-flex items-center gap-1 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full animate-fade-up">
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
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedPurposes.includes(p) ? "bg-red-500 text-white border-red-500" : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-red-50"}`}>
                                {p}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {serviceTypes.map(s => (
                            <button key={s} onClick={() => setServiceType(s)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${serviceType === s ? "bg-black text-white" : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"}`}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CRS Calculator */}
            {showCRS && (
                <section className="max-w-5xl mx-auto px-4 mb-10 animate-fade-up">
                    <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Calculator className="w-5 h-5 text-red-500" />
                            <h3 className="font-sora font-bold text-navy">CRS Score Calculator</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 mb-1 block">Age</label>
                                <input type="number" value={crsAge} onChange={(e) => setCrsAge(+e.target.value)} className="w-full p-2.5 border border-red-100 rounded-xl text-sm bg-white outline-none focus:border-red-500" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 mb-1 block">Education (1-5)</label>
                                <input type="number" value={crsEdu} onChange={(e) => setCrsEdu(+e.target.value)} min={1} max={5} className="w-full p-2.5 border border-red-100 rounded-xl text-sm bg-white outline-none focus:border-red-500" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 mb-1 block">Work Exp (years)</label>
                                <input type="number" value={crsWork} onChange={(e) => setCrsWork(+e.target.value)} className="w-full p-2.5 border border-red-100 rounded-xl text-sm bg-white outline-none focus:border-red-500" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 mb-1 block">Language (CLB)</label>
                                <input type="number" value={crsLang} onChange={(e) => setCrsLang(+e.target.value)} className="w-full p-2.5 border border-red-100 rounded-xl text-sm bg-white outline-none focus:border-red-500" />
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-red-100 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-600">Estimated CRS Score:</span>
                            <span className="font-sora text-3xl font-extrabold text-red-500">{crsScore}</span>
                        </div>
                    </div>
                </section>
            )}

            {/* Upsell Callouts */}
            {selectedPurposes.includes("Study") && (
                <section className="max-w-5xl mx-auto px-4 mb-6 animate-fade-up">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-4">
                        <span className="text-2xl">📚</span>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-navy">Your profile needs IELTS 6.5+</p>
                            <p className="text-xs text-gray-500">Book a preparation course near you to boost your score.</p>
                        </div>
                        <a href="/training/ielts" className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1">Find Centers <ArrowRight className="w-4 h-4" /></a>
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
