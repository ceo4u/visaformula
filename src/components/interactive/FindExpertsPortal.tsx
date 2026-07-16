import { useState, useEffect } from "react";
import { Star, MapPin, ChevronDown, List, Map as MapIcon, CheckCircle, Clock, Search, Filter, X } from "lucide-react";

const allExperts = [
    { id: 1, name: "Marcus Thorne, JD", category: "work", role: "Immigration Attorney", rating: 4.9, reviews: 142, price: 2500, city: "Hyderabad", countries: ["USA", "Canada"], experience: 15, isRemote: true, isAvailableToday: true, isEmergency: true, tags: ["H-1B", "L-1", "EB-1"], image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
    { id: 2, name: "Elena Rodriguez", category: "student", role: "Student Visa Consultant", rating: 5.0, reviews: 89, price: 1500, city: "Mumbai", countries: ["UK", "Australia"], experience: 8, isRemote: true, isAvailableToday: true, isEmergency: false, tags: ["Student Visa", "SOP Review"], image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
    { id: 3, name: "Raj Patel", category: "pr", role: "Express Entry Specialist", rating: 4.8, reviews: 234, price: 1800, city: "Delhi", countries: ["Canada", "Australia"], experience: 12, isRemote: false, isAvailableToday: false, isEmergency: false, tags: ["Express Entry", "PNP", "SINP"], image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face" },
    { id: 4, name: "Aisha Khan", category: "student", role: "UK Visa Consultant", rating: 4.6, reviews: 67, price: 1200, city: "Bangalore", countries: ["UK", "Germany"], experience: 5, isRemote: true, isAvailableToday: true, isEmergency: false, tags: ["UK Student", "Germany Blue Card"], image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" },
    { id: 5, name: "Deepak Kumar", category: "work", role: "Work Permit Advisor", rating: 4.7, reviews: 156, price: 2000, city: "Hyderabad", countries: ["Canada", "UAE"], experience: 10, isRemote: true, isAvailableToday: false, isEmergency: true, tags: ["LMIA", "Work Permit", "PGWP"], image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face" },
    { id: 6, name: "Priya Nair", category: "pr", role: "PR & Citizenship Expert", rating: 4.9, reviews: 312, price: 3000, city: "Chennai", countries: ["Canada", "Australia", "USA"], experience: 18, isRemote: true, isAvailableToday: true, isEmergency: false, tags: ["PR", "Citizenship", "Super Visa"], image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&h=200&fit=crop&crop=face" },
];

const categoryFilters = ["All", "Student Visa", "Work Permit", "PR", "Local Expert"];
const cityFilters = ["All Cities", "Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai", "Remote"];
const ratingFilters = ["Any", "4★+", "4.5★+", "Top Rated"];
const availFilters = ["Anytime", "Today", "This Week", "Emergency 24/7"];

export function FindExpertsPortal() {
    const [viewMode, setViewMode] = useState<"list" | "map">("list");
    const [experts, setExperts] = useState(allExperts);
    const [category, setCategory] = useState("All");
    const [city, setCity] = useState("All Cities");
    const [rating, setRating] = useState("Any");
    const [avail, setAvail] = useState("Anytime");
    const [sortBy, setSortBy] = useState("recommended");
    const [searchText, setSearchText] = useState("");
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [sortOpen, setSortOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hasLocalExpert = localStorage.getItem("expert_businessName") && localStorage.getItem("expert_isLoggedIn") === "true";
            if (hasLocalExpert) {
                let tagsArray = ["Express Entry", "PNP"];
                try {
                    const savedTags = localStorage.getItem("expert_expertiseTags");
                    if (savedTags) tagsArray = JSON.parse(savedTags);
                } catch(e) {}
                
                const localExpert = {
                    id: 7,
                    name: localStorage.getItem("expert_businessName") || "Marcus Thorne",
                    category: "pr",
                    role: localStorage.getItem("expert_advisorType") || "Immigration Consultant",
                    rating: 5.0,
                    reviews: 1,
                    price: 1800,
                    city: localStorage.getItem("expert_officeAddress") || "Remote",
                    countries: (localStorage.getItem("expert_countriesExpertise") || "Canada").split(",").map((c: string) => c.trim()),
                    experience: 12,
                    isRemote: true,
                    isAvailableToday: true,
                    isEmergency: false,
                    tags: tagsArray,
                    image: localStorage.getItem("expert_profilePhoto") || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
                };
                
                setExperts([localExpert, ...allExperts]);
            }
        }
    }, []);

    useEffect(() => {
        if (!sortOpen) return;
        const handleOutside = () => setSortOpen(false);
        window.addEventListener("click", handleOutside);
        return () => window.removeEventListener("click", handleOutside);
    }, [sortOpen]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const catQuery = params.get("category");
            if (catQuery) {
                if (catQuery === "student") setCategory("Student Visa");
                if (catQuery === "work") setCategory("Work Permit");
                if (catQuery === "pr") setCategory("PR");
                if (catQuery === "local") setCategory("Local Expert");
            }
            const countryQuery = params.get("country");
            if (countryQuery) {
                setSelectedCountry(countryQuery);
            }
            
            // Handle general search text query
            const textQuery = params.get("query");
            if (textQuery) {
                setSearchText(textQuery);
            }

            // Handle location query
            const locQuery = params.get("location");
            if (locQuery) {
                const matchCity = cityFilters.find(c => c.toLowerCase() === locQuery.toLowerCase());
                if (matchCity) {
                    setCity(matchCity);
                } else {
                    const formattedCity = locQuery.charAt(0).toUpperCase() + locQuery.slice(1).toLowerCase();
                    setCity(formattedCity);
                }
            }
        }
    }, []);

    const filtered = experts.filter(e => {
        if (category !== "All" && !e.tags.some(t => t.toLowerCase().includes(category.toLowerCase().replace(" visa", "").replace(" permit", "").replace("local ", "")))) {
            if (category === "Student Visa" && e.category !== "student") return false;
            if (category === "Work Permit" && e.category !== "work") return false;
            if (category === "PR" && e.category !== "pr") return false;
        }
        if (selectedCountry !== "All") {
            const countryLower = selectedCountry.toLowerCase();
            if (countryLower === "schengen" || countryLower === "europe") {
                const schengenCountries = ["germany", "france", "schengen", "italy", "spain", "europe"];
                if (!e.countries.some(c => schengenCountries.includes(c.toLowerCase()))) return false;
            } else {
                if (!e.countries.some(c => c.toLowerCase() === countryLower)) return false;
            }
        }
        if (city !== "All Cities" && city !== "Remote" && e.city !== city) return false;
        if (city === "Remote" && !e.isRemote) return false;
        if (rating === "4★+" && e.rating < 4) return false;
        if (rating === "4.5★+" && e.rating < 4.5) return false;
        if (rating === "Top Rated" && e.rating < 4.8) return false;
        if (avail === "Today" && !e.isAvailableToday) return false;
        if (avail === "Emergency 24/7" && !e.isEmergency) return false;
        if (searchText && !e.name.toLowerCase().includes(searchText.toLowerCase()) && !e.tags.some(t => t.toLowerCase().includes(searchText.toLowerCase()))) return false;
        return true;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviews - a.reviews; // recommended
    });

    const handleBooking = (id: number) => {
        window.location.href = `/payment/EXPERT-SECURE-${id}`;
    };

    const FilterSidebar = () => (
        <div className="space-y-6">
            {/* Category */}
            <div>
                <h3 className="text-xs font-black text-gray-400 tracking-widest mb-2.5">Category</h3>
                <div className="flex flex-wrap gap-2">
                    {categoryFilters.map(c => (
                        <button key={c} onClick={() => setCategory(c)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${category === c ? "bg-slate-900 text-white shadow-md" : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"}`}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>
            {/* City */}
            <div>
                <h3 className="text-xs font-black text-gray-400 tracking-widest mb-2.5">City</h3>
                <div className="flex flex-wrap gap-2">
                    {cityFilters.map(c => (
                        <button key={c} onClick={() => setCity(c)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${city === c ? "bg-navy text-white shadow-md" : "bg-white text-gray-600 border border-yellow-100 hover:bg-yellow-50"}`}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>
            {/* Rating */}
            <div>
                <h3 className="text-xs font-black text-gray-400 tracking-widest mb-2.5">Rating</h3>
                <div className="flex flex-wrap gap-2">
                    {ratingFilters.map(r => (
                        <button key={r} onClick={() => setRating(r)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${rating === r ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-white text-gray-600 border border-yellow-100 hover:bg-yellow-50"}`}>
                            {r}
                        </button>
                    ))}
                </div>
            </div>
            {/* Availability */}
            <div>
                <h3 className="text-xs font-black text-gray-400 tracking-widest mb-2.5">Availability</h3>
                <div className="flex flex-wrap gap-2">
                    {availFilters.map(a => (
                        <button key={a} onClick={() => setAvail(a)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${avail === a ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-white text-gray-600 border border-yellow-100 hover:bg-yellow-50"}`}>
                            {a}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={() => { setCategory("All"); setCity("All Cities"); setRating("Any"); setAvail("Anytime"); setSelectedCountry("All"); }}
                className="w-full text-xs font-black tracking-wider text-slate-900 hover:underline mt-2">Clear All Filters</button>
        </div>
    );

    return (
        <div className="bg-[#fff5f5] min-h-screen">
            <main className="max-w-7xl mx-auto flex flex-col lg:flex-row py-8 px-4 gap-8">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-[300px] shrink-0">
                    <div className="bg-white rounded-3xl border border-yellow-100 p-6 shadow-xl sticky top-24">
                        <h2 className="font-sora text-lg font-bold text-navy mb-4">Filters</h2>
                        <FilterSidebar />
                    </div>
                </aside>

                {/* Mobile Filter Button */}
                <button onClick={() => setShowMobileFilters(true)} className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-3.5 font-bold text-xs tracking-wider text-navy shadow-md">
                    <Filter className="w-4 h-4 text-slate-900" /> Filters
                    {(category !== "All" || city !== "All Cities" || rating !== "Any" || avail !== "Anytime") && (
                        <span className="bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1">●</span>
                    )}
                </button>

                {/* Mobile Filter Drawer */}
                {showMobileFilters && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
                        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-auto shadow-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-sora font-bold text-navy">Filters</h3>
                                <button onClick={() => setShowMobileFilters(false)}><X className="w-5 h-5 text-gray-400" /></button>
                            </div>
                            <FilterSidebar />
                            <button onClick={() => setShowMobileFilters(false)} className="w-full mt-6 bg-slate-900 text-white py-3.5 rounded-xl font-bold text-xs tracking-wider">Apply Filters</button>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <section className="flex-1">
                    {/* Search + Sort Bar */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-xl mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <div className="flex items-center gap-2.5 bg-slate-50/50 border border-slate-100/70 rounded-2xl px-4 py-2.5 flex-1 w-full sm:w-auto">
                            <Search className="w-4 h-4 text-gray-400 shrink-0" />
                            <input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search by name, tag, or specialty..." className="bg-transparent outline-none text-xs w-full font-medium" />
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                            <div className="relative" onClick={e => e.stopPropagation()}>
                                <button
                                    onClick={() => setSortOpen(!sortOpen)}
                                    className="appearance-none bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-4 pr-10 text-xs font-bold text-navy outline-none cursor-pointer flex items-center justify-between min-w-[140px] text-left"
                                >
                                    <span>
                                        {sortBy === "recommended" && "Recommended"}
                                        {sortBy === "rating" && "Highest Rated"}
                                        {sortBy === "price-low" && "Price: Low → High"}
                                        {sortBy === "price-high" && "Price: High → Low"}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </button>
                                {sortOpen && (
                                    <div className="absolute top-full right-0 bg-white border border-slate-200 rounded-xl shadow-xl mt-1 py-1 z-50 min-w-[150px] font-sora">
                                        <button
                                            onClick={() => { setSortBy("recommended"); setSortOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-black hover:text-white transition-colors"
                                        >
                                            Recommended
                                        </button>
                                        <button
                                            onClick={() => { setSortBy("rating"); setSortOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-black hover:text-white transition-colors"
                                        >
                                            Highest Rated
                                        </button>
                                        <button
                                            onClick={() => { setSortBy("price-low"); setSortOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-black hover:text-white transition-colors"
                                        >
                                            Price: Low → High
                                        </button>
                                        <button
                                            onClick={() => { setSortBy("price-high"); setSortOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-black hover:text-white transition-colors"
                                        >
                                            Price: High → Low
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flex bg-slate-100/80 rounded-xl p-1 shrink-0">
                                <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-md text-navy" : "text-gray-400"}`}>
                                    <List className="w-4 h-4" />
                                </button>
                                <button onClick={() => setViewMode("map")} className={`p-2 rounded-lg transition-all ${viewMode === "map" ? "bg-white shadow-md text-navy" : "text-gray-400"}`}>
                                    <MapIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                        <p className="text-xs font-black tracking-wider text-gray-400">{sorted.length} expert{sorted.length !== 1 ? "s" : ""} found</p>
                        {selectedCountry !== "All" && (
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] bg-slate-900 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-sm">
                                    🌍 Destination: {selectedCountry}
                                    <button onClick={() => setSelectedCountry("All")} className="hover:text-red-400 font-extrabold text-[12px] ml-1">×</button>
                                </span>
                            </div>
                        )}
                    </div>

                    {viewMode === "list" ? (
                        <div className="space-y-4">
                            {sorted.map(e => (
                                <div key={e.id} className="block group cursor-default">
                                    <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="relative w-20 h-20 shrink-0 mx-auto md:mx-0">
                                            <img src={e.image} alt={e.name} className="w-full h-full object-cover rounded-2xl border border-slate-100" />
                                            {e.isAvailableToday && (
                                                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full border-2 border-white animate-pulse">
                                                    Open
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2 text-center sm:text-left">
                                                <div>
                                                    <h3 className="text-lg font-bold font-sora text-navy group-hover:text-slate-900 transition-colors flex items-center justify-center sm:justify-start gap-2 leading-tight">
                                                        {e.name} <CheckCircle className="w-4 h-4 text-slate-900 fill-slate-50" />
                                                    </h3>
                                                    <p className="text-xs text-gray-400 mt-0.5">{e.role} · {e.experience} yrs experience</p>
                                                </div>
                                                <div className="text-center sm:text-right shrink-0">
                                                    <div className="font-sora font-extrabold text-navy text-lg">₹{e.price.toLocaleString()}</div>
                                                    <div className="text-[9px] font-bold text-gray-400 tracking-widest">per session</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-xs font-semibold text-gray-500 mb-4">
                                                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {e.rating} ({e.reviews} reviews)</span>
                                                <span>·</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {e.city}</span>
                                                {e.isRemote && <span className="text-emerald-600">· Remote available</span>}
                                                {e.isEmergency && <span className="text-slate-600">· 24/7 Emergency</span>}
                                            </div>
                                            <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mb-4">
                                                {e.tags.map(tag => (
                                                    <span key={tag} className="bg-slate-50 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-200/60">{tag}</span>
                                                ))}
                                                {e.countries.map(c => (
                                                    <span key={c} className="bg-slate-50 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-100">{c}</span>
                                                ))}
                                            </div>
                                            <div className="flex justify-center sm:justify-start gap-2">
                                                <button onClick={(event) => { event.stopPropagation(); handleBooking(e.id); }} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-black transition-all hover:shadow-md active:scale-[0.97]">Book Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {sorted.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                                    <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                    <h3 className="font-sora font-bold text-navy mb-1">No experts found</h3>
                                    <p className="text-sm text-gray-400">Try adjusting your filters or search terms</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-[600px] w-full rounded-3xl overflow-hidden border border-slate-100 shadow-xl relative bg-slate-50">
                            <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=900&fit=crop')" }} />
                            <div className="absolute inset-0 bg-navy/20 backdrop-blur-[2px]" />
                            {sorted.slice(0, 4).map((e, i) => {
                                const positions = [{ top: "20%", left: "30%" }, { top: "50%", left: "55%" }, { top: "35%", left: "15%" }, { top: "60%", left: "70%" }];
                                const pos = positions[i] || positions[0];
                                return (
                                    <div key={e.id} className="absolute group cursor-pointer" style={pos} onClick={() => handleBooking(e.id)}>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-white rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all p-3 border border-slate-100 pointer-events-none z-10 duration-300">
                                            <div className="flex gap-3">
                                                <img src={e.image} className="w-10 h-10 rounded-xl object-cover" alt="" />
                                                <div>
                                                    <div className="text-xs font-extrabold text-navy truncate">{e.name}</div>
                                                    <div className="flex items-center text-[10px] font-bold mt-0.5">
                                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" /> {e.rating} · ₹{e.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-900 text-white font-black text-xs px-3 py-2 rounded-xl shadow-lg border-2 border-white hover:scale-110 transition-transform duration-300">
                                            ₹{e.price.toLocaleString()}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

