"use client";

import Link from "next/link";
import { Search, MapPin, Menu, X, Bell, Globe, ChevronDown, Umbrella, Trophy, Ship, Music, GraduationCap } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const mainNavLinks = [
    { href: "/", label: "Home" },
    { href: "/find-experts", label: "Find Experts" },
];

const secondaryNavLinks = [
    { href: "/training", label: "Training Hub" },
    { href: "/services", label: "Our Services" },
];

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
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-lg border-b border-sky-100 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center px-4 md:px-6 h-16 gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <Globe className="w-5 h-5 text-[#0ea5e9]" />
                    <span className="text-xl font-extrabold tracking-tight text-navy">Visara</span>
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </Link>
                
                {/* Nav Links - Desktop */}
                <nav className="hidden lg:flex items-center gap-1 ml-6 relative">
                    {mainNavLinks.map(link => (
                        <Link key={link.href} href={link.href}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${pathname === link.href
                                    ? "text-[#0ea5e9] bg-sky-50"
                                    : "text-gray-500 hover:text-navy hover:bg-gray-50"
                                }`}>
                            {link.label}
                        </Link>
                    ))}

                    {/* Tours & Packages Hover Dropdown */}
                    <div 
                        className="relative py-2"
                        onMouseEnter={() => setIsToursHovered(true)}
                        onMouseLeave={() => setIsToursHovered(false)}
                    >
                        <button
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                                isToursHovered || pathname.startsWith("/tours") || pathname.startsWith("/tour/")
                                    ? "text-[#0ea5e9] bg-sky-50"
                                    : "text-gray-500 hover:text-navy hover:bg-gray-50"
                            }`}
                        >
                            Tours & Packages
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isToursHovered ? "rotate-180" : ""}`} />
                        </button>

                        {/* Dropdown Menu Card Wrapper */}
                        <div className={`absolute top-full left-0 pt-2 w-80 transition-all duration-300 transform origin-top-left ${
                            isToursHovered 
                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }`}>
                            {/* The Actual Card */}
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

                    {/* Events Hover Dropdown */}
                    <div 
                        className="relative py-2"
                        onMouseEnter={() => setIsEventsHovered(true)}
                        onMouseLeave={() => setIsEventsHovered(false)}
                    >
                        <button
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                                isEventsHovered || pathname.startsWith("/events")
                                    ? "text-[#0ea5e9] bg-sky-50"
                                    : "text-gray-500 hover:text-navy hover:bg-gray-50"
                            }`}
                        >
                            Events
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isEventsHovered ? "rotate-180" : ""}`} />
                        </button>

                        {/* Dropdown Menu Card Wrapper */}
                        <div className={`absolute top-full left-0 pt-2 w-80 transition-all duration-300 transform origin-top-left ${
                            isEventsHovered 
                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }`}>
                            {/* The Actual Card */}
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

                    {secondaryNavLinks.map(link => (
                        <Link key={link.href} href={link.href}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${pathname === link.href
                                    ? "text-[#0ea5e9] bg-sky-50"
                                    : "text-gray-500 hover:text-navy hover:bg-gray-50"
                                }`}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Integrated Search Bar (Desktop) */}
                <div className="hidden xl:flex flex-1 max-w-md bg-sky-50/80 rounded-xl flex-row items-center h-10 ml-auto overflow-hidden border border-sky-100 hover:border-sky-200 transition-colors">
                    <div className="flex items-center px-3 flex-1 h-full">
                        <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                        <input
                            className="w-full border-none focus:ring-0 text-sm text-gray-800 bg-transparent placeholder:text-gray-400 font-medium h-full outline-none"
                            placeholder="Search experts, universities..."
                            type="text"
                        />
                    </div>
                    <button className="bg-[#0ea5e9] hover:bg-[#0284c7] px-4 h-full flex items-center justify-center transition-colors">
                        <Search className="w-4 h-4 text-white" />
                    </button>
                </div>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-3 ml-auto lg:ml-4 shrink-0">
                    <button className="relative p-2 hover:bg-gray-50 rounded-xl transition-colors">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <Link href="/login"
                        className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white font-bold px-5 py-2 rounded-xl hover:shadow-lg hover:shadow-sky-200 transition-all text-sm active:scale-[0.97]">
                        Sign In / Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="lg:hidden ml-auto p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="w-6 h-6 text-navy" /> : <Menu className="w-6 h-6 text-navy" />}
                </button>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[85vh] overflow-y-auto">
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center bg-sky-50 rounded-xl px-3 py-2.5 border border-sky-100">
                            <Search className="w-4 h-4 text-gray-400 mr-2" />
                            <input className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400" placeholder="Search..." type="text" />
                        </div>
                    </div>
                    
                    {/* Main Links */}
                    {mainNavLinks.map(link => (
                        <Link key={link.href} href={link.href}
                            className={`block px-4 py-3.5 border-b border-gray-50 font-semibold text-sm ${pathname === link.href ? "text-[#0ea5e9] bg-sky-50/50" : "text-gray-700 hover:bg-gray-50"
                                } transition-colors`}
                            onClick={() => setIsMobileMenuOpen(false)}>
                            {link.label}
                        </Link>
                    ))}

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
                            <span>Events</span>
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

                    {secondaryNavLinks.map(link => (
                        <Link key={link.href} href={link.href}
                            className={`block px-4 py-3.5 border-b border-gray-50 font-semibold text-sm ${pathname === link.href ? "text-[#0ea5e9] bg-sky-50/50" : "text-gray-700 hover:bg-gray-50"
                                } transition-colors`}
                            onClick={() => setIsMobileMenuOpen(false)}>
                            {link.label}
                        </Link>
                    ))}

                    <div className="p-4">
                        <Link href="/login" className="block text-center py-2.5 bg-[#0ea5e9] text-white rounded-xl font-bold text-sm" onClick={() => setIsMobileMenuOpen(false)}>Sign In / Sign Up</Link>
                    </div>
                </div>
            )}
        </header>
    );
}
