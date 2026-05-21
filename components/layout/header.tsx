"use client";

import Link from "next/link";
import { Search, MapPin, Menu, X, Bell, Globe, ChevronDown, Umbrella, Trophy, Ship, Music, GraduationCap } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const tourDropdownItems = [
    { title: "Holiday Packages", desc: "Visa + hotel + itinerary", href: "/tours?category=holiday", icon: Umbrella, iconColor: "text-amber-500", bg: "bg-amber-50" },
    { title: "Sport Tours", desc: "Live events + stadium visits", href: "/tours?category=sports", icon: Trophy, iconColor: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Cruises", desc: "Ocean & river voyages", href: "/tours?category=cruises", icon: Ship, iconColor: "text-blue-500", bg: "bg-blue-50" },
    { title: "Entertainment Events", desc: "Concerts, shows & festivals", href: "/tours?category=events", icon: Music, iconColor: "text-rose-500", bg: "bg-rose-50" }
];

const eventDropdownItems = [
    { title: "Exhibitions", desc: "Trade shows & expos worldwide", href: "/events/exhibitions", icon: Globe, iconColor: "text-indigo-500", bg: "bg-indigo-50" },
    { title: "Universities Fairs", desc: "Meet top universities directly", href: "/events/university-fairs", icon: GraduationCap, iconColor: "text-purple-500", bg: "bg-purple-50" }
];

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileToursOpen, setIsMobileToursOpen] = useState(false);
    const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false);
    const [isToursHovered, setIsToursHovered] = useState(false);
    const [isEventsHovered, setIsEventsHovered] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-sky-100 shadow-sm">
            {/* Top Row: Logo + Yelp-Style Split Search Bar + User Portal Links */}
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-20 gap-4">
                
                {/* Visara Logo */}
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <div className="w-9 h-9 bg-gradient-to-tr from-[#0ea5e9] to-[#0284c7] rounded-xl flex items-center justify-center shadow-md shadow-sky-100 group-hover:rotate-12 transition-transform duration-300">
                        <Globe className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight text-navy">Visara</span>
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </Link>

                {/* Split Yelp-style Search Bar (Desktop Only) */}
                <div className="hidden lg:flex flex-1 max-w-xl mx-8 bg-sky-50/50 rounded-xl flex-row items-center h-12 overflow-hidden border border-sky-100 focus-within:border-[#0ea5e9] focus-within:bg-white focus-within:shadow-md transition-all duration-200">
                    
                    {/* Search Query Portion */}
                    <div className="flex items-center px-4 flex-[1.2] h-full">
                        <Search className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                        <input
                            className="w-full border-none focus:ring-0 text-sm text-gray-800 bg-transparent placeholder:text-gray-400 font-semibold h-full outline-none"
                            placeholder="Student visa, work permits, experts..."
                            type="text"
                        />
                    </div>
                    
                    {/* Split Vertical Line */}
                    <div className="w-[1.5px] h-6 bg-sky-200 shrink-0" />
                    
                    {/* Location Portion */}
                    <div className="flex items-center px-4 flex-1 h-full">
                        <MapPin className="w-4 h-4 text-[#0ea5e9] mr-2 shrink-0" />
                        <input
                            className="w-full border-none focus:ring-0 text-sm text-gray-800 bg-transparent placeholder:text-gray-400 font-semibold h-full outline-none"
                            placeholder="Hyderabad, Delhi, USA..."
                            type="text"
                        />
                    </div>
                    
                    {/* Yelp-style Search Button but in Premium Sky-Blue */}
                    <button className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0284c7] px-6 h-full flex items-center justify-center transition-all shrink-0">
                        <Search className="w-4 h-4 text-white font-bold" />
                    </button>
                </div>

                {/* Right Portal Navigation & Buttons */}
                <div className="hidden lg:flex items-center gap-5 shrink-0">
                    <Link href="/register-provider" className="text-xs font-bold text-gray-700 hover:text-[#0ea5e9] transition-colors">
                        Visara for Experts
                    </Link>
                    <Link href="/support" className="text-xs font-bold text-gray-700 hover:text-[#0ea5e9] transition-colors">
                        Contact
                    </Link>
                    
                    <div className="w-[1.5px] h-4 bg-sky-100" />

                    <div className="flex items-center gap-2">
                        {/* Outlined Sign In button */}
                        <Link href="/login" 
                            className="text-xs font-bold text-gray-700 hover:text-[#0ea5e9] border border-sky-100 hover:border-[#0ea5e9] px-4 py-2.5 rounded-xl transition-all">
                            Log In
                        </Link>
                        {/* Solid Filled Sign Up button */}
                        <Link href="/signup" 
                            className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-sky-100 transition-all active:scale-[0.97]">
                            Sign Up
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button className="lg:hidden ml-auto p-2 hover:bg-sky-50 rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="w-6 h-6 text-navy" /> : <Menu className="w-6 h-6 text-navy" />}
                </button>
            </div>

            {/* Bottom Row: Premium Category Navigation Bar (Desktop Only) */}
            <div className="hidden lg:block border-t border-sky-50 bg-sky-50/20">
                <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-8">
                    
                    {/* Find Experts Link */}
                    <Link href="/find-experts"
                        className={`text-xs font-bold tracking-wide transition-all ${pathname === "/find-experts" ? "text-[#0ea5e9]" : "text-gray-700 hover:text-navy"}`}>
                        Find Experts
                    </Link>

                    {/* Tours & Packages Dropdown */}
                    <div 
                        className="relative py-3.5"
                        onMouseEnter={() => setIsToursHovered(true)}
                        onMouseLeave={() => setIsToursHovered(false)}
                    >
                        <button
                            className={`text-xs font-bold tracking-wide transition-all flex items-center gap-1 ${
                                isToursHovered || pathname?.startsWith("/tours") ? "text-[#0ea5e9]" : "text-gray-700 hover:text-navy"
                            }`}
                        >
                            Tours & Packages
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isToursHovered ? "rotate-180" : ""}`} />
                        </button>

                        {/* Dropdown Menu Card */}
                        <div className={`absolute top-full left-0 pt-2 w-80 transition-all duration-300 transform origin-top-left z-50 ${
                            isToursHovered 
                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }`}>
                            <div className="bg-white rounded-2xl border border-sky-100 shadow-xl p-2">
                                <div className="flex flex-col gap-1">
                                    {tourDropdownItems.map((item, idx) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <Link 
                                                key={idx} 
                                                href={item.href}
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-sky-50/80 transition-all duration-200 group"
                                            >
                                                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                                                    <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-sm font-bold text-navy group-hover:text-[#0ea5e9] transition-colors">{item.title}</div>
                                                    <div className="text-xs text-gray-400 mt-0.5 leading-normal">{item.desc}</div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Events Dropdown */}
                    <div 
                        className="relative py-3.5"
                        onMouseEnter={() => setIsEventsHovered(true)}
                        onMouseLeave={() => setIsEventsHovered(false)}
                    >
                        <button
                            className={`text-xs font-bold tracking-wide transition-all flex items-center gap-1 ${
                                isEventsHovered || pathname?.startsWith("/events") ? "text-[#0ea5e9]" : "text-gray-700 hover:text-navy"
                            }`}
                        >
                            Events & Fairs
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isEventsHovered ? "rotate-180" : ""}`} />
                        </button>

                        {/* Dropdown Menu Card */}
                        <div className={`absolute top-full left-0 pt-2 w-80 transition-all duration-300 transform origin-top-left z-50 ${
                            isEventsHovered 
                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }`}>
                            <div className="bg-white rounded-2xl border border-sky-100 shadow-xl p-2">
                                <div className="flex flex-col gap-1">
                                    {eventDropdownItems.map((item, idx) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <Link 
                                                key={idx} 
                                                href={item.href}
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-sky-50/80 transition-all duration-200 group"
                                            >
                                                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                                                    <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-sm font-bold text-navy group-hover:text-[#0ea5e9] transition-colors">{item.title}</div>
                                                    <div className="text-xs text-gray-400 mt-0.5 leading-normal">{item.desc}</div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Training Hub Link */}
                    <Link href="/training"
                        className={`text-xs font-bold tracking-wide transition-all ${pathname === "/training" ? "text-[#0ea5e9]" : "text-gray-700 hover:text-navy"}`}>
                        Training Hub
                    </Link>

                    {/* Our Services Link */}
                    <Link href="/services"
                        className={`text-xs font-bold tracking-wide transition-all ${pathname === "/services" ? "text-[#0ea5e9]" : "text-gray-700 hover:text-navy"}`}>
                        Our Services
                    </Link>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[85vh] overflow-y-auto">
                    
                    {/* Yelp-style Mobile Search bar */}
                    <div className="p-4 border-b border-sky-50 bg-sky-50/20 space-y-2">
                        <div className="flex items-center bg-white rounded-xl px-3 py-2 border border-sky-100 shadow-sm">
                            <Search className="w-4 h-4 text-sky-400 mr-2 shrink-0" />
                            <input className="flex-1 bg-transparent outline-none text-xs placeholder:text-gray-400 font-semibold" placeholder="What are you looking for..." type="text" />
                        </div>
                        <div className="flex items-center bg-white rounded-xl px-3 py-2 border border-sky-100 shadow-sm">
                            <MapPin className="w-4 h-4 text-sky-400 mr-2 shrink-0" />
                            <input className="flex-1 bg-transparent outline-none text-xs placeholder:text-gray-400 font-semibold" placeholder="Location (e.g. Hyderabad)" type="text" />
                        </div>
                        <button className="w-full py-2.5 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white rounded-xl font-bold text-xs shadow-sm active:scale-[0.98]">
                            Search Experts
                        </button>
                    </div>

                    {/* Find Experts */}
                    <Link href="/find-experts"
                        className={`block px-4 py-3.5 border-b border-gray-50 font-semibold text-sm ${pathname === "/find-experts" ? "text-[#0ea5e9] bg-sky-50/50" : "text-gray-700 hover:bg-gray-50"} transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}>
                        Find Experts
                    </Link>

                    {/* Mobile Expandable Tours & Packages */}
                    <div className="border-b border-gray-50">
                        <button 
                            onClick={() => setIsMobileToursOpen(!isMobileToursOpen)}
                            className="w-full flex items-center justify-between px-4 py-3.5 font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <span>Tours & Packages</span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isMobileToursOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isMobileToursOpen && (
                            <div className="bg-sky-50/30 px-3 py-1 flex flex-col gap-1">
                                {tourDropdownItems.map((item, idx) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <Link 
                                            key={idx} 
                                            href={item.href}
                                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-sky-50 transition-all duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                                                <IconComponent className={`w-4 h-4 ${item.iconColor}`} />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-navy">{item.title}</div>
                                                <div className="text-[10px] text-gray-400 mt-0.5">{item.desc}</div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Mobile Expandable Events */}
                    <div className="border-b border-gray-50">
                        <button 
                            onClick={() => setIsMobileEventsOpen(!isMobileEventsOpen)}
                            className="w-full flex items-center justify-between px-4 py-3.5 font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <span>Events & Fairs</span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isMobileEventsOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isMobileEventsOpen && (
                            <div className="bg-sky-50/30 px-3 py-1 flex flex-col gap-1">
                                {eventDropdownItems.map((item, idx) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <Link 
                                            key={idx} 
                                            href={item.href}
                                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-sky-50 transition-all duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                                                <IconComponent className={`w-4 h-4 ${item.iconColor}`} />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-navy">{item.title}</div>
                                                <div className="text-[10px] text-gray-400 mt-0.5">{item.desc}</div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Training Hub */}
                    <Link href="/training"
                        className={`block px-4 py-3.5 border-b border-gray-50 font-semibold text-sm ${pathname === "/training" ? "text-[#0ea5e9] bg-sky-50/50" : "text-gray-700 hover:bg-gray-50"} transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}>
                        Training Hub
                    </Link>

                    {/* Our Services */}
                    <Link href="/services"
                        className={`block px-4 py-3.5 border-b border-gray-50 font-semibold text-sm ${pathname === "/services" ? "text-[#0ea5e9] bg-sky-50/50" : "text-gray-700 hover:bg-gray-50"} transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}>
                        Our Services
                    </Link>

                    {/* Visara for Experts */}
                    <Link href="/register-provider"
                        className={`block px-4 py-3.5 border-b border-gray-50 font-semibold text-sm ${pathname === "/register-provider" ? "text-[#0ea5e9] bg-sky-50/50" : "text-gray-700 hover:bg-gray-50"} transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}>
                        Visara for Experts
                    </Link>

                    {/* Contact */}
                    <Link href="/support"
                        className={`block px-4 py-3.5 border-b border-gray-50 font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-colors`}
                        onClick={() => setIsMobileMenuOpen(false)}>
                        Contact
                    </Link>

                    {/* Mobile Log In and Sign Up buttons */}
                    <div className="p-4 bg-sky-50/10 flex flex-col gap-2">
                        <Link href="/login" 
                            className="block text-center py-2.5 border border-sky-100 text-gray-700 font-bold text-sm rounded-xl hover:bg-sky-50 transition-colors" 
                            onClick={() => setIsMobileMenuOpen(false)}>
                            Log In
                        </Link>
                        <Link href="/signup" 
                            className="block text-center py-2.5 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white rounded-xl font-bold text-sm shadow-md" 
                            onClick={() => setIsMobileMenuOpen(false)}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
