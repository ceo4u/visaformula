import { useState, useEffect } from "react";
import { 
    Star, MapPin, Calendar, Users, CheckCircle, Sparkles, Trophy, 
    Ship, Music, Umbrella, Search, ArrowRight 
} from "lucide-react";

// Flag helper
const getFlagByCode = (code: string) => {
    const flags: Record<string, string> = {
        ID: "🇮🇩",
        AE: "🇦🇪",
        EU: "🇪🇺",
        TH: "🇹🇭",
        SG: "🇸🇬",
        MV: "🇲🇻",
        MY: "🇲🇾",
        VN: "🇻🇳",
        CH: "🇨🇭",
        GR: "🇬🇷",
        US: "🇺🇸",
        ZA: "🇿🇦",
        FR: "🇫🇷",
        ES: "🇪🇸",
        IT: "🇮🇹",
        TR: "🇹🇷",
        HU: "🇭🇺",
        CZ: "🇨🇿",
        NO: "🇳🇴",
        GB: "🇬🇧"
    };
    return flags[code ? code.toUpperCase() : ""] || "🌎";
};

// Toast helper
function Toast({ message, visible, onClose }: { message: string, visible: boolean, onClose: () => void }) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(onClose, 2600);
            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c1a2e] text-white px-6 py-3 rounded-full text-xs font-bold z-50 transition-all duration-300 shadow-2xl flex items-center gap-2 border border-red-900/50 ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}>
            <Sparkles className="w-4 h-4 text-[#ef4444] animate-pulse" />
            {message}
        </div>
    );
}

// 1. Holiday Packages
const holidayTours = [
    {
        id: "h1", name: "Bali Paradise Getaway", destination: "Bali, Indonesia",
        countryCode: "ID", days: 5, nights: 4, price: 24999, originalPrice: 34000,
        rating: 4.8, reviews: 2156, group: "2–6 people",
        badge: "BESTSELLER", badgeColor: "#f97316",
        tagline: "Temples · Rice Terraces · Seminyak Beach",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&h=600&fit=crop&q=85",
        includes: ["Visa Assistance", "4★ Resort", "Kecak Dance Show", "Ubud & Uluwatu Tour", "Airport Transfer"],
        tags: ["Beach", "Adventure"],
        description: "Rice terraces of Tegallalang, sea-temple of Uluwatu, and pristine Seminyak beach — all in 5 magical days. Visa-on-arrival handled."
    },
    {
        id: "h2", name: "Dubai City & Desert Safari", destination: "Dubai, UAE",
        countryCode: "AE", days: 6, nights: 5, price: 54999, originalPrice: 72000,
        rating: 4.9, reviews: 3847, group: "2–8 people",
        badge: "TRENDING", badgeColor: "#ef4444",
        tagline: "Burj Khalifa · Desert Dunes · Gold Souk",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&h=600&fit=crop&q=85",
        includes: ["UAE Visa Included", "5★ Hotel", "Burj Khalifa 124th Floor", "Desert BBQ Safari", "Dhow Cruise Dinner"],
        tags: ["Luxury", "Shopping"],
        description: "Sunrise over sand dunes, 124th-floor views of Burj Khalifa, gold souk shopping, and a dhow cruise dinner on the Dubai Creek."
    },
    {
        id: "h3", name: "Europe 5-Country Grand Tour", destination: "Paris · Rome · Zurich · Munich · Amsterdam",
        countryCode: "EU", days: 14, nights: 13, price: 109999, originalPrice: 149000,
        rating: 4.7, reviews: 1289, group: "4–12 people",
        badge: "MOST LOVED", badgeColor: "#7c3aed",
        tagline: "Eiffel Tower · Vatican · Swiss Alps · Canals",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&h=600&fit=crop&q=85",
        includes: ["Schengen Visa", "3★ Hotels", "Eurail Train Pass", "Guided City Tours", "Airport Transfers"],
        tags: ["Multi-Country", "Culture"],
        description: "Eiffel Tower at dusk, Vatican City at sunrise, Swiss Alps by train, Oktoberfest in Munich, and tulip canals of Amsterdam — 14 unforgettable days."
    },
    {
        id: "h4", name: "Thailand Beach & Culture", destination: "Bangkok · Pattaya · Phuket",
        countryCode: "TH", days: 7, nights: 6, price: 21999, originalPrice: 29000,
        rating: 4.6, reviews: 4198, group: "2–6 people",
        badge: "BUDGET PICK", badgeColor: "#10b981",
        tagline: "Phi Phi Islands · Night Bazaar · Phuket Sunset",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=900&h=600&fit=crop&q=85",
        includes: ["Visa on Arrival", "4★ Hotel", "Phi Phi Islands Tour", "Thai Cooking Class", "City Sightseeing"],
        tags: ["Beach", "Budget"],
        description: "Emerald seas at Phi Phi, street food in Bangkok's Chatuchak, Pattaya nightlife, and Phuket sunsets — the ultimate Thai adventure."
    },
    {
        id: "h5", name: "Singapore Family Escape", destination: "Singapore",
        countryCode: "SG", days: 5, nights: 4, price: 44999, originalPrice: 58000,
        rating: 4.9, reviews: 5312, group: "2–6 people",
        badge: "FAMILY FAV", badgeColor: "#ec4899",
        tagline: "Universal Studios · Sentosa · Gardens by the Bay",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&h=600&fit=crop&q=85",
        includes: ["e-Visa Included", "4★ Hotel", "Universal Studios™", "Gardens by the Bay", "Cable Car Sentosa"],
        tags: ["Family", "City"],
        description: "Kids go wild at Universal Studios™, marvel at Supertree Grove light shows, ride the cable car to Sentosa Island, and feast at Hawker Centre."
    },
    {
        id: "h6", name: "Maldives Honeymoon Escape", destination: "Maldives",
        countryCode: "MV", days: 5, nights: 4, price: 84999, originalPrice: 115000,
        rating: 5.0, reviews: 1067, group: "Couples only",
        badge: "HONEYMOON", badgeColor: "#f43f5e",
        tagline: "Overwater Villa · Crystal Lagoon · Private Sandbank",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&h=600&fit=crop&q=85",
        includes: ["Free Visa on Arrival", "Overwater Villa", "Snorkeling & Diving", "Candlelight Dinner", "Couple's Spa"],
        tags: ["Luxury", "Romantic"],
        description: "Wake up to turquoise lagoons from your glass-floor overwater bungalow. Snorkel with manta rays, enjoy couple's spa, and dine under the stars."
    },
    {
        id: "h7", name: "Malaysia & Kuala Lumpur", destination: "Kuala Lumpur · Langkawi · Penang",
        countryCode: "MY", days: 6, nights: 5, price: 28999, originalPrice: 38000,
        rating: 4.7, reviews: 2891, group: "2–8 people",
        badge: "NEW", badgeColor: "#14b8a6",
        tagline: "Petronas Towers · Langkawi Beach · Penang Street Food",
        image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=900&h=600&fit=crop&q=85",
        includes: ["Visa Free for Indians", "4★ Hotel", "Petronas Towers", "Langkawi Cable Car", "Penang Heritage Walk"],
        tags: ["City", "Budget"],
        description: "Twin towers at night, pristine beaches of Langkawi, UNESCO heritage streets of Georgetown Penang, and world-class street food — no visa needed!"
    },
    {
        id: "h8", name: "Vietnam Heritage Trail", destination: "Hanoi · Ha Long Bay · Hoi An · Ho Chi Minh",
        countryCode: "VN", days: 9, nights: 8, price: 39999, originalPrice: 52000,
        rating: 4.8, reviews: 1644, group: "2–6 people",
        badge: "SCENIC", badgeColor: "#f59e0b",
        tagline: "Ha Long Bay Cruise · Lantern-lit Hoi An · Cu Chi Tunnels",
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&h=600&fit=crop&q=85",
        includes: ["e-Visa Included", "Boutique Hotels", "Ha Long Bay Cruise", "Cooking Class Hoi An", "Cu Chi Tunnel Tour"],
        tags: ["Culture", "Adventure"],
        description: "Cruise limestone karsts on Ha Long Bay, cycle lantern-lit Hoi An ancient town, taste pho in Hanoi's Old Quarter, and explore Cu Chi tunnels."
    },
    {
        id: "h9", name: "Switzerland & Paris Combo", destination: "Zurich · Interlaken · Paris · Geneva",
        countryCode: "CH", days: 8, nights: 7, price: 89999, originalPrice: 118000,
        rating: 4.9, reviews: 987, group: "2–6 people",
        badge: "PREMIUM", badgeColor: "#4f46e5",
        tagline: "Jungfraujoch · Swiss Alps · Eiffel Tower · TGV Train",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop&q=85",
        includes: ["Schengen Visa", "4★ Hotels", "Jungfraujoch Pass", "Eiffel Tower Skip Line", "TGV Train Ticket"],
        tags: ["Luxury", "Multi-Country"],
        description: "Paraglide over Interlaken's emerald lakes, ride the cogwheel train to Jungfraujoch, then TGV to Paris for Eiffel Tower magic."
    },
];

// 2. Sport Tours
const sportTours = [
    { id: "s5", name: "Greece Cricket Tours", sport: "cricket", country: "greece", month: "Upcoming Autumn Batch", price: 125000, originalPrice: 160000, rating: 4.9, reviews: 45, days: 7, nights: 6, image: "/cricket_stadium.png", includes: ["Match tickets", "Schengen Visa", "Athens & Corfu", "Itinerary"], tags: ["Sports Tourism", "Athens & Corfu", "Managed by Rising At Sports"], description: "Managed exclusively by Rising At Sports. Athens & Corfu | Upcoming Autumn Batch. Vibe: Sports tourism, professional, exciting.", partnerLogo: "/images/rising_sports_logo.jpg" },
    { id: "s1", name: "FIFA World Cup 2026 — USA Package", sport: "football", country: "usa", month: "June 2025", price: 185000, originalPrice: 220000, rating: 4.9, reviews: 142, days: 11, nights: 10, image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop", includes: ["Match tickets", "Hotel", "Visa included", "Transfers"], tags: ["Match tickets", "Hotel", "Visa included"], description: "Watch FIFA World Cup live! Includes match tickets, luxurious hotel stay, and complete USA tourist visa processing." },
    { id: "s2", name: "F1 Abu Dhabi Grand Prix Package", sport: "f1", country: "uae", month: "Dec 2025", price: 95000, originalPrice: 120000, rating: 4.8, reviews: 87, days: 5, nights: 4, image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=500&fit=crop", includes: ["Race tickets", "Paddock access", "5-star hotel"], tags: ["Race tickets", "Paddock access", "5-star hotel"], description: "Experience the thrilling F1 season finale in Abu Dhabi. Complete VIP paddock access and luxury stay with UAE visa." },
    { id: "s3", name: "ICC Champions Trophy — South Africa", sport: "cricket", country: "australia", month: "July 2025", price: 72000, originalPrice: 90000, rating: 4.9, reviews: 204, days: 8, nights: 7, image: "/luxury_stadium.png", includes: ["3 match tickets", "Visa", "Transfers"], tags: ["3 match tickets", "Visa", "Transfers"], description: "Cheer for India live in South Africa. Includes prime tickets for high-profile matches, sightseeing, and tourist visa." },
    { id: "s4", name: "Paris 2026 Olympics Package", sport: "olympics", country: "uk", month: "July 2025", price: 210000, originalPrice: 250000, rating: 4.9, reviews: 56, days: 9, nights: 8, image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=500&fit=crop", includes: ["Event tickets", "Visa included", "Luxury hotel"], tags: ["Event tickets", "Visa included", "Luxury hotel"], description: "Spectate the greatest sports event on earth in Paris. Includes opening ceremony access and fast-track Schengen visa." }
];

// 3. Cruises
const cruiseTours = [
    { id: "c1", name: "Mediterranean Splendour — 10 Nights", type: "ocean", depart: "Singapore", duration: "10–14 Nights", price: 145000, originalPrice: 185000, rating: 4.9, reviews: 114, route: "Barcelona → Rome → Athens → Istanbul", countries: "🇪🇸🇮🇹🇬🇷🇹🇷 4 countries · Schengen + Turkey visa", image: "/images/cruise_med.png", description: "Breathtaking ocean voyage covering Spain, Italy, Greece, and Turkey. All port visas and Schengen handled smoothly." },
    { id: "c2", name: "Arabian Sea Explorer — 7 Nights", type: "ocean", depart: "Mumbai, India", duration: "6–9 Nights", price: 58000, originalPrice: 75000, rating: 4.7, reviews: 92, route: "Mumbai → Goa → Dubai → Abu Dhabi", countries: "🇮🇳🇦🇪 Mumbai to Dubai · UAE visa included", image: "/images/cruise_arabian.png", description: "Set sail from Mumbai to the modern skylines of UAE. Multi-port visa verification and entry permits fully sorted." },
    { id: "c3", name: "Danube River Voyage — 8 Nights", type: "river", depart: "Singapore", duration: "6–9 Nights", price: 120000, originalPrice: 150000, rating: 4.8, reviews: 108, route: "Vienna → Budapest → Prague", countries: "🇦🇹🇭🇺🇨🇿 3 countries · Single Schengen visa", image: "/images/cruise_danube.png", description: "Enchanting river cruise along Europe's historic waterways. Covers Austria, Hungary, and Czech Republic." },
    { id: "c4", name: "Norwegian Fjords Luxury — 7 Nights", type: "luxury", depart: "Mumbai, India", duration: "6–9 Nights", price: 225000, originalPrice: 280000, rating: 5.0, reviews: 43, route: "Bergen → Flåm → Geiranger", countries: "🇳🇴 Norway · Schengen · All-inclusive", image: "/images/cruise_norway.png", description: "Immerse in Norway's jaw-dropping cliffs and deep fjords. Complete five-star cruise suite with Schengen visa." }
];

// 4. Entertainment Events
const eventTours = [
    { id: "e1", name: "Coldplay — Music of the Spheres World Tour", type: "concert", country: "uk", month: "Jun 2025", price: 68000, originalPrice: 85000, rating: 4.9, reviews: 215, date: "14", monthName: "Jun", venue: "Wembley Stadium, London", meta: "UK Tourist Visa included", tags: ["UK Visa", "Hotel 3 nights", "Concert tickets"], badge: "Limited", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop", description: "Sing along to Coldplay live in London! Package includes guaranteed concert tickets, premium hotel stay, and UK visa." },
    { id: "e2", name: "Coachella Valley Music & Arts Festival 2026", type: "festival", country: "usa", month: "Apr 2026", price: 135000, originalPrice: 170000, rating: 4.8, reviews: 98, date: "18", monthName: "Apr", venue: "Palm Springs, California", meta: "USA B-2 Visa Assistance", tags: ["USA Visa", "Festival tickets", "Hotel 5 nights"], badge: "Popular", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=500&fit=crop", description: "Join the world's most glamorous music festival in California. Complete USA visa application filing included." },
    { id: "e3", name: "West End Theatre — London Exclusive", type: "theatre", country: "uk", month: "Jul 2025", price: 82000, originalPrice: 105000, rating: 4.8, reviews: 76, date: "22", monthName: "Jul", venue: "West End, London", meta: "UK Tourist Visa · 3 shows included", tags: ["UK Visa", "3 show tickets", "Hotel 4 nights"], badge: "Available", image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=500&fit=crop", description: "Enjoy the pinnacle of live theater in London. Includes tickets to 3 top-rated West End musicals and UK tourist visa." }
];

export function ToursPortal() {
    // Current Active Tab: 'holiday' | 'sports' | 'cruises' | 'events'
    const [activeTab, setActiveTab] = useState<"holiday" | "sports" | "cruises" | "events">("holiday");
    const [toastMsg, setToastMsg] = useState("");
    const [isToastVisible, setIsToastVisible] = useState(false);

    // Search Fields: Holiday
    const [holidayDest, setHolidayDest] = useState("All");
    const [holidayTag, setHolidayTag] = useState("All");

    // Search Fields: Sports
    const [sportType, setSportType] = useState("All Sports");
    const [sportCountry, setSportCountry] = useState("Anywhere");
    const [sportMonth, setSportMonth] = useState("Any Month");
    const [activeSportFilter, setActiveSportFilter] = useState("all");

    // Search Fields: Cruises
    const [cruiseType, setCruiseType] = useState("All Types");
    const [cruiseDepart, setCruiseDepart] = useState("Any Port");
    const [cruiseDur, setCruiseDur] = useState("Any Duration");
    const [activeCruiseFilter, setActiveCruiseFilter] = useState("all");

    // Search Fields: Events
    const [eventType, setEventType] = useState("All Events");
    const [eventCountry, setEventCountry] = useState("Anywhere");
    const [eventMonth, setEventMonth] = useState("Any Month");
    const [eventBudget, setEventBudget] = useState("Any Budget");
    const [activeEventFilter, setActiveEventFilter] = useState("all");

    // Sorting
    const [sortBy, setSortBy] = useState("popular");

    useEffect(() => {
        // Read URL query parameters to set active tab if present
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const category = params.get("category");
            if (category === "holiday" || category === "sports" || category === "cruises" || category === "events") {
                setActiveTab(category);
            }
        }
    }, []);

    const triggerToast = (msg: string) => {
        setToastMsg(msg);
        setIsToastVisible(true);
    };

    const handleBooking = (tourName: string) => {
        window.location.reload();
    };

    // Filter Logic
    const getFilteredTours = () => {
        if (activeTab === "holiday") {
            return holidayTours.filter(t => {
                if (holidayDest !== "All" && !t.destination.toLowerCase().includes(holidayDest.toLowerCase())) return false;
                if (holidayTag !== "All" && !t.tags.includes(holidayTag)) return false;
                return true;
            });
        }
        if (activeTab === "sports") {
            return sportTours.filter(t => {
                if (sportType !== "All Sports" && !t.name.toLowerCase().includes(sportType.replace(/[^a-zA-Z0-9 ]/g, '').trim().toLowerCase())) {
                    // Match sport category
                    const categoryMap: any = { "⚽ Football / FIFA": "football", "🏎️ Formula 1": "f1", "🏏 Cricket": "cricket", "🏊 Olympics": "olympics" };
                    if (t.sport !== categoryMap[sportType]) return false;
                }
                if (sportCountry !== "Anywhere" && t.country !== sportCountry.split(" ")[1].toLowerCase()) return false;
                if (sportMonth !== "Any Month" && t.month !== sportMonth) return false;
                if (activeSportFilter !== "all" && t.sport !== activeSportFilter) return false;
                return true;
            });
        }
        if (activeTab === "cruises") {
            return cruiseTours.filter(t => {
                const typeMap: any = { "🌊 Ocean Cruise": "ocean", "🏞️ River Cruise": "river", "💎 Luxury Liner": "luxury" };
                if (cruiseType !== "All Types" && t.type !== typeMap[cruiseType]) return false;
                if (cruiseDepart !== "Any Port" && t.depart !== cruiseDepart) return false;
                if (cruiseDur !== "Any Duration" && t.duration !== cruiseDur) return false;
                if (activeCruiseFilter !== "all" && t.type !== activeCruiseFilter) return false;
                return true;
            });
        }
        // events
        return eventTours.filter(t => {
            const typeMap: any = { "🎵 Concerts": "concert", "🎪 Festivals": "festival", "🎭 Theatre": "theatre" };
            if (eventType !== "All Events" && t.type !== typeMap[eventType]) return false;
            if (eventCountry !== "Anywhere" && t.country !== eventCountry.split(" ")[1].toLowerCase()) return false;
            if (eventMonth !== "Any Month" && t.month !== eventMonth) return false;
            if (eventBudget !== "Any Budget") {
                if (eventBudget === "Under ₹30K" && t.price >= 30000) return false;
                if (eventBudget === "₹30K–₹75K" && (t.price < 30000 || t.price > 75000)) return false;
                if (eventBudget === "₹75K–₹1.5L" && (t.price < 75000 || t.price > 150000)) return false;
            }
            if (activeEventFilter !== "all" && t.type !== activeEventFilter) return false;
            return true;
        });
    };

    const sortedTours: any[] = [...getFilteredTours()].sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviews - a.reviews;
    });

    return (
        <div className="bg-white min-h-screen">
            <Toast message={toastMsg} visible={isToastVisible} onClose={() => setIsToastVisible(false)} />

            {/* Dynamic Hero Section */}
            {activeTab === "holiday" && (
                <div className="max-w-7xl mx-auto px-4 pt-8 pb-10">
                    {/* Petronas Twilight Banner Container */}
                    <div 
                        className="relative w-full rounded-[40px] overflow-hidden flex flex-col items-center justify-center text-center px-6 py-20 min-h-[540px] md:min-h-[600px] shadow-2xl border border-white/10"
                        style={{ background: '#0C1A2E' }}
                    >
                        {/* Background Image with Crisp Contrast & Clean Shading */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="/images/tours_hero_evening.png" 
                                alt="Luxury Evening Nature Houseboat" 
                                className="w-full h-full object-cover brightness-[0.8] contrast-[1.05]"
                            />
                            {/* Transparent overlay for text legibility without extra shading or color blocking */}
                            <div 
                                className="absolute inset-0 bg-black/35"
                            />
                        </div>

                        {/* Banner Content */}
                        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                            
                            {/* Main Serif Header */}
                            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-wide mb-2 drop-shadow-md">
                                Dream Holidays. Visas Sorted.
                            </h1>

                            {/* Bright Green Accent Highlight */}
                            <p className="text-[#00FF66] font-serif text-2xl md:text-3xl font-bold mb-8 tracking-wide drop-shadow-md">
                                in exactly 10 minutes
                            </p>

                            {/* 3-Column Metadata Row */}
                            <div className="grid grid-cols-3 gap-8 md:gap-16 text-center mb-10 w-full max-w-lg">
                                <div>
                                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">VALID</span>
                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">120+ COUNTRIES</span>
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">PURPOSE</span>
                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">TOURISM</span>
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">STAYS</span>
                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">4-5★ HOTELS</span>
                                </div>
                            </div>

                            {/* Pill CTA Button */}
                            <button 
                                onClick={() => {
                                    const el = document.getElementById("search-filter-bar");
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-xl tracking-wider active:scale-[0.98] select-none"
                            >
                                Start New Application
                            </button>
                        </div>
                    </div>

                    {/* Neat Search/Filter Sticky Bar Below Banner */}
                    <div id="search-filter-bar" className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-md p-4 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 tracking-widest mb-1 block uppercase">Destination</label>
                                <select value={holidayDest} onChange={e => setHolidayDest(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option value="All">All Destinations</option>
                                    <option value="Bali">Bali, Indonesia</option>
                                    <option value="Dubai">Dubai, UAE</option>
                                    <option value="Europe">Europe Tour</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Maldives">Maldives</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 tracking-widest mb-1 block uppercase">Vacation Type</label>
                                <select value={holidayTag} onChange={e => setHolidayTag(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option value="All">All Types</option>
                                    <option value="Beach">Beach Getaway</option>
                                    <option value="Luxury">Luxury Stay</option>
                                    <option value="Budget">Budget Friendly</option>
                                    <option value="Family">Family Holiday</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => triggerToast("✈️ Searching holiday packages...")} className="w-full md:w-auto bg-black hover:bg-slate-900 text-white font-bold px-8 py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all self-end shrink-0">
                            <Search className="w-4 h-4" /> Search Holidays
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "sports" && (
                <div className="max-w-7xl mx-auto px-4 pt-8 pb-10">
                    {/* Sport Tours Twilight Banner Container */}
                    <div 
                        className="relative w-full rounded-[40px] overflow-hidden flex flex-col items-center justify-center text-center px-6 py-20 min-h-[540px] md:min-h-[600px] shadow-2xl border border-white/10"
                        style={{ background: '#0C1A2E' }}
                    >
                        {/* Background Image with Crisp Contrast & Clean Shading */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="/luxury_stadium.png" 
                                alt="Luxury Stadium" 
                                className="w-full h-full object-cover brightness-[0.8] contrast-[1.05]"
                            />
                            {/* Transparent overlay for text legibility without extra shading or color blocking */}
                            <div 
                                className="absolute inset-0 bg-black/35"
                            />
                        </div>

                        {/* Banner Content */}
                        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                            
                            {/* Main Serif Header */}
                            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-wide mb-2 drop-shadow-md">
                                Live the Game. Visas Sorted.
                            </h1>

                            {/* Bright Green Accent Highlight */}
                            <p className="text-[#00FF66] font-serif text-2xl md:text-3xl font-bold mb-8 tracking-wide drop-shadow-md">
                                in exactly 10 minutes
                            </p>

                            {/* 3-Column Metadata Row */}
                            <div className="grid grid-cols-3 gap-8 md:gap-16 text-center mb-10 w-full max-w-lg">
                                <div>
                                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">VALID</span>
                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">WORLDWIDE EVENTS</span>
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">PURPOSE</span>
                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">SPORTS</span>
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">TICKETS</span>
                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">100% GUARANTEED</span>
                                </div>
                            </div>

                            {/* Pill CTA Button */}
                            <button 
                                onClick={() => {
                                    const el = document.getElementById("sports-filter-bar");
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-xl tracking-wider active:scale-[0.98] select-none"
                            >
                                Start New Application
                            </button>
                        </div>
                    </div>

                    {/* Neat Search/Filter Sticky Bar Below Banner */}
                    <div id="sports-filter-bar" className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-md p-4 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 tracking-widest mb-1 block uppercase">Sport Type</label>
                                <select value={sportType} onChange={e => setSportType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>All Sports</option>
                                    <option>⚽ Football / FIFA</option>
                                    <option>🏎️ Formula 1</option>
                                    <option>🏏 Cricket</option>
                                    <option>🏊 Olympics</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 tracking-widest mb-1 block uppercase">Country</label>
                                <select value={sportCountry} onChange={e => setSportCountry(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Anywhere</option>
                                    <option>🇬🇧 UK</option>
                                    <option>🇦🇪 UAE</option>
                                    <option>🇺🇸 USA</option>
                                    <option>🇦🇺 Australia</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 tracking-widest mb-1 block uppercase">Month</label>
                                <select value={sportMonth} onChange={e => setSportMonth(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Any Month</option>
                                    <option>June 2025</option>
                                    <option>July 2025</option>
                                    <option>Dec 2025</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => triggerToast("⚽ Searching sport tours...")} className="w-full md:w-auto bg-black hover:bg-slate-900 text-white font-bold px-8 py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all self-end shrink-0">
                            <Search className="w-4 h-4" /> Search Sport Tours
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "cruises" && (
                <div className="max-w-7xl mx-auto px-4 pt-8 pb-10">
                    {/* Cruise Twilight Banner Container */}
                    <div 
                        className="relative w-full rounded-[40px] overflow-hidden flex flex-col items-center justify-center text-center px-6 py-20 min-h-[540px] md:min-h-[600px] shadow-2xl border border-white/10"
                        style={{ background: '#0C1A2E' }}
                    >
                        {/* Background Image with Crisp Contrast & Clean Shading */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&auto=format&fit=crop&q=95" 
                                alt="Luxury Cruise Liner" 
                                className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
                            />
                            {/* A soft transparent overlay for text readability without extra shading */}
                            <div 
                                className="absolute inset-0 bg-black/35"
                            />
                        </div>

                        {/* Banner Content */}
                        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                            
                            {/* Main Serif Header */}
                            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-wide mb-2 drop-shadow-md">
                                Sail the World. Ports & Visas Sorted.
                            </h1>

                            {/* Bright Green Accent Highlight */}
                            <p className="text-[#00FF66] font-serif text-2xl md:text-3xl font-bold mb-8 tracking-wide drop-shadow-md">
                                in exactly 10 minutes
                            </p>

                            {/* 3-Column Metadata Row */}
                            <div className="grid grid-cols-3 gap-8 md:gap-16 text-center mb-10 w-full max-w-lg">
                                <div>
                                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">VALID</span>
                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">ALL OCEANS</span>
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">PURPOSE</span>
                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">CRUISES</span>
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">VISAS</span>
                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">100% HANDLED</span>
                                </div>
                            </div>

                            {/* Pill CTA Button */}
                            <button 
                                onClick={() => {
                                    const el = document.getElementById("cruise-filter-bar");
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-xl tracking-wider active:scale-[0.98] select-none"
                            >
                                Start New Application
                            </button>
                        </div>
                    </div>

                    {/* Neat Search/Filter Sticky Bar Below Banner */}
                    <div id="cruise-filter-bar" className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-md p-4 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 tracking-widest mb-1 block uppercase">Cruise Type</label>
                                <select value={cruiseType} onChange={e => setCruiseType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>All Types</option>
                                    <option>🌊 Ocean Cruise</option>
                                    <option>🏞️ River Cruise</option>
                                    <option>💎 Luxury Liner</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 tracking-widest mb-1 block uppercase">Departure Port</label>
                                <select value={cruiseDepart} onChange={e => setCruiseDepart(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Any Port</option>
                                    <option>Mumbai, India</option>
                                    <option>Dubai, UAE</option>
                                    <option>Singapore</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 tracking-widest mb-1 block uppercase">Duration</label>
                                <select value={cruiseDur} onChange={e => setCruiseDur(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Any Duration</option>
                                    <option>3–5 Nights</option>
                                    <option>6–9 Nights</option>
                                    <option>10–14 Nights</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => triggerToast("🚢 Searching cruises...")} className="w-full md:w-auto bg-black hover:bg-slate-900 text-white font-bold px-8 py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all self-end shrink-0">
                            <Search className="w-4 h-4" /> Search Cruises
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "events" && (
                <div className="max-w-7xl mx-auto px-4 pt-8 pb-10">
                    {/* Events Twilight Banner Container */}
                    <div 
                        className="relative w-full rounded-[40px] overflow-hidden flex flex-col items-center justify-center text-center px-6 py-20 min-h-[540px] md:min-h-[600px] shadow-2xl border border-white/10"
                        style={{ background: '#0C1A2E' }}
                    >
                        {/* Background Image with Crisp Contrast & Clean Shading */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=95" 
                                alt="Music Concert" 
                                className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
                            />
                            {/* A soft transparent overlay for text readability without extra shading */}
                            <div 
                                className="absolute inset-0 bg-black/35"
                            />
                        </div>

                        {/* Banner Content */}
                        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                            
                            {/* Main Serif Header */}
                            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-wide mb-2 drop-shadow-md">
                                See the Show. Visas Sorted.
                            </h1>

                            {/* Bright Green Accent Highlight */}
                            <p className="text-[#00FF66] font-serif text-2xl md:text-3xl font-bold mb-8 tracking-wide drop-shadow-md">
                                in exactly 10 minutes
                            </p>

                            {/* 3-Column Metadata Row */}
                            <div className="grid grid-cols-3 gap-8 md:gap-16 text-center mb-10 w-full max-w-lg">
                                <div>
                                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">VALID</span>
                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">WORLDWIDE EVENTS</span>
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">PURPOSE</span>
                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">ENTERTAINMENT</span>
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider block mb-1">TICKETS</span>
                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase block">GUARANTEED</span>
                                </div>
                            </div>

                            {/* Pill CTA Button */}
                            <button 
                                onClick={() => {
                                    const el = document.getElementById("event-filter-bar");
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-xl tracking-wider active:scale-[0.98] select-none"
                            >
                                Start New Application
                            </button>
                        </div>
                    </div>

                    {/* Neat Search/Filter Sticky Bar Below Banner */}
                    <div id="event-filter-bar" className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-md p-4 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 tracking-widest mb-1 block uppercase">Event Type</label>
                                <select value={eventType} onChange={e => setEventType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>All Events</option>
                                    <option>🎵 Concerts</option>
                                    <option>🎪 Festivals</option>
                                    <option>🎭 Theatre</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 tracking-widest mb-1 block uppercase">Country</label>
                                <select value={eventCountry} onChange={e => setEventCountry(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Anywhere</option>
                                    <option>🇬🇧 UK</option>
                                    <option>🇺🇸 USA</option>
                                    <option>🇦🇪 UAE</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 tracking-widest mb-1 block uppercase">Month</label>
                                <select value={eventMonth} onChange={e => setEventMonth(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Any Month</option>
                                    <option>Jun 2025</option>
                                    <option>Jul 2025</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-gray-400 tracking-widest mb-1 block uppercase">Budget</label>
                                <select value={eventBudget} onChange={e => setEventBudget(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-navy outline-none">
                                    <option>Any Budget</option>
                                    <option>Under ₹30K</option>
                                    <option>₹30K–₹75K</option>
                                    <option>₹75K–₹1.5L</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={() => triggerToast("🎭 Searching events...")} className="w-full md:w-auto bg-black hover:bg-slate-900 text-white font-bold px-8 py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all self-end shrink-0">
                            <Search className="w-4 h-4" /> Search Events
                        </button>
                    </div>
                </div>
            )}

            {/* Category Navigation Bar */}
            <div className="bg-white border-b border-red-100 sticky top-32 z-30 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center overflow-x-auto h-14 scrollbar-none">
                    <div className="flex gap-2 shrink-0 py-2">
                        {/* Tab: Holiday */}
                        <button 
                            onClick={() => { setActiveTab("holiday"); setSortBy("popular"); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                                activeTab === "holiday" 
                                    ? "bg-red-50 text-[#ef4444] border border-red-100 shadow-sm" 
                                    : "text-gray-500 hover:text-navy hover:bg-gray-50"
                            }`}
                        >
                            <Umbrella className="w-4 h-4 shrink-0" />
                            Holiday Packages
                        </button>

                        {/* Tab: Sports */}
                        <button 
                            onClick={() => { setActiveTab("sports"); setSortBy("popular"); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                                activeTab === "sports" 
                                    ? "bg-black text-white border border-black shadow-sm" 
                                    : "text-gray-500 hover:text-navy hover:bg-gray-50"
                            }`}
                        >
                            <Trophy className="w-4 h-4 shrink-0" />
                            Sport Tours
                            <span className="bg-black text-white text-[9px] px-1.5 py-0.5 rounded-full font-extrabold animate-pulse">NEW</span>
                        </button>

                        {/* Tab: Cruises */}
                        <button 
                            onClick={() => { setActiveTab("cruises"); setSortBy("popular"); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                                activeTab === "cruises" 
                                    ? "bg-black text-white border border-black shadow-sm" 
                                    : "text-gray-500 hover:text-navy hover:bg-gray-50"
                            }`}
                        >
                            <Ship className="w-4 h-4 shrink-0" />
                            Cruises
                        </button>

                        {/* Tab: Events */}
                        <button 
                            onClick={() => { setActiveTab("events"); setSortBy("popular"); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                                activeTab === "events" 
                                    ? "bg-orange-50 text-orange-600 border border-orange-100 shadow-sm" 
                                    : "text-gray-500 hover:text-navy hover:bg-gray-50"
                            }`}
                        >
                            <Music className="w-4 h-4 shrink-0" />
                            Entertainment Events
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Category Chips & Category Title Rows */}
            <div className="max-w-6xl mx-auto px-4 mt-8">
                {activeTab === "holiday" && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button onClick={() => setHolidayDest("All")} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${holidayDest === "All" ? "bg-black text-white border-transparent shadow-md" : "bg-white text-gray-500 border-slate-200 hover:bg-slate-50"}`}>All Destinations</button>
                        {["Bali", "Dubai", "Europe", "Thailand", "Singapore", "Maldives", "Malaysia", "Vietnam", "Switzerland"].map(d => (
                            <button key={d} onClick={() => setHolidayDest(d)} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${holidayDest === d ? "bg-black text-white border-transparent shadow-md" : "bg-white text-gray-500 border-slate-200 hover:bg-slate-50"}`}>{d}</button>
                        ))}
                    </div>
                )}

                {activeTab === "sports" && (
                    <div className="mb-6">
                        <div className="text-xs font-semibold text-[#359FC2] tracking-normal mb-2">Browse by Sport</div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { key: "all", label: "All Sports", emoji: "🏆" },
                                { key: "football", label: "Football / FIFA", emoji: "⚽" },
                                { key: "f1", label: "Formula 1", emoji: "🏎️" },
                                { key: "cricket", label: "Cricket", emoji: "🏏" }
                            ].map(item => (
                                <div 
                                    key={item.key} 
                                    onClick={() => { setActiveSportFilter(item.key); triggerToast(`Showing ${item.label} packages`); }}
                                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all duration-300 ${
                                        activeSportFilter === item.key 
                                            ? "border-black bg-black/5 shadow-sm" 
                                            : "border-slate-200 bg-white hover:border-slate-400"
                                    }`}
                                >
                                    <div className="text-2xl mb-1">{item.emoji}</div>
                                    <div className="text-xs font-bold text-navy">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "cruises" && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {[
                            { key: "all", label: "All Cruises" },
                            { key: "ocean", label: "🌊 Ocean Cruises" },
                            { key: "river", label: "🏞️ River Voyages" },
                            { key: "luxury", label: "💎 Luxury Liners" }
                        ].map(item => (
                            <button 
                                key={item.key} 
                                onClick={() => setActiveCruiseFilter(item.key)}
                                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${
                                    activeCruiseFilter === item.key 
                                        ? "bg-black text-white border-transparent shadow-md" 
                                        : "bg-white text-gray-500 border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}

                {activeTab === "events" && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {[
                            { key: "all", label: "All Events" },
                            { key: "concert", label: "🎵 Concerts" },
                            { key: "festival", label: "🎪 Festivals" },
                            { key: "theatre", label: "🎭 Theatre" }
                        ].map(item => (
                            <button 
                                key={item.key} 
                                onClick={() => setActiveEventFilter(item.key)}
                                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${
                                    activeEventFilter === item.key 
                                        ? "bg-black text-white border-transparent shadow-md" 
                                        : "bg-white text-gray-500 border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Results Grid / List */}
            <div className="max-w-6xl mx-auto px-4 pb-24">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-xs font-medium text-slate-400 tracking-widest">
                        {sortedTours.length} package{sortedTours.length !== 1 ? "s" : ""} available
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest">Sort By</span>
                        <select 
                            value={sortBy} 
                            onChange={e => setSortBy(e.target.value)} 
                            className="bg-white border border-slate-200 rounded-xl py-1.5 pl-3 pr-8 text-xs font-bold text-navy outline-none appearance-none cursor-pointer shadow-sm"
                        >
                            <option value="popular">Most Popular</option>
                            <option value="rating">Highest Rated</option>
                            <option value="price-low">Price: Low → High</option>
                            <option value="price-high">Price: High → Low</option>
                        </select>
                    </div>
                </div>

                {/* 1. Holiday Packages — Dark Cinematic Card */}
                {activeTab === "holiday" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedTours.map(tour => (
                            <div
                                key={tour.id}
                                className="group relative h-[440px] w-full rounded-[32px] overflow-hidden text-left hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent"
                                style={{ background: '#0C1A2E' }}
                                onClick={() => handleBooking(tour.name)}
                            >
                                {/* Background Image Container */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={tour.image}
                                        alt={tour.name}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    {/* Dark gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                                </div>

                                {/* Top-right badge */}
                                {tour.badge && (
                                    <div
                                        className="absolute top-4 right-4 text-white text-[9px] font-black px-2.5 py-1 rounded-full tracking-widest shadow-md uppercase"
                                        style={{ background: tour.badgeColor || '#ef4444' }}
                                    >
                                        {tour.badge}
                                    </div>
                                )}

                                {/* Content Container */}
                                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                                    
                                    {/* Flag Badge Container - Circular center-aligned above text */}
                                    <div className="flex justify-center mb-4">
                                        <div className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center overflow-hidden shadow-xl transform transition-transform duration-300 group-hover:scale-110">
                                            <img 
                                                src={`https://flagcdn.com/w320/${(tour.countryCode || "us").toLowerCase()}.png`} 
                                                alt="" 
                                                className="w-full h-full object-cover scale-[1.3] transform" 
                                            />
                                        </div>
                                    </div>

                                    {/* Tour Title - Serif, uppercase, letter-spaced */}
                                    <h3 className="font-serif text-xl font-normal text-white text-center tracking-wider uppercase mb-5 leading-snug drop-shadow-md">
                                        {tour.name}
                                    </h3>

                                    {/* Divider Line */}
                                    <div className="w-full h-[0.5px] bg-white/20 mb-5" />

                                    {/* Info Table Grid */}
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">DURATION</span>
                                            <span className="text-[11px] text-white font-extrabold tracking-wide uppercase">{tour.days}D/{tour.nights}N</span>
                                        </div>
                                        <div>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">RATING</span>
                                            <span className="text-[11px] text-white font-extrabold tracking-wide uppercase flex items-center justify-center gap-0.5">{tour.rating} ★</span>
                                        </div>
                                        <div>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">PRICE</span>
                                            <span className="text-[11px] text-white font-extrabold tracking-wide uppercase">₹{tour.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 2. Sport Tours Layout — Dark Cinematic Card */}
                {activeTab === "sports" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedTours.map(tour => {
                            const countryMap: Record<string, string> = { greece: "gr", usa: "us", uae: "ae", australia: "au", uk: "gb" };
                            const code = countryMap[tour.country?.toLowerCase() || ""] || "us";
                            return (
                                <div
                                    key={tour.id}
                                    className="group relative h-[440px] w-full rounded-[32px] overflow-hidden text-left hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent"
                                    style={{ background: '#0C1A2E' }}
                                    onClick={() => handleBooking(tour.name)}
                                >
                                    {/* Background Image Container */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={tour.image}
                                            alt={tour.name}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {/* Dark gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                                    </div>

                                    {/* Top-right badge */}
                                    <div className="absolute top-4 right-4 text-white text-[9px] font-black px-2.5 py-1 rounded-full tracking-widest shadow-md uppercase bg-emerald-600">
                                        {tour.sport?.toUpperCase() || "SPORTS"}
                                    </div>

                                    {/* Content Container */}
                                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                                        
                                        {/* Flag Badge Container - Circular center-aligned above text */}
                                        <div className="flex justify-center mb-4">
                                            <div className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center overflow-hidden shadow-xl transform transition-transform duration-300 group-hover:scale-110">
                                                <img 
                                                    src={`https://flagcdn.com/w320/${code}.png`} 
                                                    alt="" 
                                                    className="w-full h-full object-cover scale-[1.3] transform" 
                                                />
                                            </div>
                                        </div>

                                        {/* Tour Title - Serif, uppercase, letter-spaced */}
                                        <h3 className="font-serif text-xl font-normal text-white text-center tracking-wider uppercase mb-5 leading-snug drop-shadow-md">
                                            {tour.name}
                                        </h3>

                                        {/* Divider Line */}
                                        <div className="w-full h-[0.5px] bg-white/20 mb-5" />

                                        {/* Info Table Grid */}
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <div>
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">EVENT</span>
                                                <span className="text-[11px] text-white font-extrabold tracking-wide uppercase">{tour.sport || "Sports"}</span>
                                            </div>
                                            <div>
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">RATING</span>
                                                <span className="text-[11px] text-white font-extrabold tracking-wide uppercase flex items-center justify-center gap-0.5">{tour.rating} ★</span>
                                            </div>
                                            <div>
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">PRICE</span>
                                                <span className="text-[11px] text-white font-extrabold tracking-wide uppercase">₹{tour.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 3. Cruises Layout — Dark Cinematic Card */}
                {activeTab === "cruises" && (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                            {sortedTours.map(tour => {
                                const countryMap: Record<string, string> = { c1: "es", c2: "ae", c3: "at", c4: "no" };
                                const code = countryMap[tour.id] || "us";
                                return (
                                    <div
                                        key={tour.id}
                                        className="group relative h-[440px] w-full rounded-[32px] overflow-hidden text-left hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent"
                                        style={{ background: '#0C1A2E' }}
                                        onClick={() => handleBooking(tour.name)}
                                    >
                                        {/* Background Image Container */}
                                        <div className="absolute inset-0 z-0">
                                            <img
                                                src={tour.image}
                                                alt={tour.name}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            {/* Dark gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                                        </div>

                                        {/* Top-right badge */}
                                        <div className="absolute top-4 right-4 text-white text-[9px] font-black px-2.5 py-1 rounded-full tracking-widest shadow-md uppercase bg-sky-600">
                                            CRUISE
                                        </div>

                                        {/* Content Container */}
                                        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                                            
                                            {/* Flag Badge Container - Circular center-aligned above text */}
                                            <div className="flex justify-center mb-4">
                                                <div className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center overflow-hidden shadow-xl transform transition-transform duration-300 group-hover:scale-110">
                                                    <img 
                                                        src={`https://flagcdn.com/w320/${code}.png`} 
                                                        alt="" 
                                                        className="w-full h-full object-cover scale-[1.3] transform" 
                                                    />
                                                </div>
                                            </div>

                                            {/* Tour Title - Serif, uppercase, letter-spaced */}
                                            <h3 className="font-serif text-xl font-normal text-white text-center tracking-wider uppercase mb-5 leading-snug drop-shadow-md">
                                                {tour.name}
                                            </h3>

                                            {/* Divider Line */}
                                            <div className="w-full h-[0.5px] bg-white/20 mb-5" />

                                            {/* Info Table Grid */}
                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                <div>
                                                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">ROUTE</span>
                                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase truncate block">{tour.duration}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">RATING</span>
                                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase flex items-center justify-center gap-0.5">{tour.rating} ★</span>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">PRICE</span>
                                                    <span className="text-[11px] text-white font-extrabold tracking-wide uppercase">₹{tour.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Multi-Port Visa Banner */}
                        <div className="bg-slate-50 border border-slate-150 rounded-3xl p-5 flex gap-4 items-start shadow-sm">
                            <div className="text-3xl shrink-0">🛂</div>
                            <div>
                                <h4 className="font-sora font-bold text-navy text-xs sm:text-sm mb-1">Multi-Port Visa — We Handle It All</h4>
                                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed font-medium">
                                    Multi-country cruises require separate transit visas for each port country. VisaFormula's expert travel coordinators submit and secure all required port visas for you in a single unified booking.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. Entertainment Events Layout — Dark Cinematic Card */}
                {activeTab === "events" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedTours.map(tour => {
                            const countryMap: Record<string, string> = { uk: "gb", usa: "us" };
                            const code = countryMap[tour.country?.toLowerCase() || ""] || "us";
                            return (
                                <div
                                    key={tour.id}
                                    className="group relative h-[440px] w-full rounded-[32px] overflow-hidden text-left hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent"
                                    style={{ background: '#0C1A2E' }}
                                    onClick={() => handleBooking(tour.name)}
                                >
                                    {/* Background Image Container */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={tour.image}
                                            alt={tour.name}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {/* Dark gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                                    </div>

                                    {/* Top-right badge */}
                                    {tour.badge && (
                                        <div className="absolute top-4 right-4 text-white text-[9px] font-black px-2.5 py-1 rounded-full tracking-widest shadow-md uppercase bg-purple-600">
                                            {tour.badge}
                                        </div>
                                    )}

                                    {/* Content Container */}
                                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                                        
                                        {/* Flag Badge Container - Circular center-aligned above text */}
                                        <div className="flex justify-center mb-4">
                                            <div className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center overflow-hidden shadow-xl transform transition-transform duration-300 group-hover:scale-110">
                                                <img 
                                                    src={`https://flagcdn.com/w320/${code}.png`} 
                                                    alt="" 
                                                    className="w-full h-full object-cover scale-[1.3] transform" 
                                                />
                                            </div>
                                        </div>

                                        {/* Tour Title - Serif, uppercase, letter-spaced */}
                                        <h3 className="font-serif text-xl font-normal text-white text-center tracking-wider uppercase mb-5 leading-snug drop-shadow-md">
                                            {tour.name}
                                        </h3>

                                        {/* Divider Line */}
                                        <div className="w-full h-[0.5px] bg-white/20 mb-5" />

                                        {/* Info Table Grid */}
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <div>
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">DATE</span>
                                                <span className="text-[11px] text-white font-extrabold tracking-wide uppercase">{tour.date} {tour.monthName}</span>
                                            </div>
                                            <div>
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">RATING</span>
                                                <span className="text-[11px] text-white font-extrabold tracking-wide uppercase flex items-center justify-center gap-0.5">{tour.rating} ★</span>
                                            </div>
                                            <div>
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">PRICE</span>
                                                <span className="text-[11px] text-white font-extrabold tracking-wide uppercase">₹{tour.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}


