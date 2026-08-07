import { useState, useEffect, useCallback } from "react";
import { Star, MapPin, ChevronDown, List, Map as MapIcon, CheckCircle, Search, Filter, X, Loader2 } from "lucide-react";

const categoryFilters = ["All", "Student Visa", "Work Permit", "PR", "Local Expert"];
const cityFilters = ["All Cities", "Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai", "Remote"];
const ratingFilters = ["Any", "4★+", "4.5★+", "Top Rated"];
const availFilters = ["Anytime", "Today", "This Week", "Emergency 24/7"];

// Realistic dummy consultants — shown when DB has no results or as platform sample profiles
const dummyExperts: any[] = [
  {
    id: "d1", name: "Arjun Mehta", role: "Canada Immigration Consultant",
    city: "Hyderabad", bio: "10+ years helping Indian students and professionals get Canadian PR, Study Permits & PGWP. 850+ successful cases across Ontario and BC.",
    tags: ["Express Entry", "Study Permit", "PGWP", "PNP", "PR"],
    countries: ["Canada"], rating: 4.9, reviews: 312, isVerified: true, isRemote: true, govReg: "ICCRC-R123456",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "d2", name: "Priya Sharma", role: "UK & Australia Visa Specialist",
    city: "Mumbai", bio: "Specialist in UK Skilled Worker, Graduate Route, and Australian Skilled Independent visa. Former UK Home Office consultant with 8 years' experience.",
    tags: ["UK Skilled Worker", "Graduate Route", "Australia 189", "Student Visa", "SOL"],
    countries: ["United Kingdom", "Australia"], rating: 4.8, reviews: 198, isVerified: true, isRemote: true, govReg: "OISC-L2-00234",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "d3", name: "Karthik Reddy", role: "US Immigration Attorney",
    city: "Bangalore", bio: "Specializing in H-1B, L-1, O-1 visas and EB-1/EB-2 NIW green cards. Handled 500+ USCIS petitions with a 96% approval rate.",
    tags: ["H-1B", "L-1A", "EB-1", "EB-2 NIW", "O-1"],
    countries: ["United States"], rating: 5.0, reviews: 421, isVerified: true, isRemote: true, govReg: "BAR-CA-78912",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "d4", name: "Nisha Agarwal", role: "Student Visa Counsellor",
    city: "Delhi", bio: "Helped 1,200+ students secure admissions and visas to top UK, Canada and Australian universities. Free SOP review for first consultation.",
    tags: ["Student Visa", "SOP Review", "University Shortlisting", "GIC", "IELTS Prep"],
    countries: ["Canada", "United Kingdom", "Australia"], rating: 4.7, reviews: 563, isVerified: true, isRemote: true, govReg: "",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "d5", name: "Rahul Kapoor", role: "Germany Blue Card & Schengen Expert",
    city: "Pune", bio: "Fluent in German (C1) with deep expertise in Germany Blue Card, Job Seeker Visa, and EU Blue Card applications. 7+ years in Frankfurt.",
    tags: ["Germany Blue Card", "Job Seeker Visa", "Schengen", "EU Blue Card", "Freelancer Visa"],
    countries: ["Germany", "Netherlands", "Austria"], rating: 4.8, reviews: 142, isVerified: true, isRemote: true, govReg: "BAMF-2023-4512",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "d6", name: "Deepa Nair", role: "PR & Citizenship Consultant",
    city: "Chennai", bio: "Certified RCIC with expertise in Canadian citizenship, sponsorship, and Refugee protection cases. 18 years of experience, 99% approval rate.",
    tags: ["Canadian PR", "Citizenship", "Family Sponsorship", "Refugee", "Super Visa"],
    countries: ["Canada"], rating: 4.9, reviews: 389, isVerified: true, isRemote: true, govReg: "ICCRC-R987654",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "d7", name: "Vikram Singh", role: "UAE & Gulf Work Visa Specialist",
    city: "Ahmedabad", bio: "Specialized in UAE employment visas, Dubai Freelancer permits, and Gulf work permits for skilled Indian professionals. 2000+ placements.",
    tags: ["UAE Work Visa", "Dubai Freelancer", "Qatar", "Saudi Iqama", "Kuwait"],
    countries: ["UAE", "Qatar", "Saudi Arabia", "Kuwait"], rating: 4.6, reviews: 278, isVerified: false, isRemote: true, govReg: "",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "d8", name: "Sneha Joshi", role: "New Zealand & Australia Skilled Visa",
    city: "Nagpur", bio: "Expert in New Zealand Skilled Migrant, Essential Skills Visa, and Australian state-nominated PR pathways. 450+ NZ approvals.",
    tags: ["NZ Skilled Migrant", "Essential Skills", "Australia 190", "Australia 491", "RSE"],
    countries: ["New Zealand", "Australia"], rating: 4.7, reviews: 203, isVerified: true, isRemote: true, govReg: "IAA-0023456",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "d9", name: "Amir Khan", role: "Immigration Lawyer",
    city: "Hyderabad", bio: "Immigration law practitioner handling visa refusals, appeals, bans, and court representations for Canada, UK, and Australia. Free 30-min consultation.",
    tags: ["Visa Refusal", "Appeals", "Deportation Defence", "Ban Lifting", "Legal Representation"],
    countries: ["Canada", "United Kingdom", "Australia"], rating: 4.9, reviews: 97, isVerified: true, isRemote: true, govReg: "BAR-HYD-3344",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "d10", name: "Kavitha Menon", role: "Business & Investor Visa Consultant",
    city: "Kochi", bio: "Helping HNIs and entrepreneurs migrate through Canada Start-Up Visa, UK Innovator Founder, and Portugal Golden Visa programs.",
    tags: ["Canada Start-Up Visa", "UK Innovator", "Portugal Golden Visa", "Business Visa", "Investment"],
    countries: ["Canada", "United Kingdom", "Portugal"], rating: 4.8, reviews: 56, isVerified: true, isRemote: true, govReg: "ICCRC-R556677",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "d11", name: "Suresh Babu", role: "Work Permit & LMIA Specialist",
    city: "Coimbatore", bio: "LMIA expert with strong employer network in Canada. Helping skilled workers in healthcare, construction, and IT get work permits fast.",
    tags: ["LMIA", "Work Permit", "PGWP", "Healthcare Workers", "NOC Matching"],
    countries: ["Canada"], rating: 4.6, reviews: 184, isVerified: false, isRemote: true, govReg: "",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "d12", name: "Ritu Malhotra", role: "Tourist & Visit Visa Consultant",
    city: "Jaipur", bio: "Specializing in Schengen, USA B-2, Canada visitor and Super Visas. 98% success rate for tourist and family visit applications.",
    tags: ["Schengen Visa", "USA B-2", "Canada Visitor", "Super Visa", "Travel History"],
    countries: ["USA", "Canada", "Germany", "France", "Italy"], rating: 4.5, reviews: 445, isVerified: true, isRemote: true, govReg: "",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face"
  },
];

export function FindExpertsPortal() {
    const [viewMode, setViewMode] = useState<"list" | "map">("list");
    const [experts, setExperts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");
    const [category, setCategory] = useState("All");
    const [city, setCity] = useState("All Cities");
    const [rating, setRating] = useState("Any");
    const [avail, setAvail] = useState("Anytime");
    const [sortBy, setSortBy] = useState("recommended");
    const [searchText, setSearchText] = useState("");
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [sortOpen, setSortOpen] = useState(false);

    // ── Fetch real experts from Neon DB, then append dummies ──
    const fetchExperts = useCallback(async (q = "", country = "", purpose = "", cityParam = "") => {
        setLoading(true);
        setFetchError("");
        try {
            const params = new URLSearchParams();
            if (q) params.set("q", q);
            if (country && country !== "All") params.set("country", country);
            if (purpose) params.set("purpose", purpose);
            if (cityParam && cityParam !== "All Cities") params.set("city", cityParam);

            const res = await fetch(`/api/experts?${params.toString()}`);
            const data = await res.json();

            // Real DB experts come first, dummies fill the rest
            let dbExperts: any[] = [];
            if (data.success && Array.isArray(data.experts)) {
                dbExperts = data.experts;
            }

            // Filter dummies by search query client-side
            let filteredDummies = dummyExperts;
            if (q) {
                const ql = q.toLowerCase();
                filteredDummies = dummyExperts.filter(e =>
                    e.name.toLowerCase().includes(ql) ||
                    e.role.toLowerCase().includes(ql) ||
                    e.city.toLowerCase().includes(ql) ||
                    e.tags.some((t: string) => t.toLowerCase().includes(ql)) ||
                    e.countries.some((c: string) => c.toLowerCase().includes(ql)) ||
                    (e.bio || '').toLowerCase().includes(ql)
                );
            }
            if (country && country !== "All") {
                filteredDummies = filteredDummies.filter(e =>
                    e.countries.some((c: string) => c.toLowerCase().includes(country.toLowerCase()))
                );
            }

            // Merge: real experts first, then dummies (deduplicate by name)
            const dbNames = new Set(dbExperts.map((e: any) => e.name.toLowerCase()));
            const uniqueDummies = filteredDummies.filter(e => !dbNames.has(e.name.toLowerCase()));
            setExperts([...dbExperts, ...uniqueDummies]);

            if (data.error) setFetchError(data.error);
        } catch (err: any) {
            // On error still show dummies so page isn't empty
            setExperts(dummyExperts);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!sortOpen) return;
        const handleOutside = () => setSortOpen(false);
        window.addEventListener("click", handleOutside);
        return () => window.removeEventListener("click", handleOutside);
    }, [sortOpen]);

    // Read URL params once on mount and trigger initial fetch
    useEffect(() => {
        let initQ = "";
        let initCountry = "All";
        let initCity = "All Cities";
        let initPurpose = "";

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
            if (countryQuery) { setSelectedCountry(countryQuery); initCountry = countryQuery; }

            const textQuery = params.get("q") || params.get("query") || "";
            if (textQuery) { setSearchText(textQuery); initQ = textQuery; }

            const cityQuery = params.get("city") || "";
            if (cityQuery) {
                const matchCity = cityFilters.find(c => c.toLowerCase() === cityQuery.toLowerCase());
                if (matchCity) { setCity(matchCity); initCity = matchCity; }
            }

            const purposeQuery = params.get("purpose") || "";
            if (purposeQuery) initPurpose = purposeQuery;
        }

        // Fetch with initial URL params
        fetchExperts(initQ, initCountry, initPurpose, initCity);
    }, [fetchExperts]);


    // Filter Logic
    const filtered = experts.filter(expert => {
        if (category !== "All") {
            const catLower = category.toLowerCase();
            const hasCategoryMatch = expert.category === catLower ||
                expert.role.toLowerCase().includes(catLower) ||
                expert.tags.some(t => t.toLowerCase().includes(catLower));
            if (category === "Student Visa" && !hasCategoryMatch && !expert.tags.some(t => t.toLowerCase().includes("study"))) return false;
            if (category === "Work Permit" && !hasCategoryMatch && !expert.tags.some(t => t.toLowerCase().includes("work"))) return false;
            if (category === "PR" && !hasCategoryMatch && !expert.tags.some(t => t.toLowerCase().includes("pr") || t.toLowerCase().includes("migration"))) return false;
            if (category === "Local Expert" && expert.city === "Remote") return false;
        }

        if (city !== "All Cities") {
            if (city === "Remote" && !expert.isRemote) return false;
            if (city !== "Remote" && !expert.city.toLowerCase().includes(city.toLowerCase())) return false;
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
                            <input
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') fetchExperts(searchText, selectedCountry); }}
                                placeholder="Search by name, country, specialty..."
                                className="bg-transparent outline-none text-xs w-full font-medium"
                            />
                            {searchText && (
                                <button onClick={() => { setSearchText(''); fetchExperts('', selectedCountry); }} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => fetchExperts(searchText, selectedCountry)}
                            className="shrink-0 bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                        >
                            <Search className="w-3.5 h-3.5" /> Search
                        </button>
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
                        {loading ? (
                            <p className="text-xs font-black tracking-wider text-gray-400 flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading experts from database...</p>
                        ) : (
                            <p className="text-xs font-black tracking-wider text-gray-400">{sorted.length} expert{sorted.length !== 1 ? "s" : ""} found</p>
                        )}
                        {selectedCountry !== "All" && (
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] bg-slate-900 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-sm">
                                    🌍 Destination: {selectedCountry}
                                    <button onClick={() => { setSelectedCountry("All"); fetchExperts(searchText, "All"); }} className="hover:text-red-400 font-extrabold text-[12px] ml-1">×</button>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Loading skeleton */}
                    {loading && (
                        <div className="space-y-4">
                            {[1,2,3].map(i => (
                                <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 flex gap-5 shadow-sm animate-pulse">
                                    <div className="w-20 h-20 rounded-2xl bg-slate-200 shrink-0" />
                                    <div className="flex-1 space-y-3">
                                        <div className="h-4 bg-slate-200 rounded-lg w-1/3" />
                                        <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
                                        <div className="h-3 bg-slate-100 rounded-lg w-2/3" />
                                        <div className="flex gap-2 mt-2">
                                            <div className="h-6 w-16 bg-slate-100 rounded-full" />
                                            <div className="h-6 w-20 bg-slate-100 rounded-full" />
                                            <div className="h-6 w-14 bg-slate-100 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error state */}
                    {!loading && fetchError && (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                            <p className="text-red-600 font-bold text-sm">{fetchError}</p>
                            <button onClick={() => fetchExperts(searchText, selectedCountry)} className="mt-3 text-xs font-bold text-red-500 underline">Retry</button>
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && !fetchError && experts.length === 0 && (
                        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center space-y-4 shadow-xl">
                            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto">
                                <Users className="w-8 h-8 text-[#00a896]" />
                            </div>
                            <h3 className="font-sora font-extrabold text-navy text-lg">No Registered Experts Yet</h3>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">Be the first! Register as an expert consultant and your profile will appear here for thousands of seekers to discover.</p>
                            <a href="/register/expert" className="inline-block mt-2 bg-[#00a896] text-white text-xs font-extrabold px-6 py-2.5 rounded-xl shadow-md hover:bg-[#008f80] transition-all">Register as Expert →</a>
                        </div>
                    )}

                    {viewMode === "list" && !loading ? (
                        <div className="space-y-4">
                            {sorted.map(e => (
                                <div key={e.id} className="block group cursor-pointer">
                                    <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        {/* Avatar */}
                                        <div className="relative w-20 h-20 shrink-0 mx-auto md:mx-0">
                                            {e.image ? (
                                                <img src={e.image} alt={e.name} className="w-full h-full object-cover rounded-2xl border border-slate-100" />
                                            ) : (
                                                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#00a896] to-[#006b5e] text-white font-black text-2xl flex items-center justify-center border border-teal-200">
                                                    {(e.name || "E").charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            {e.isVerified && (
                                                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full border-2 border-white">
                                                    ✓ Verified
                                                </span>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2 text-center sm:text-left">
                                                <div>
                                                    <h3 className="text-lg font-bold font-sora text-navy group-hover:text-slate-900 transition-colors flex items-center justify-center sm:justify-start gap-2 leading-tight">
                                                        {e.name} <CheckCircle className="w-4 h-4 text-[#00a896] fill-teal-50" />
                                                    </h3>
                                                    <p className="text-xs text-gray-400 mt-0.5">{e.role}</p>
                                                </div>
                                                <div className="text-center sm:text-right shrink-0">
                                                    <div className="flex items-center gap-1 justify-center sm:justify-end">
                                                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                                        <span className="font-bold text-sm text-navy">{e.rating?.toFixed(1)}</span>
                                                        {e.reviews > 0 && <span className="text-[10px] text-gray-400">({e.reviews} reviews)</span>}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bio */}
                                            {e.bio && (
                                                <p className="text-xs text-gray-500 mb-3 line-clamp-2 text-center sm:text-left">{e.bio}</p>
                                            )}

                                            {/* Meta */}
                                            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-xs font-semibold text-gray-500 mb-3">
                                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {e.city}</span>
                                                {e.isRemote && <span className="text-emerald-600">· Remote available</span>}
                                                {e.govReg && <span className="text-blue-600">· Govt. Registered</span>}
                                            </div>

                                            {/* Tags */}
                                            {e.tags && e.tags.length > 0 && (
                                                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mb-4">
                                                    {e.tags.slice(0, 5).map((tag: string) => (
                                                        <span key={tag} className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-teal-100">{tag}</span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Footer */}
                                            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 gap-3">
                                                <span className="text-xs font-bold text-[#00a896]">🌍 {e.countries?.join(", ")}</span>
                                                <a href="/consultation-booking" className="w-full sm:w-auto text-center bg-[#00a896] hover:bg-[#008f80] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all">
                                                    Book Consultation
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : !loading ? (
                        <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center space-y-4 shadow-xl">
                            <MapIcon className="w-12 h-12 text-slate-400 mx-auto animate-bounce" />
                            <h3 className="font-sora font-extrabold text-navy text-lg">Map View</h3>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">Showing {sorted.length} verified experts on the interactive location map.</p>
                        </div>
                    ) : null}

                </section>
            </main>
        </div>
    );
}
