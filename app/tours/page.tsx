"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
    Star, MapPin, Calendar, Users, Plane, Hotel, 
    CheckCircle, ChevronDown, Sparkles, Trophy, 
    Ship, Music, Umbrella, Search, DollarSign, Filter, ArrowRight 
} from "lucide-react";

// Toast helper
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
            <Sparkles className="w-4 h-4 text-[#0ea5e9] animate-pulse" />
            {message}
        </div>
    );
}

// 1. Holiday Packages
const holidayTours = [
    { id: "h1", name: "Bali Paradise Getaway", destination: "Bali, Indonesia", days: 5, nights: 4, price: 25000, originalPrice: 32000, rating: 4.8, reviews: 156, group: "2-6 people", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop", includes: ["Visa Assistance", "Hotel", "Sightseeing", "Airport Transfer"], tags: ["Beach", "Adventure"], description: "Explore Bali's stunning temples, rice terraces, and pristine beaches. Visa processing included." },
    { id: "h2", name: "Dubai City & Desert Safari", destination: "Dubai, UAE", days: 6, nights: 5, price: 55000, originalPrice: 68000, rating: 4.9, reviews: 234, group: "2-8 people", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop", includes: ["Visa Processing", "5★ Hotel", "Desert Safari", "Burj Khalifa"], tags: ["Luxury", "Shopping"], description: "Experience the glamour of Dubai with a desert safari, Burj Khalifa visit, and luxury shopping." },
    { id: "h3", name: "Europe 5-Country Tour", destination: "France · Italy · Switzerland · Germany · Netherlands", days: 14, nights: 13, price: 110000, originalPrice: 145000, rating: 4.7, reviews: 89, group: "4-12 people", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=500&fit=crop", includes: ["Schengen Visa", "Hotels", "Train Pass", "City Tours"], tags: ["Multi-Country", "Culture"], description: "The ultimate European adventure — Paris, Rome, Zurich, Munich, and Amsterdam in one epic trip." },
    { id: "h4", name: "Thailand Beach & Culture", destination: "Bangkok · Pattaya · Phuket", days: 7, nights: 6, price: 22000, originalPrice: 28000, rating: 4.6, reviews: 198, group: "2-6 people", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=500&fit=crop", includes: ["Visa on Arrival", "Hotel", "Island Hopping", "Thai Massage"], tags: ["Beach", "Budget"], description: "From Bangkok's temples to Phuket's beaches — a perfect budget-friendly tropical escape." },
    { id: "h5", name: "Singapore Family Package", destination: "Singapore", days: 5, nights: 4, price: 45000, originalPrice: 52000, rating: 4.9, reviews: 312, group: "2-6 people", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=500&fit=crop", includes: ["Visa", "Hotel", "Universal Studios", "Gardens by the Bay"], tags: ["Family", "City"], description: "Perfect family holiday — Universal Studios, Sentosa Island, Gardens by the Bay, and more." },
    { id: "h6", name: "Maldives Honeymoon Special", destination: "Maldives", days: 4, nights: 3, price: 85000, originalPrice: 110000, rating: 5.0, reviews: 67, group: "Couples", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=500&fit=crop", includes: ["Visa on Arrival", "Water Villa", "Snorkeling", "Candlelight Dinner"], tags: ["Luxury", "Romantic"], description: "Stay in an overwater villa, snorkel in crystal waters, and enjoy a candlelight dinner under the stars." }
];

// 2. Sport Tours
const sportTours = [
    { id: "s1", name: "FIFA World Cup 2026 — USA Package", sport: "football", country: "usa", month: "June 2025", price: 185000, originalPrice: 220000, rating: 4.9, reviews: 142, days: 11, nights: 10, image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop", includes: ["Match tickets", "Hotel", "Visa included", "Transfers"], tags: ["Match tickets", "Hotel", "Visa included"], description: "Watch FIFA World Cup live! Includes match tickets, luxurious hotel stay, and complete USA tourist visa processing." },
    { id: "s2", name: "F1 Abu Dhabi Grand Prix Package", sport: "f1", country: "uae", month: "Dec 2025", price: 95000, originalPrice: 120000, rating: 4.8, reviews: 87, days: 5, nights: 4, image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=500&fit=crop", includes: ["Race tickets", "Paddock access", "5-star hotel"], tags: ["Race tickets", "Paddock access", "5-star hotel"], description: "Experience the thrilling F1 season finale in Abu Dhabi. Complete VIP paddock access and luxury stay with UAE visa." },
    { id: "s3", name: "ICC Champions Trophy — South Africa", sport: "cricket", country: "australia", month: "July 2025", price: 72000, originalPrice: 90000, rating: 4.9, reviews: 204, days: 8, nights: 7, image: "https://images.unsplash.com/photo-1540747913346-19212a4b423d?w=800&h=500&fit=crop", includes: ["3 match tickets", "Visa", "Transfers"], tags: ["3 match tickets", "Visa", "Transfers"], description: "Cheer for India live in South Africa. Includes prime tickets for high-profile matches, sightseeing, and tourist visa." },
    { id: "s4", name: "Paris 2026 Olympics Package", sport: "olympics", country: "uk", month: "July 2025", price: 210000, originalPrice: 250000, rating: 4.9, reviews: 56, days: 9, nights: 8, image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=500&fit=crop", includes: ["Event tickets", "Visa included", "Luxury hotel"], tags: ["Event tickets", "Visa included", "Luxury hotel"], description: "Spectate the greatest sports event on earth in Paris. Includes opening ceremony access and fast-track Schengen visa." }
];

// 3. Cruises
const cruiseTours = [
    { id: "c1", name: "Mediterranean Splendour — 10 Nights", type: "ocean", depart: "Singapore", duration: "10–14 Nights", price: 145000, originalPrice: 185000, rating: 4.9, reviews: 114, route: "Barcelona → Rome → Athens → Istanbul", countries: "🇪🇸🇮🇹🇬🇷🇹🇷 4 countries · Schengen + Turkey visa", image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&h=500&fit=crop", description: "Breathtaking ocean voyage covering Spain, Italy, Greece, and Turkey. All port visas and Schengen handled smoothly." },
    { id: "c2", name: "Arabian Sea Explorer — 7 Nights", type: "ocean", depart: "Mumbai, India", duration: "6–9 Nights", price: 58000, originalPrice: 75000, rating: 4.7, reviews: 92, route: "Mumbai → Goa → Dubai → Abu Dhabi", countries: "🇮🇳🇦🇪 Mumbai to Dubai · UAE visa included", image: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=800&h=500&fit=crop", description: "Set sail from Mumbai to the modern skylines of UAE. Multi-port visa verification and entry permits fully sorted." },
    { id: "c3", name: "Danube River Voyage — 8 Nights", type: "river", depart: "Singapore", duration: "6–9 Nights", price: 120000, originalPrice: 150000, rating: 4.8, reviews: 108, route: "Vienna → Budapest → Prague", countries: "🇦🇹🇭🇺🇨🇿 3 countries · Single Schengen visa", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=500&fit=crop", description: "Enchanting river cruise along Europe's historic waterways. Covers Austria, Hungary, and Czech Republic." },
    { id: "c4", name: "Norwegian Fjords Luxury — 7 Nights", type: "luxury", depart: "Mumbai, India", duration: "6–9 Nights", price: 225000, originalPrice: 280000, rating: 5.0, reviews: 43, route: "Bergen → Flåm → Geiranger", countries: "🇳🇴 Norway · Schengen · All-inclusive", image: "https://images.unsplash.com/photo-1556413955-6375e4497fde?w=800&h=500&fit=crop", description: "Immerse in Norway's jaw-dropping cliffs and deep fjords. Complete five-star cruise suite with Schengen visa." }
];

// 4. Entertainment Events
const eventTours = [
    { id: "e1", name: "Coldplay — Music of the Spheres World Tour", type: "concert", country: "uk", month: "Jun 2025", price: 68000, originalPrice: 85000, rating: 4.9, reviews: 215, date: "14", monthName: "Jun", venue: "Wembley Stadium, London", meta: "UK Tourist Visa included", tags: ["UK Visa", "Hotel 3 nights", "Concert tickets"], badge: "Limited", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop", description: "Sing along to Coldplay live in London! Package includes guaranteed concert tickets, premium hotel stay, and UK visa." },
    { id: "e2", name: "Coachella Valley Music & Arts Festival 2026", type: "festival", country: "usa", month: "Apr 2026", price: 135000, originalPrice: 170000, rating: 4.8, reviews: 98, date: "18", monthName: "Apr", venue: "Palm Springs, California", meta: "USA B-2 Visa Assistance", tags: ["USA Visa", "Festival tickets", "Hotel 5 nights"], badge: "Popular", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=500&fit=crop", description: "Join the world's most glamorous music festival in California. Complete USA visa application filing included." },
    { id: "e3", name: "West End Theatre — London Exclusive", type: "theatre", country: "uk", month: "Jul 2025", price: 82000, originalPrice: 105000, rating: 4.8, reviews: 76, date: "22", monthName: "Jul", venue: "West End, London", meta: "UK Tourist Visa · 3 shows included", tags: ["UK Visa", "3 show tickets", "Hotel 4 nights"], badge: "Available", image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=500&fit=crop", description: "Enjoy the pinnacle of live theater in London. Includes tickets to 3 top-rated West End musicals and UK tourist visa." }
];

export default function ToursPage() {
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

    const triggerToast = (msg: string) => {
        setToastMsg(msg);
        setIsToastVisible(true);
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

    const sortedTours = [...getFilteredTours()].sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviews - a.reviews;
    });

    return (
        <div className="bg-[#f7fbff] min-h-screen">
            <Toast message={toastMsg} visible={isToastVisible} onClose={() => setIsToastVisible(false)} />

            {/* Category Navigation Bar */}
            <div className="bg-white border-b border-sky-100 sticky top-16 z-30 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center overflow-x-auto h-14 scrollbar-none">
                    <div className="flex gap-2 shrink-0">
                        {/* Tab: Holiday */}
                        <button 
                            onClick={() => { setActiveTab("holiday"); setSortBy("popular"); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                activeTab === "holiday" 
                                    ? "bg-sky-50 text-[#0ea5e9] border border-sky-100 shadow-sm" 
                                    : "text-gray-500 hover:text-navy hover:bg-gray-50"
                            }`}
                        >
                            <Umbrella className="w-4 h-4 shrink-0" />
                            Holiday Packages
                        </button>

                        {/* Tab: Sports */}
                        <button 
                            onClick={() => { setActiveTab("sports"); setSortBy("popular"); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                activeTab === "sports" 
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm" 
                                    : "text-gray-500 hover:text-navy hover:bg-gray-50"
                            }`}
                        >
                            <Trophy className="w-4 h-4 shrink-0" />
                            Sport Tours
                            <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-extrabold animate-pulse">NEW</span>
                        </button>

                        {/* Tab: Cruises */}
                        <button 
                            onClick={() => { setActiveTab("cruises"); setSortBy("popular"); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                activeTab === "cruises" 
                                    ? "bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm" 
                                    : "text-gray-500 hover:text-navy hover:bg-gray-50"
                            }`}
                        >
                            <Ship className="w-4 h-4 shrink-0" />
                            Cruises
                        </button>

                        {/* Tab: Events */}
                        <button 
                            onClick={() => { setActiveTab("events"); setSortBy("popular"); }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
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

            {/* Dynamic Hero Section */}
            {activeTab === "holiday" && (
                <section className="relative bg-gradient-to-br from-navy via-ink to-navy py-14 px-4 overflow-hidden">
                    <div className="absolute inset-0 opacity-15">
                        <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&h=600&fit=crop" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <span className="bg-sky-50/10 text-[#38bdf8] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-sky-500/20 mb-4 inline-block">✈️ Holiday Packages</span>
                        <h1 className="font-sora text-4xl md:text-5xl font-extrabold text-white mb-3">
                            Dream Holidays. <span className="text-[#38bdf8]">Visas Sorted.</span>
                        </h1>
                        <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-8">
                            All-inclusive vacation packages with verified luxury stays and flawless visa documentation.
                        </p>

                        {/* Holiday Search Bar */}
                        <div className="bg-white rounded-2xl border border-sky-100 shadow-xl p-4 max-w-2xl mx-auto text-left">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Destination</label>
                                    <select value={holidayDest} onChange={e => setHolidayDest(e.target.value)} className="w-full bg-sky-50/40 border border-sky-100 rounded-xl px-3 py-2 text-xs font-semibold text-navy outline-none">
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
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Vacation Type</label>
                                    <select value={holidayTag} onChange={e => setHolidayTag(e.target.value)} className="w-full bg-sky-50/40 border border-sky-100 rounded-xl px-3 py-2 text-xs font-semibold text-navy outline-none">
                                        <option value="All">All Types</option>
                                        <option value="Beach">Beach Getaway</option>
                                        <option value="Luxury">Luxury Stay</option>
                                        <option value="Budget">Budget Friendly</option>
                                        <option value="Family">Family Holiday</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={() => triggerToast("✈️ Searching holiday packages...")} className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:shadow-lg hover:shadow-sky-100 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all">
                                <Search className="w-4 h-4" /> Search Holidays
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {activeTab === "sports" && (
                <section className="relative bg-gradient-to-br from-[#0c1e15] via-[#103020] to-[#0c1e15] py-14 px-4 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&h=600&fit=crop" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/20 mb-4 inline-block">⚽ Sport Tours</span>
                        <h1 className="font-sora text-4xl md:text-5xl font-extrabold text-white mb-3">
                            Live the Game. <span className="text-emerald-400">Visas Sorted.</span>
                        </h1>
                        <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-8">
                            Watch FIFA, Formula 1, Cricket World Cup, Olympics and more — with match tickets, hotel, and visa fully sorted.
                        </p>

                        {/* Sports Search Bar */}
                        <div className="bg-white rounded-2xl border border-emerald-100 shadow-xl p-4 max-w-3xl mx-auto text-left">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Sport Type</label>
                                    <select value={sportType} onChange={e => setSportType(e.target.value)} className="w-full bg-emerald-50/20 border border-emerald-100 rounded-xl px-3 py-2 text-xs font-semibold text-navy outline-none">
                                        <option>All Sports</option>
                                        <option>⚽ Football / FIFA</option>
                                        <option>🏎️ Formula 1</option>
                                        <option>🏏 Cricket</option>
                                        <option>🏊 Olympics</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Country</label>
                                    <select value={sportCountry} onChange={e => setSportCountry(e.target.value)} className="w-full bg-emerald-50/20 border border-emerald-100 rounded-xl px-3 py-2 text-xs font-semibold text-navy outline-none">
                                        <option>Anywhere</option>
                                        <option>🇬🇧 UK</option>
                                        <option>🇦🇪 UAE</option>
                                        <option>🇺🇸 USA</option>
                                        <option>🇦🇺 Australia</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Month</label>
                                    <select value={sportMonth} onChange={e => setSportMonth(e.target.value)} className="w-full bg-emerald-50/20 border border-emerald-100 rounded-xl px-3 py-2 text-xs font-semibold text-navy outline-none">
                                        <option>Any Month</option>
                                        <option>June 2025</option>
                                        <option>July 2025</option>
                                        <option>Dec 2025</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={() => triggerToast("⚽ Searching sport tours...")} className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-lg hover:shadow-emerald-100 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all">
                                <Search className="w-4 h-4" /> Search Sport Tours
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {activeTab === "cruises" && (
                <section className="relative bg-gradient-to-br from-[#0c142e] via-[#15234d] to-[#0c142e] py-14 px-4 overflow-hidden">
                    <div className="absolute inset-0 opacity-15">
                        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=600&fit=crop" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-indigo-500/20 mb-4 inline-block">🚢 Cruises</span>
                        <h1 className="font-sora text-4xl md:text-5xl font-extrabold text-white mb-3">
                            Sail the World. <span className="text-indigo-400">Ports & Visas Sorted.</span>
                        </h1>
                        <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-8">
                            Ocean cruises, river voyages, and luxury liners — multiple-country voyages with all port visas fully handled.
                        </p>

                        {/* Cruise Search Bar */}
                        <div className="bg-white rounded-2xl border border-indigo-100 shadow-xl p-4 max-w-3xl mx-auto text-left">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Cruise Type</label>
                                    <select value={cruiseType} onChange={e => setCruiseType(e.target.value)} className="w-full bg-indigo-50/20 border border-indigo-100 rounded-xl px-3 py-2 text-xs font-semibold text-navy outline-none">
                                        <option>All Types</option>
                                        <option>🌊 Ocean Cruise</option>
                                        <option>🏞️ River Cruise</option>
                                        <option>💎 Luxury Liner</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Departure Port</label>
                                    <select value={cruiseDepart} onChange={e => setCruiseDepart(e.target.value)} className="w-full bg-indigo-50/20 border border-indigo-100 rounded-xl px-3 py-2 text-xs font-semibold text-navy outline-none">
                                        <option>Any Port</option>
                                        <option>Mumbai, India</option>
                                        <option>Dubai, UAE</option>
                                        <option>Singapore</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Duration</label>
                                    <select value={cruiseDur} onChange={e => setCruiseDur(e.target.value)} className="w-full bg-indigo-50/20 border border-indigo-100 rounded-xl px-3 py-2 text-xs font-semibold text-navy outline-none">
                                        <option>Any Duration</option>
                                        <option>3–5 Nights</option>
                                        <option>6–9 Nights</option>
                                        <option>10–14 Nights</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={() => triggerToast("🚢 Searching cruises...")} className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:shadow-lg hover:shadow-indigo-100 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all">
                                <Search className="w-4 h-4" /> Search Cruises
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {activeTab === "events" && (
                <section className="relative bg-gradient-to-br from-[#2e1d0c] via-[#4d2d15] to-[#2e1d0c] py-14 px-4 overflow-hidden">
                    <div className="absolute inset-0 opacity-15">
                        <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&h=600&fit=crop" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <span className="bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-orange-500/20 mb-4 inline-block">🎭 Entertainment Events</span>
                        <h1 className="font-sora text-4xl md:text-5xl font-extrabold text-white mb-3">
                            See the Show. <span className="text-orange-400">Visas Sorted.</span>
                        </h1>
                        <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-8">
                            Concerts, music festivals, award shows, comedy nights, theatre — worldwide events with complete visa assistance.
                        </p>

                        {/* Events Search Bar */}
                        <div className="bg-white rounded-2xl border border-orange-100 shadow-xl p-4 max-w-4xl mx-auto text-left">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Event Type</label>
                                    <select value={eventType} onChange={e => setEventType(e.target.value)} className="w-full bg-orange-50/20 border border-orange-100 rounded-xl px-3 py-2 text-xs font-semibold text-navy outline-none">
                                        <option>All Events</option>
                                        <option>🎵 Concerts</option>
                                        <option>🎪 Festivals</option>
                                        <option>🎭 Theatre</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Country</label>
                                    <select value={eventCountry} onChange={e => setEventCountry(e.target.value)} className="w-full bg-orange-50/20 border border-orange-100 rounded-xl px-3 py-2 text-xs font-semibold text-navy outline-none">
                                        <option>Anywhere</option>
                                        <option>🇬🇧 UK</option>
                                        <option>🇺🇸 USA</option>
                                        <option>🇦🇪 UAE</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Month</label>
                                    <select value={eventMonth} onChange={e => setEventMonth(e.target.value)} className="w-full bg-orange-50/20 border border-orange-100 rounded-xl px-3 py-2 text-xs font-semibold text-navy outline-none">
                                        <option>Any Month</option>
                                        <option>Jun 2025</option>
                                        <option>Jul 2025</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Budget</label>
                                    <select value={eventBudget} onChange={e => setEventBudget(e.target.value)} className="w-full bg-orange-50/20 border border-orange-100 rounded-xl px-3 py-2 text-xs font-semibold text-navy outline-none">
                                        <option>Any Budget</option>
                                        <option>Under ₹30K</option>
                                        <option>₹30K–₹75K</option>
                                        <option>₹75K–₹1.5L</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={() => triggerToast("🎭 Searching events...")} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:shadow-orange-100 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all">
                                <Search className="w-4 h-4" /> Search Events
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Filter Category Chips & Category Title Rows */}
            <div className="max-w-6xl mx-auto px-4 mt-8">
                {activeTab === "holiday" && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button onClick={() => setHolidayDest("All")} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${holidayDest === "All" ? "bg-[#0ea5e9] text-white border-transparent shadow-md" : "bg-white text-gray-500 border-sky-100 hover:bg-sky-50"}`}>All Destinations</button>
                        {["Bali", "Dubai", "Europe", "Thailand", "Singapore", "Maldives"].map(d => (
                            <button key={d} onClick={() => setHolidayDest(d)} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${holidayDest === d ? "bg-[#0ea5e9] text-white border-transparent shadow-md" : "bg-white text-gray-500 border-sky-100 hover:bg-sky-50"}`}>{d}</button>
                        ))}
                    </div>
                )}

                {activeTab === "sports" && (
                    <div className="mb-6">
                        <div className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest mb-2">Browse by Sport</div>
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
                                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                                        activeSportFilter === item.key 
                                            ? "border-emerald-500 bg-emerald-50/40 shadow-sm" 
                                            : "border-sky-100 bg-white hover:border-emerald-300"
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
                                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                                    activeCruiseFilter === item.key 
                                        ? "bg-indigo-600 text-white border-transparent shadow-md" 
                                        : "bg-white text-gray-500 border-sky-100 hover:bg-sky-50"
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
                                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                                    activeEventFilter === item.key 
                                        ? "bg-orange-500 text-white border-transparent shadow-md" 
                                        : "bg-white text-gray-500 border-sky-100 hover:bg-sky-50"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Results Grid / List */}
            <div className="max-w-6xl mx-auto px-4 pb-20">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">
                        {sortedTours.length} package{sortedTours.length !== 1 ? "s" : ""} available
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sort By</span>
                        <select 
                            value={sortBy} 
                            onChange={e => setSortBy(e.target.value)} 
                            className="bg-white border border-sky-100 rounded-xl py-1.5 pl-3 pr-8 text-xs font-bold text-navy outline-none appearance-none cursor-pointer shadow-sm"
                        >
                            <option value="popular">Most Popular</option>
                            <option value="rating">Highest Rated</option>
                            <option value="price-low">Price: Low → High</option>
                            <option value="price-high">Price: High → Low</option>
                        </select>
                    </div>
                </div>

                {/* 1. Holiday Packages Layout */}
                {activeTab === "holiday" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedTours.map(tour => (
                            <div key={tour.id} className="group bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-3 left-3 flex gap-1.5">
                                        {tour.tags?.map(tag => (
                                            <span key={tag} className="bg-black/50 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                    {tour.originalPrice && (
                                        <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                            {Math.round((1 - tour.price / tour.originalPrice) * 100)}% OFF
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-sora font-bold text-navy text-sm mb-0.5 group-hover:text-[#0ea5e9] transition-colors">{tour.name}</h3>
                                            <p className="text-[10px] text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3 text-sky-400" /> {tour.destination}</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-[11px] font-semibold text-navy shrink-0">
                                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {tour.rating}
                                            <span className="text-gray-400">({tour.reviews})</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-gray-500 leading-relaxed mb-4 line-clamp-2">{tour.description}</p>
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {tour.includes?.map(inc => (
                                            <span key={inc} className="bg-sky-50 text-[#0ea5e9] text-[9px] font-bold px-2 py-0.5 rounded-full border border-sky-100 flex items-center gap-1">
                                                <CheckCircle className="w-2.5 h-2.5 text-[#0ea5e9]" /> {inc}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between mb-4 text-[10px] text-gray-500 font-bold border-b border-sky-50 pb-3">
                                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {tour.days}D / {tour.nights}N</span>
                                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {tour.group}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <div>
                                            {tour.originalPrice && <span className="text-[10px] text-gray-400 line-through">₹{tour.originalPrice.toLocaleString()}</span>}
                                            <span className="font-sora font-extrabold text-navy text-base ml-1.5">₹{tour.price.toLocaleString()}</span>
                                            <span className="text-[10px] text-gray-400 ml-0.5">/ person</span>
                                        </div>
                                        <button onClick={() => triggerToast(`✈️ Booking ${tour.name}!`)} className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-[0.97]">
                                            Book Tour
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 2. Sport Tours Layout */}
                {activeTab === "sports" && (
                    <div className="flex flex-col gap-4">
                        {sortedTours.map(tour => (
                            <div key={tour.id} onClick={() => triggerToast(`⚽ ${tour.name} details`)} className="group bg-white rounded-2xl border border-sky-100 p-4 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col sm:flex-row gap-4 items-start cursor-pointer">
                                <img src={tour.image} className="w-full sm:w-28 sm:h-28 rounded-xl object-cover shrink-0" alt="" />
                                <div className="flex-1 min-w-0 w-full">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="font-sora font-bold text-navy text-sm group-hover:text-emerald-600 transition-colors">{tour.name}</h3>
                                            <div className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                                                {tour.country?.toUpperCase()} · {tour.month} · {tour.nights} nights stay · Visa included
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="font-sora font-extrabold text-emerald-600 text-base">₹{tour.price.toLocaleString()}</div>
                                            <div className="text-[9px] text-gray-400">all included</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {tour.includes?.map(inc => (
                                            <span key={inc} className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                                                {inc}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-sky-50">
                                        <div className="flex items-center gap-3 text-[11px] text-gray-400">
                                            <span className="flex items-center gap-0.5"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {tour.rating}</span>
                                            <span>·</span>
                                            <span>{tour.reviews} reviews</span>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); triggerToast(`⚽ Booking ${tour.name}!`); }}
                                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-1.5 rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-[0.97]"
                                        >
                                            Book Ticket →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 3. Cruises Layout */}
                {activeTab === "cruises" && (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {sortedTours.map(tour => (
                                <div key={tour.id} onClick={() => triggerToast(`🚢 ${tour.name} details`)} className="group bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                    <div className="relative h-48 overflow-hidden">
                                        <img src={tour.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute bottom-3 left-3 right-3 bg-navy/80 backdrop-blur-md rounded-xl p-2.5 text-white">
                                            <div className="text-[9px] text-white/70">Route</div>
                                            <div className="font-sora font-bold text-xs truncate">{tour.route}</div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-sora font-bold text-navy text-sm mb-1 group-hover:text-indigo-600 transition-colors leading-snug">{tour.name}</h3>
                                        <div className="text-[10px] text-gray-400 font-bold mb-3">{tour.countries}</div>
                                        <p className="text-[11px] text-gray-500 leading-relaxed mb-4">{tour.description}</p>
                                        <div className="flex items-center justify-between pt-3 border-t border-sky-50">
                                            <div>
                                                <div className="font-sora font-extrabold text-indigo-600 text-base">₹{tour.price.toLocaleString()}</div>
                                                <div className="text-[9px] text-gray-400">per person</div>
                                            </div>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); triggerToast(`🚢 Booking ${tour.name}!`); }}
                                                className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-[0.97]"
                                            >
                                                Book Cabin
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Multi-Port Visa Banner */}
                        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex gap-4 items-start shadow-sm">
                            <div className="text-3xl shrink-0">🛂</div>
                            <div>
                                <h4 className="font-sora font-bold text-navy text-xs sm:text-sm mb-1">Multi-Port Visa — We Handle It All</h4>
                                <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                                    Multi-country cruises require separate transit visas for each port country. Visara's expert travel coordinators submit and secure all required port visas for you in a single unified booking.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. Entertainment Events Layout */}
                {activeTab === "events" && (
                    <div className="flex flex-col gap-4">
                        {sortedTours.map(tour => (
                            <div key={tour.id} onClick={() => triggerToast(`🎭 ${tour.name} details`)} className="group bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 flex flex-row gap-0 cursor-pointer">
                                <div className="w-16 sm:w-20 bg-gradient-to-br from-orange-400 to-orange-600 flex flex-col items-center justify-center text-white shrink-0 p-2">
                                    <div className="font-sora font-extrabold text-2xl sm:text-3xl line-height-1">{tour.date}</div>
                                    <div className="text-[9px] font-bold text-white/80 uppercase tracking-widest mt-0.5">{tour.monthName}</div>
                                </div>
                                <div className="flex-1 p-4 min-w-0">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                        <div>
                                            <h3 className="font-sora font-bold text-navy text-sm group-hover:text-orange-500 transition-colors leading-snug">{tour.name}</h3>
                                            <div className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                                                {tour.venue} · {tour.meta}
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-2.5">
                                                {tour.tags?.map(t => (
                                                    <span key={t} className="bg-orange-50 text-orange-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-orange-100">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0 sm:self-start">
                                            <div className="font-sora font-extrabold text-orange-500 text-base">₹{tour.price.toLocaleString()}</div>
                                            {tour.badge && (
                                                <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full mt-1.5 ${
                                                    tour.badge === "Limited" ? "bg-red-50 text-red-600 border border-red-100" :
                                                    tour.badge === "Popular" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                                    "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                }`}>{tour.badge}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-sky-50">
                                        <div className="flex items-center gap-3 text-[11px] text-gray-400">
                                            <span className="flex items-center gap-0.5"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {tour.rating}</span>
                                            <span>·</span>
                                            <span>{tour.reviews} reviews</span>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); triggerToast(`🎭 Booking ${tour.name}!`); }}
                                            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-5 py-1.5 rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-[0.97]"
                                        >
                                            Book Ticket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
