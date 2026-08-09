import { useState, useEffect, useCallback } from "react";
import { Star, MapPin, ChevronDown, List, Map as MapIcon, CheckCircle, Search, Filter, X, Loader2, Users } from "lucide-react";
import { ExpertProfileModal } from "./ExpertProfileModal";


const categoryFilters = ["All", "Student Visa", "Work Permit", "PR", "Local Expert"];
const cityFilters = ["All Cities", "Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai", "Remote"];
const ratingFilters = ["Any", "4★+", "4.5★+", "Top Rated"];
const availFilters = ["Anytime", "Today", "This Week", "Emergency 24/7"];

// Sample platform consultants — shown alongside real DB experts
const dummyExperts: any[] = [
  {
    id: "d1", name: "Arjun Mehta", role: "Canada Immigration Consultant",
    city: "Hyderabad", bio: "10+ years helping Indian students and professionals get Canadian PR, Study Permits & PGWP. 850+ successful cases across Ontario and BC.",
    tags: ["Express Entry", "Study Permit", "PGWP", "PNP", "PR"],
    countries: ["Canada"], rating: 4.9, reviews: 312, isVerified: true, isRemote: true, govReg: "ICCRC-R123456",
    image: "/experts/arjun_mehta.jpg"
  },
  {
    id: "d2", name: "Priya Sharma", role: "UK & Australia Visa Specialist",
    city: "Mumbai", bio: "Specialist in UK Skilled Worker, Graduate Route, and Australian Skilled Independent visa. Former UK Home Office consultant with 8 years' experience.",
    tags: ["UK Skilled Worker", "Graduate Route", "Australia 189", "Student Visa", "SOL"],
    countries: ["United Kingdom", "Australia"], rating: 4.8, reviews: 198, isVerified: true, isRemote: true, govReg: "OISC-L2-00234",
    image: "/experts/priya_sharma.jpg"
  },
  {
    id: "d3", name: "Karthik Reddy", role: "US Immigration Attorney",
    city: "Bangalore", bio: "Specializing in H-1B, L-1, O-1 visas and EB-1/EB-2 NIW green cards. Handled 500+ USCIS petitions with a 96% approval rate.",
    tags: ["H-1B", "L-1A", "EB-1", "EB-2 NIW", "O-1"],
    countries: ["United States"], rating: 5.0, reviews: 421, isVerified: true, isRemote: true, govReg: "BAR-CA-78912",
    image: "/experts/karthik_reddy.jpg"
  },
  {
    id: "d4", name: "Nisha Agarwal", role: "Student Visa Counsellor",
    city: "Delhi", bio: "Helped 1,200+ students secure admissions and visas to top UK, Canada and Australian universities. Free SOP review for first consultation.",
    tags: ["Student Visa", "SOP Review", "University Shortlisting", "GIC", "IELTS Prep"],
    countries: ["Canada", "United Kingdom", "Australia"], rating: 4.7, reviews: 563, isVerified: true, isRemote: true, govReg: "",
    image: "/experts/nisha_agarwal.jpg"
  },
  {
    id: "d5", name: "Rahul Kapoor", role: "Germany Blue Card & Schengen Expert",
    city: "Pune", bio: "Fluent in German (C1) with deep expertise in Germany Blue Card, Job Seeker Visa, and EU Blue Card applications. 7+ years in Frankfurt.",
    tags: ["Germany Blue Card", "Job Seeker Visa", "Schengen", "EU Blue Card", "Freelancer Visa"],
    countries: ["Germany", "Netherlands", "Austria"], rating: 4.8, reviews: 142, isVerified: true, isRemote: true, govReg: "BAMF-2023-4512",
    image: "/experts/rahul_kapoor.jpg"
  },
  {
    id: "d6", name: "Deepa Nair", role: "PR & Citizenship Consultant",
    city: "Chennai", bio: "Certified RCIC with expertise in Canadian citizenship, sponsorship, and Refugee protection cases. 18 years of experience, 99% approval rate.",
    tags: ["Canadian PR", "Citizenship", "Family Sponsorship", "Refugee", "Super Visa"],
    countries: ["Canada"], rating: 4.9, reviews: 389, isVerified: true, isRemote: true, govReg: "ICCRC-R987654",
    image: "/experts/deepa_nair.jpg"
  },
  {
    id: "d7", name: "Vikram Singh", role: "UAE & Gulf Work Visa Specialist",
    city: "Ahmedabad", bio: "Specialized in UAE employment visas, Dubai Freelancer permits, and Gulf work permits for skilled Indian professionals. 2000+ placements.",
    tags: ["UAE Work Visa", "Dubai Freelancer", "Qatar", "Saudi Iqama", "Kuwait"],
    countries: ["UAE", "Qatar", "Saudi Arabia", "Kuwait"], rating: 4.6, reviews: 278, isVerified: false, isRemote: true, govReg: "",
    image: "/experts/vikram_singh.jpg"
  },
  {
    id: "d8", name: "Sneha Joshi", role: "New Zealand & Australia Skilled Visa",
    city: "Nagpur", bio: "Expert in New Zealand Skilled Migrant, Essential Skills Visa, and Australian state-nominated PR pathways. 450+ NZ approvals.",
    tags: ["NZ Skilled Migrant", "Essential Skills", "Australia 190", "Australia 491", "RSE"],
    countries: ["New Zealand", "Australia"], rating: 4.7, reviews: 203, isVerified: true, isRemote: true, govReg: "IAA-0023456",
    image: "/experts/sneha_joshi.jpg"
  },
  {
    id: "d9", name: "Amir Khan", role: "Immigration Lawyer",
    city: "Hyderabad", bio: "Immigration law practitioner handling visa refusals, appeals, bans, and court representations for Canada, UK, and Australia. Free 30-min consultation.",
    tags: ["Visa Refusal", "Appeals", "Deportation Defence", "Ban Lifting", "Legal Representation"],
    countries: ["Canada", "United Kingdom", "Australia"], rating: 4.9, reviews: 97, isVerified: true, isRemote: true, govReg: "BAR-HYD-3344",
    image: "/experts/amir_khan.jpg"
  },
  {
    id: "d10", name: "Kavitha Menon", role: "Business & Investor Visa Consultant",
    city: "Kochi", bio: "Helping HNIs and entrepreneurs migrate through Canada Start-Up Visa, UK Innovator Founder, and Portugal Golden Visa programs.",
    tags: ["Canada Start-Up Visa", "UK Innovator", "Portugal Golden Visa", "Business Visa", "Investment"],
    countries: ["Canada", "United Kingdom", "Portugal"], rating: 4.8, reviews: 56, isVerified: true, isRemote: true, govReg: "ICCRC-R556677",
    image: "/experts/kavitha_menon.jpg"
  },
  {
    id: "d11", name: "Suresh Babu", role: "Work Permit & LMIA Specialist",
    city: "Coimbatore", bio: "LMIA expert with strong employer network in Canada. Helping skilled workers in healthcare, construction, and IT get work permits fast.",
    tags: ["LMIA", "Work Permit", "PGWP", "Healthcare Workers", "NOC Matching"],
    countries: ["Canada"], rating: 4.6, reviews: 184, isVerified: false, isRemote: true, govReg: "",
    image: "/experts/suresh_babu.jpg"
  },
  {
    id: "d12", name: "Ritu Malhotra", role: "Tourist & Visit Visa Consultant",
    city: "Jaipur", bio: "Specializing in Schengen, USA B-2, Canada visitor and Super Visas. 98% success rate for tourist and family visit applications.",
    tags: ["Schengen Visa", "USA B-2", "Canada Visitor", "Super Visa", "Travel History"],
    countries: ["USA", "Canada", "Germany", "France", "Italy"], rating: 4.5, reviews: 445, isVerified: true, isRemote: true, govReg: "",
    image: "/experts/ritu_malhotra.jpg"
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
    const [selectedProfileExpert, setSelectedProfileExpert] = useState<any>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const isUserLoggedIn = () => {
        if (typeof window === "undefined") return false;
        const user = localStorage.getItem("visaformula_user");
        const seekerEmail = localStorage.getItem("seeker_email");
        const expertLoggedIn = localStorage.getItem("expert_isLoggedIn") === "true";
        return !!(user || seekerEmail || expertLoggedIn);
    };

    const handleExpertCardClick = (expertObj: any) => {
        if (!isUserLoggedIn()) {
            setShowLoginModal(true);
        } else {
            setSelectedProfileExpert(expertObj);
        }
    };



    // ── Fetch real experts from DB & local storage, then filter accurately by search ──
    const fetchExperts = useCallback(async (q = "", country = "", purpose = "", cityParam = "") => {
        setLoading(true);
        setFetchError("");
        try {
            const params = new URLSearchParams();
            if (q) params.set("q", q);
            if (country && country !== "All") params.set("country", country);
            if (purpose) params.set("purpose", purpose);
            if (cityParam && cityParam !== "All Cities") params.set("city", cityParam);

            let dbExperts: any[] = [];
            try {
                const res = await fetch(`/api/experts?${params.toString()}`);
                const data = await res.json();
                if (data.success && Array.isArray(data.experts)) {
                    dbExperts = data.experts;
                }
            } catch (err) {}

            // Get experts registered in LocalStorage (from signup flow)
            let localRegisteredExperts: any[] = [];
            if (typeof window !== "undefined") {
                try {
                    const storedAll = localStorage.getItem("visaformula_all_experts");
                    if (storedAll) localRegisteredExperts = JSON.parse(storedAll);
                } catch(e) {}

                // Also check if current logged-in expert profile exists
                const currExpertName = localStorage.getItem("expert_businessName") || `${localStorage.getItem("expert_firstName") || ''} ${localStorage.getItem("expert_lastName") || ''}`.trim();
                const currExpertEmail = localStorage.getItem("expert_email");
                if (currExpertName && currExpertEmail) {
                    const currExpertObj = {
                        id: `curr-expert-${Date.now()}`,
                        name: currExpertName,
                        role: localStorage.getItem("expert_advisorType") || "Visa Consultant",
                        city: localStorage.getItem("expert_city") || "Remote",
                        bio: localStorage.getItem("expert_businessDescription") || "Verified VisaFormula Immigration Consultant.",
                        tags: JSON.parse(localStorage.getItem("expert_services") || '["Visa Consultation", "Immigration"]'),
                        countries: [localStorage.getItem("expert_country") || "Canada"],
                        rating: 5.0,
                        reviews: 1,
                        isVerified: true,
                        isRemote: true,
                        email: currExpertEmail,
                        contact_number: localStorage.getItem("expert_contactNumber") || "",
                        image: localStorage.getItem("expert_profilePhoto") || ""
                    };
                    localRegisteredExperts.unshift(currExpertObj);
                }
            }

            // Read any active profile updates saved locally (e.g. DP photo change, bio change)
            let expertUpdates: Record<string, any> = {};
            if (typeof window !== "undefined") {
                try {
                    const storedUpdates = localStorage.getItem("visaformula_expert_profile_updates");
                    if (storedUpdates) expertUpdates = JSON.parse(storedUpdates);
                } catch (e) {}
            }

            // Combine candidate pools and apply real-time profile updates
            const combinedPool = [...localRegisteredExperts, ...dbExperts, ...dummyExperts].map(e => {
                const key = (e.name || e.business_name || '').toLowerCase().trim();
                if (expertUpdates[key]) {
                    const updateObj = expertUpdates[key];
                    return {
                        ...e,
                        name: updateObj.name || e.name,
                        role: updateObj.role || e.role,
                        city: updateObj.city || e.city,
                        bio: updateObj.bio || e.bio,
                        image: updateObj.image || updateObj.profile_photo || e.image,
                        tags: updateObj.tags || e.tags,
                        countries: updateObj.countries || e.countries,
                        phone: updateObj.phone || e.phone
                    };
                }
                return e;
            });

            // Perform accurate multi-field search filtering
            let filtered = combinedPool;

            // 1. Search Query (q)
            if (q && q.trim()) {
                const searchLower = q.toLowerCase().trim();
                const searchWords = searchLower.split(/\s+/).filter(Boolean);
                filtered = filtered.filter(e => {
                    const text = [
                        e.name || e.business_name || '',
                        e.role || e.advisor_type || '',
                        e.city || e.office_address || '',
                        e.bio || e.about_me || '',
                        e.email || '',
                        e.phone || e.contact_number || '',
                        ...(Array.isArray(e.tags) ? e.tags : [e.tags || '']),
                        ...(Array.isArray(e.countries) ? e.countries : [e.countries || '']),
                    ].join(' ').toLowerCase();

                    return searchWords.every(word => text.includes(word));
                });
            }

            // 2. Destination Country
            if (country && country !== "All") {
                const cLower = country.toLowerCase();
                filtered = filtered.filter(e => {
                    const cList = Array.isArray(e.countries) ? e.countries : [e.countries || ''];
                    return cList.some((c: string) => String(c).toLowerCase().includes(cLower));
                });
            }

            // 3. City
            if (cityParam && cityParam !== "All Cities") {
                const cityLower = cityParam.toLowerCase();
                filtered = filtered.filter(e => {
                    const cName = String(e.city || e.office_address || '').toLowerCase();
                    return cName.includes(cityLower);
                });
            }

            // Deduplicate by lowercased name/email
            const seenIdentifiers = new Set<string>();
            const deduplicated = filtered.filter(e => {
                const identifier = (e.name || e.business_name || e.email || '').toLowerCase().trim();
                if (!identifier || seenIdentifiers.has(identifier)) return false;
                seenIdentifiers.add(identifier);
                return true;
            });

            setExperts(deduplicated);
        } catch (err: any) {
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

            // --- q: free text search ---
            const textQuery = params.get("q") || params.get("query") || "";
            if (textQuery) { setSearchText(textQuery); initQ = textQuery; setSortBy("relevance"); }

            // --- country: destination country ---
            const countryQuery = params.get("country") || "";
            if (countryQuery) { setSelectedCountry(countryQuery); initCountry = countryQuery; }

            // --- city: consultant's city ---
            const cityQuery = params.get("city") || "";
            if (cityQuery) {
                // Try exact match in cityFilters list first
                const matchCity = cityFilters.find(c => c.toLowerCase() === cityQuery.toLowerCase());
                if (matchCity) {
                    setCity(matchCity); initCity = matchCity;
                } else {
                    // Store partial match for free-text filtering
                    setSearchText(prev => prev ? `${prev} ${cityQuery}` : cityQuery);
                    if (!textQuery) initQ = cityQuery;
                }
            }

            // --- category: visa/service category (full name from homepage) ---
            const catQuery = params.get("category") || "";
            if (catQuery) {
                const cat = catQuery.toLowerCase();
                if (cat.includes("student")) {
                    setCategory("Student Visa");
                } else if (cat.includes("work")) {
                    setCategory("Work Permit");
                } else if (cat.includes("pr") || cat.includes("express") || cat.includes("permanent")) {
                    setCategory("PR");
                } else if (cat.includes("tourist") || cat.includes("visitor")) {
                    // tourist/visitor — search by tag
                    initQ = initQ ? `${initQ} ${catQuery}` : catQuery;
                    setSearchText(initQ);
                } else if (cat.includes("business") || cat.includes("investor")) {
                    initQ = initQ ? `${initQ} Business Visa` : "Business Visa";
                    setSearchText(initQ);
                } else if (cat.includes("dependent") || cat.includes("spousal") || cat.includes("partner")) {
                    initQ = initQ ? `${initQ} ${catQuery}` : catQuery;
                    setSearchText(initQ);
                } else {
                    // Generic: pass as text search
                    initQ = initQ ? `${initQ} ${catQuery}` : catQuery;
                    setSearchText(initQ);
                }
                initPurpose = catQuery;
            }

            // --- legacy: ?category=student shorthand ---
            const shortCat = params.get("cat") || "";
            if (shortCat) {
                if (shortCat === "student") setCategory("Student Visa");
                if (shortCat === "work") setCategory("Work Permit");
                if (shortCat === "pr") setCategory("PR");
                if (shortCat === "local") setCategory("Local Expert");
            }
        }

        fetchExperts(initQ, initCountry, initPurpose, initCity);
    }, [fetchExperts]);


    // Filter Logic
    const filtered = experts.filter(expert => {
        if (!expert) return false;

        const tags = Array.isArray(expert.tags) ? expert.tags : [expert.tags || ''];
        const countries = Array.isArray(expert.countries) ? expert.countries : [expert.countries || ''];
        const role = String(expert.role || expert.advisor_type || '');
        const cityStr = String(expert.city || expert.office_address || '');
        const name = String(expert.name || expert.business_name || '');
        const bio = String(expert.bio || expert.about_me || '');

        if (category !== "All") {
            const catLower = category.toLowerCase();
            const hasCategoryMatch = expert.category?.toLowerCase() === catLower ||
                role.toLowerCase().includes(catLower) ||
                tags.some((t: string) => String(t).toLowerCase().includes(catLower));

            if (category === "Student Visa" && !hasCategoryMatch && !tags.some((t: string) => String(t).toLowerCase().includes("stud") || String(t).toLowerCase().includes("education"))) return false;
            if (category === "Work Permit" && !hasCategoryMatch && !tags.some((t: string) => String(t).toLowerCase().includes("work") || String(t).toLowerCase().includes("job"))) return false;
            if (category === "PR" && !hasCategoryMatch && !tags.some((t: string) => String(t).toLowerCase().includes("pr") || String(t).toLowerCase().includes("migrat") || String(t).toLowerCase().includes("express"))) return false;
            if (category === "Local Expert" && (cityStr === "Remote" || expert.isRemote)) return false;
        }

        if (city !== "All Cities") {
            if (city === "Remote" && !expert.isRemote) return false;
            if (city !== "Remote" && !cityStr.toLowerCase().includes(city.toLowerCase())) return false;
        }

        if (rating !== "Any") {
            const r = Number(expert.rating || 0);
            if (rating === "4★+" && r < 4.0) return false;
            if (rating === "4.5★+" && r < 4.5) return false;
            if (rating === "Top Rated" && r < 4.8) return false;
        }

        if (avail !== "Anytime") {
            if (avail === "Today" && !expert.isAvailableToday) return false;
            if (avail === "Emergency 24/7" && !expert.isEmergency) return false;
        }

        if (selectedCountry !== "All") {
            const hasCountry = countries.some((c: string) => String(c).toLowerCase().includes(selectedCountry.toLowerCase()));
            if (!hasCountry) return false;
        }

        if (searchText && searchText.trim() !== "") {
            const searchWords = searchText.toLowerCase().trim().split(/\s+/).filter(Boolean);
            const fullText = [name, role, cityStr, bio, expert.email || '', expert.phone || expert.contact_number || '', ...tags, ...countries].join(' ').toLowerCase();
            const matchAllWords = searchWords.every(word => fullText.includes(word));
            if (!matchAllWords) return false;
        }

        return true;
    });

    // Relevance Scoring Helper for search matches
    const getRelevanceScore = (e: any, query: string) => {
        if (!query || !query.trim()) return (e.rating || 0);
        const q = query.toLowerCase().trim();
        let score = 0;
        const name = (e.name || e.business_name || '').toLowerCase();
        const role = (e.role || e.advisor_type || '').toLowerCase();
        const tags = (Array.isArray(e.tags) ? e.tags : [e.tags || '']).map((t: string) => String(t).toLowerCase());
        const bio = (e.bio || e.about_me || '').toLowerCase();
        const cityStr = (e.city || '').toLowerCase();
        const countries = (Array.isArray(e.countries) ? e.countries : [e.countries || '']).map((c: string) => String(c).toLowerCase());

        if (name === q) score += 200;
        else if (name.includes(q)) score += name.startsWith(q) ? 120 : 80;

        if (role.includes(q)) score += role.startsWith(q) ? 100 : 60;
        if (tags.some((t: string) => t.includes(q))) score += 70;
        if (countries.some((c: string) => c.includes(q))) score += 40;
        if (bio.includes(q)) score += 30;
        if (cityStr.includes(q)) score += 20;
        if (e.isVerified) score += 10;
        score += (e.rating || 0);

        return score;
    };

    // Sorting Logic
    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "relevance") {
            const scoreA = getRelevanceScore(a, searchText);
            const scoreB = getRelevanceScore(b, searchText);
            if (scoreB !== scoreA) return scoreB - scoreA;
            return (b.rating || 0) - (a.rating || 0);
        }
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
        if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
        return (b.rating || 0) - (a.rating || 0); // Recommended default
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
        <div className="bg-[#f8fafc] min-h-screen font-sans">
            <main className="max-w-7xl mx-auto flex flex-col lg:flex-row py-8 px-4 gap-8 font-sans">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-[300px] shrink-0">
                    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm sticky top-24 font-sans">
                        <h2 className="font-sans text-lg font-bold text-slate-900 mb-4">Filters</h2>
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
                                onKeyDown={e => { if (e.key === 'Enter') { if (searchText.trim()) setSortBy("relevance"); fetchExperts(searchText, selectedCountry); } }}
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
                            onClick={() => { if (searchText.trim()) setSortBy("relevance"); fetchExperts(searchText, selectedCountry); }}
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
                                        {sortBy === "relevance" && "Relevance"}
                                        {sortBy === "recommended" && "Recommended"}
                                        {sortBy === "rating" && "Highest Rated"}
                                        {sortBy === "price-low" && "Price: Low → High"}
                                        {sortBy === "price-high" && "Price: High → Low"}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </button>
                                {sortOpen && (
                                    <div className="absolute top-full right-0 bg-white border border-slate-200 rounded-xl shadow-xl mt-1 py-1 z-50 min-w-[150px] font-sans">
                                        <button
                                            onClick={() => { setSortBy("relevance"); setSortOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#00a896] hover:text-white transition-colors"
                                        >
                                            Relevance
                                        </button>
                                        <button
                                            onClick={() => { setSortBy("recommended"); setSortOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#00a896] hover:text-white transition-colors"
                                        >
                                            Recommended
                                        </button>
                                        <button
                                            onClick={() => { setSortBy("rating"); setSortOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#00a896] hover:text-white transition-colors"
                                        >
                                            Highest Rated
                                        </button>
                                        <button
                                            onClick={() => { setSortBy("price-low"); setSortOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#00a896] hover:text-white transition-colors"
                                        >
                                            Price: Low → High
                                        </button>
                                        <button
                                            onClick={() => { setSortBy("price-high"); setSortOpen(false); }}
                                            className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#00a896] hover:text-white transition-colors"
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
                            <p className="text-xs font-extrabold tracking-wider text-slate-400 flex items-center gap-2 font-sans"><Loader2 className="w-3.5 h-3.5 animate-spin text-[#00a896]" /> Loading verified experts...</p>
                        ) : (
                            <p className="text-xs font-extrabold tracking-wider text-slate-500 font-sans">{sorted.length} expert{sorted.length !== 1 ? "s" : ""} found</p>
                        )}

                        {/* Active Filter Chips / Pills */}
                        <div className="flex flex-wrap items-center gap-2">
                            {selectedCountry !== "All" && (
                                <span className="text-[11px] bg-slate-900 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-xs font-sans">
                                    🌍 Country: {selectedCountry}
                                    <button onClick={() => { setSelectedCountry("All"); fetchExperts(searchText, "All"); }} className="hover:text-red-300 font-extrabold text-[13px] ml-1 cursor-pointer">×</button>
                                </span>
                            )}
                            {category !== "All" && (
                                <span className="text-[11px] bg-slate-900 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-xs font-sans">
                                    📂 Category: {category}
                                    <button onClick={() => setCategory("All")} className="hover:text-red-300 font-extrabold text-[13px] ml-1 cursor-pointer">×</button>
                                </span>
                            )}
                            {city !== "All Cities" && (
                                <span className="text-[11px] bg-slate-900 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-xs font-sans">
                                    📍 Location: {city}
                                    <button onClick={() => setCity("All Cities")} className="hover:text-red-300 font-extrabold text-[13px] ml-1 cursor-pointer">×</button>
                                </span>
                            )}
                            {searchText.trim() !== "" && (
                                <span className="text-[11px] bg-teal-800 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-xs font-sans">
                                    🔍 "{searchText}"
                                    <button onClick={() => { setSearchText(""); fetchExperts("", selectedCountry); }} className="hover:text-red-300 font-extrabold text-[13px] ml-1 cursor-pointer">×</button>
                                </span>
                            )}
                            {(category !== "All" || city !== "All Cities" || selectedCountry !== "All" || searchText.trim() !== "" || rating !== "Any" || avail !== "Anytime") && (
                                <button
                                    onClick={() => {
                                        setSearchText("");
                                        setCategory("All");
                                        setCity("All Cities");
                                        setRating("Any");
                                        setAvail("Anytime");
                                        setSelectedCountry("All");
                                        fetchExperts("", "All");
                                    }}
                                    className="text-[11px] text-slate-500 hover:text-slate-900 font-bold underline px-1 cursor-pointer font-sans"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
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

                    {/* Empty DB state */}
                    {!loading && !fetchError && experts.length === 0 && (
                        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center space-y-4 shadow-xl">
                            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto">
                                <Users className="w-8 h-8 text-[#00a896]" />
                            </div>
                            <h3 className="font-sans font-extrabold text-slate-900 text-lg">No Registered Experts Yet</h3>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">Be the first! Register as an expert consultant and your profile will appear here for thousands of seekers to discover.</p>
                            <a href="/register/expert" className="inline-block mt-2 bg-[#00a896] text-white text-xs font-extrabold px-6 py-2.5 rounded-xl shadow-md hover:bg-[#008f80] transition-all">Register as Expert →</a>
                        </div>
                    )}

                    {/* Empty Filter / Search match state */}
                    {!loading && !fetchError && experts.length > 0 && sorted.length === 0 && (
                        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-sm font-sans my-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-500">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-sans font-extrabold text-slate-900 text-lg">No Experts Match Your Search</h3>
                                <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">
                                    No verified consultants match your active search query "{searchText}" or selected filter options.
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setSearchText("");
                                    setCategory("All");
                                    setCity("All Cities");
                                    setRating("Any");
                                    setAvail("Anytime");
                                    setSelectedCountry("All");
                                    fetchExperts("", "All");
                                }}
                                className="inline-block mt-2 bg-[#00a896] hover:bg-[#008f80] active:scale-95 text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer font-sans"
                            >
                                🔄 Reset Filters & Show All {experts.length} Experts
                            </button>
                        </div>
                    )}

                    {viewMode === "list" && !loading ? (
                        <div className="space-y-4">
                            {sorted.map(e => (
                                <div key={e.id} onClick={() => handleExpertCardClick(e)} className="block group cursor-pointer">
                                    <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col md:flex-row gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        {/* Avatar */}
                                        <div className="relative w-20 h-20 shrink-0 mx-auto md:mx-0">
                                            {e.image ? (
                                                <img
                                                    src={e.image}
                                                    alt={e.name}
                                                    className="w-full h-full object-cover rounded-2xl border border-slate-200 shadow-2xs"
                                                    onError={(ev) => { (ev.target as HTMLImageElement).style.display = 'none'; (ev.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                                                />
                                            ) : null}
                                            <div className={`w-full h-full rounded-2xl bg-gradient-to-br from-[#00a896] to-slate-800 text-white font-black text-xl flex items-center justify-center border border-slate-700 shadow-sm tracking-tight select-none ${e.image ? 'hidden' : ''}`}>
                                                {(e.name || 'VF').split(' ').slice(0, 2).map((w: string) => w.charAt(0).toUpperCase()).join('')}
                                            </div>
                                            {e.isVerified && (
                                                <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full border-2 border-white shadow-xs">
                                                    ✓ Verified
                                                </span>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 font-sans">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2 text-center sm:text-left font-sans">
                                                <div>
                                                    <h3 className="text-lg font-extrabold font-sans text-slate-900 group-hover:text-[#00a896] transition-colors flex items-center justify-center sm:justify-start gap-2 leading-tight">
                                                        {e.name} <CheckCircle className="w-4.5 h-4.5 text-sky-500 fill-sky-50 shrink-0" />
                                                    </h3>
                                                    <p className="text-xs font-semibold text-slate-600 mt-0.5 font-sans">{e.role}</p>
                                                </div>
                                                <div className="text-center sm:text-right shrink-0 font-sans">
                                                    <div className="flex items-center gap-1 justify-center sm:justify-end">
                                                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                                        <span className="font-bold text-sm text-slate-900">{e.rating?.toFixed(1)}</span>
                                                        {e.reviews > 0 && <span className="text-[10px] text-slate-400 font-semibold">({e.reviews} reviews)</span>}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bio */}
                                            {e.bio && (
                                                <p className="text-xs text-slate-600 font-normal mb-3 line-clamp-2 text-center sm:text-left font-sans leading-relaxed">{e.bio}</p>
                                            )}

                                            {/* Meta */}
                                            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-xs font-semibold text-slate-500 mb-3 font-sans">
                                                <span className="flex items-center gap-1 text-slate-600"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {e.city}</span>
                                                {e.isRemote && <span className="text-slate-600 font-medium">· Remote available</span>}
                                                {e.govReg && <span className="text-indigo-600 font-semibold">· Govt. Registered</span>}
                                                <span className="text-slate-900 hover:text-[#00a896] font-bold ml-auto text-xs flex items-center gap-1 transition-colors">View Profile →</span>
                                            </div>

                                            {/* Tags */}
                                            {e.tags && e.tags.length > 0 && (
                                                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mb-4 font-sans">
                                                    {e.tags.slice(0, 5).map((tag: string) => (
                                                        <span key={tag} className="bg-slate-100 text-slate-700 hover:bg-slate-200 text-[11px] font-bold px-3 py-1 rounded-xl transition-colors font-sans border border-slate-200/60">{tag}</span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Footer */}
                                            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 gap-3 font-sans" onClick={(e) => e.stopPropagation()}>
                                                <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200/70 px-3 py-1 rounded-xl flex items-center gap-1.5 font-sans">
                                                    🌍 {e.countries?.join(", ")}
                                                </span>
                                                <button 
                                                    type="button"
                                                    onClick={() => handleExpertCardClick(e)} 
                                                    className="w-full sm:w-auto text-center bg-[#00a896] hover:bg-[#008f80] active:scale-95 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md transition-all cursor-pointer font-sans"
                                                >
                                                    Book Consultation
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : !loading ? (
                        <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center space-y-4 shadow-xl">
                            <MapIcon className="w-12 h-12 text-slate-400 mx-auto animate-bounce" />
                            <h3 className="font-sans font-extrabold text-slate-900 text-lg">Map View</h3>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">Showing {sorted.length} verified experts on the interactive location map.</p>
                        </div>
                    ) : null}

                </section>
            </main>

            {/* Instagram Style Expert Profile Modal */}
            <ExpertProfileModal 
                expert={selectedProfileExpert} 
                isOpen={!!selectedProfileExpert} 
                onClose={() => setSelectedProfileExpert(null)} 
            />

            {/* Login Required Modal Popup */}
            {showLoginModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
                    <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 border border-slate-100 font-sans" onClick={(e) => e.stopPropagation()}>
                        <button 
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                            <Filter className="w-8 h-8 text-amber-600" />
                        </div>

                        <div className="space-y-1.5">
                            <h3 className="text-xl font-black text-slate-900">Login Required 🔐</h3>
                            <p className="text-xs text-slate-500 font-medium">Please log in or create a free account to check consultant details and book session requests.</p>
                        </div>

                        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 text-left text-xs space-y-1 text-amber-900 font-semibold">
                            <p className="flex items-center gap-1.5 text-amber-950 font-bold">
                                <span>🔒 Member Protection</span>
                            </p>
                            <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                                Without logging in, expert scheduling and direct session booking are restricted.
                            </p>
                        </div>

                        <div className="pt-2 space-y-2">
                            <a
                                href="/login"
                                className="block w-full bg-[#00a896] hover:bg-[#008f80] text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-md transition-all text-center"
                            >
                                Log In Now
                            </a>
                            <a
                                href="/signup"
                                className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-2xl transition-all text-center"
                            >
                                Create Free Account
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


