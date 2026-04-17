"use client";

import Link from "next/link";
import { Search, MapPin, Menu, X, Bell, Globe } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/find-lawyer", label: "Find Experts" },
    { href: "/work-permit", label: "Work Permit" },
    { href: "/training", label: "Training Hub" },
    { href: "/emergency", label: "Emergency" },
];

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                <nav className="hidden lg:flex items-center gap-1 ml-6">
                    {navLinks.map(link => (
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
                        className="text-gray-500 hover:text-navy font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all">
                        Log In
                    </Link>
                    <Link href="/signup"
                        className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white font-bold px-5 py-2 rounded-xl hover:shadow-lg hover:shadow-sky-200 transition-all text-sm active:scale-[0.97]">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="lg:hidden ml-auto p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="w-6 h-6 text-navy" /> : <Menu className="w-6 h-6 text-navy" />}
                </button>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center bg-sky-50 rounded-xl px-3 py-2.5 border border-sky-100">
                            <Search className="w-4 h-4 text-gray-400 mr-2" />
                            <input className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400" placeholder="Search..." type="text" />
                        </div>
                    </div>
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href}
                            className={`block px-4 py-3.5 border-b border-gray-50 font-semibold text-sm ${pathname === link.href ? "text-[#0ea5e9] bg-sky-50/50" : "text-gray-700 hover:bg-gray-50"
                                } transition-colors`}
                            onClick={() => setIsMobileMenuOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                    <div className="p-4 flex gap-3">
                        <Link href="/login" className="flex-1 text-center py-2.5 border border-sky-200 text-[#0284c7] rounded-xl font-bold text-sm" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
                        <Link href="/signup" className="flex-1 text-center py-2.5 bg-[#0ea5e9] text-white rounded-xl font-bold text-sm" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                    </div>
                </div>
            )}
        </header>
    );
}
