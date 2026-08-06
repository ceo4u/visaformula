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
            let registeredList: any[] = [];
            try {
                const storedAll = localStorage.getItem("visaformula_all_experts");
                if (storedAll) {
                    const parsed = JSON.parse(storedAll);
                    if (Array.isArray(parsed)) registeredList = parsed;
                }
            } catch(e) {}

            const bizName = localStorage.getItem("expert_businessName") || "";
            const firstName = localStorage.getItem("expert_firstName") || "";
            const lastName = localStorage.getItem("expert_lastName") || "";
            const fullName = bizName || (`${firstName} ${lastName}`).trim();
            const isLoggedIn = localStorage.getItem("expert_isLoggedIn") === "true";
            const advisorType = localStorage.getItem("expert_advisorType") || "Registered Consultant";

            // List ANY type of registered expert who completed basic profile details
            if (isLoggedIn && fullName) {
                let tagsArray = ["Study Visa", "Work Permit", "PR Migration"];
                try {
                    const savedTags = localStorage.getItem("expert_expertiseTags");
                    if (savedTags) {
                        const parsed = JSON.parse(savedTags);
                        if (Array.isArray(parsed) && parsed.length > 0) tagsArray = parsed;
                    }
                } catch(e) {}
                
                const loggedInExpert = {
                    id: "logged-in-expert",
                    name: fullName,
                    category: "pr",
                    role: advisorType,
                    rating: 5.0,
                    reviews: 1,
                    price: 1500,
                    city: localStorage.getItem("expert_officeAddress") || "Remote",
                    countries: (localStorage.getItem("expert_countriesExpertise") || "Canada, UK, USA, Australia").split(",").map((c: string) => c.trim()),
                    experience: 5,
                    isRemote: true,
                    isAvailableToday: true,
                    isEmergency: false,
                    tags: tagsArray,
                    image: localStorage.getItem("expert_profilePhoto") || localStorage.getItem("expert_profilePhotoUrl") || ""
                };

                const alreadyInList = registeredList.some(e => e.name?.toLowerCase() === fullName.toLowerCase());
                if (!alreadyInList) {
                    registeredList = [loggedInExpert, ...registeredList];
                }
            }

            setExperts([...registeredList, ...allExperts]);
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
            
            const textQuery = params.get("query");
            if (textQuery) {
                setSearchText(textQuery);
            }

            const cityQuery = params.get("city");
            if (cityQuery) {
                const matchCity = cityFilters.find(c => c.toLowerCase() === cityQuery.toLowerCase());
                if (matchCity) setCity(matchCity);
            }
        }
    }, []);

    // Filter Logic
    const filtered = experts.filter(expert => {
        if (category !== "All") {
            if (category === "Student Visa" && expert.category !== "student") return false;
            if (category === "Work Permit" && expert.category !== "work") return false;
            if (category === "PR" && expert.category !== "pr") return false;
            if (category === "Local Expert" && expert.isRemote) return false;
        }

        if (city !== "All Cities") {
            if (city === "Remote" && !expert.isRemote) return false;
            if (city !== "Remote" && expert.city.toLowerCase() !== city.toLowerCase()) return false;
        }

        if (rating !== "Any") {
            if (rating === "4★+" && expert.rating < 4.0) return false;
            if (rating === "4.5★+" && expert.rating < 4.5) return false;
            if (rating === "Top Rated" && expert.rating < 4.8) return false;
        }

        if (avail !== "Anytime") {
            if (avail === "Today" && !expert.isAvailableToday) return false;
            if (avail === "Emergency 24/7" && !expert.isEmergency) return false;
        }

        if (selectedCountry !== "All") {
            const hasCountry = expert.countries.some(c => c.toLowerCase().includes(selectedCountry.toLowerCase()));
            if (!hasCountry) return false;
        }

        if (searchText.trim() !== "") {
            const query = searchText.toLowerCase();
            const matchName = expert.name.toLowerCase().includes(query);
            const matchRole = expert.role.toLowerCase().includes(query);
            const matchCity = expert.city.toLowerCase().includes(query);
            const matchTag = expert.tags.some(t => t.toLowerCase().includes(query));
            const matchCountry = expert.countries.some(c => c.toLowerCase().includes(query));
            if (!matchName && !matchRole && !matchCity && !matchTag && !matchCountry) return false;
        }

        return true;
    });

    // Sorting Logic
    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return 0;
    });

    const FilterSidebar = () => (
        <div className="space-y-6">
            <div>
                <h3 className="font-sora font-extrabold text-xs text-[#0C1A2E] uppercase tracking-wider mb-3">Service Category</h3>
                <div className="space-y-1.5">
                    {categoryFilters.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                                category === cat
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-sora font-extrabold text-xs text-[#0C1A2E] uppercase tracking-wider mb-3">Location</h3>
                <div className="space-y-1.5">
                    {cityFilters.map(c => (
                        <button
                            key={c}
                            onClick={() => setCity(c)}
                            className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                                city === c
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-sora font-extrabold text-xs text-[#0C1A2E] uppercase tracking-wider mb-3">Rating</h3>
                <div className="space-y-1.5">
                    {ratingFilters.map(r => (
                        <button
                            key={r}
                            onClick={() => setRating(r)}
                            className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                                rating === r
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-sora font-extrabold text-xs text-[#0C1A2E] uppercase tracking-wider mb-3">Availability</h3>
                <div className="space-y-1.5">
                    {availFilters.map(a => (
                        <button
                            key={a}
                            onClick={() => setAvail(a)}
                            className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                                avail === a
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
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
                                <div key={e.id} onClick={(event) => { event.preventDefault(); }} className="block group cursor-pointer">
                                    <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="relative w-20 h-20 shrink-0 mx-auto md:mx-0">
                                            {e.image && !e.image.includes("unsplash.com") ? (
                                                <img src={e.image} alt={e.name} className="w-full h-full object-cover rounded-2xl border border-slate-100" />
                                            ) : (
                                                <div className="w-full h-full rounded-2xl bg-[#00a896] text-white font-black text-2xl flex items-center justify-center border border-teal-200 shadow-2xs">
                                                    {(e.name || "E").charAt(0).toUpperCase()}
                                                </div>
                                            )}
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
                                            </div>
                                            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 gap-3">
                                                <span className="text-xs font-bold text-[#00a896]">🌍 Destinations: {e.countries.join(", ")}</span>
                                                <a href="/consultation-booking" className="w-full sm:w-auto text-center bg-[#00a896] hover:bg-[#008f80] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all">
                                                    Book Consultation
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center space-y-4 shadow-xl">
                            <MapIcon className="w-12 h-12 text-slate-400 mx-auto animate-bounce" />
                            <h3 className="font-sora font-extrabold text-navy text-lg">Map View</h3>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">Showing {sorted.length} verified experts on the interactive location map.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
