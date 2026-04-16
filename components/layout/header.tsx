"use client";

import Link from "next/link";
import { Search, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-[#0ea5e9] text-white shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center px-4 md:px-6 h-16 gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-1 group shrink-0">
                    <span className="text-2xl font-extrabold tracking-tight text-white">visara</span>
                </Link>

                {/* Integrated Search Bar (Desktop) */}
                <div className="hidden lg:flex flex-1 max-w-xl bg-white rounded-lg flex-row items-center h-10 ml-4 overflow-hidden shadow-inner">
                    <div className="flex items-center px-3 border-r border-gray-200 flex-1 h-full">
                        <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                        <input
                            className="w-full border-none focus:ring-0 text-sm text-gray-800 bg-transparent placeholder:text-gray-400 font-medium h-full outline-none"
                            placeholder="Find experts, universities, jobs, tours..."
                            type="text"
                        />
                    </div>
                    <div className="flex items-center px-3 flex-[0.45] h-full">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                        <input
                            className="w-full border-none focus:ring-0 text-sm text-gray-800 bg-transparent placeholder:text-gray-400 font-medium h-full outline-none"
                            placeholder="Location"
                            type="text"
                        />
                    </div>
                    <button className="bg-[#0284c7] hover:bg-[#0369a1] px-4 h-full flex items-center justify-center transition-colors">
                        <Search className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Auth Buttons (Desktop) */}
                <nav className="hidden lg:flex items-center gap-3 whitespace-nowrap ml-auto flex-shrink-0">
                    <Link
                        href="/signup/seeker"
                        className="text-white/90 hover:text-white font-semibold text-sm transition-colors"
                    >
                        Register as Seeker
                    </Link>
                    <div className="w-px h-4 bg-white/30"></div>
                    <Link
                        href="/signup/expert"
                        className="text-white/90 hover:text-white font-semibold text-sm transition-colors"
                    >
                        Register as Expert
                    </Link>
                    <Link
                        href="/login"
                        className="text-white/90 hover:text-white font-semibold text-sm transition-colors ml-1"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/signup"
                        className="bg-white text-[#0ea5e9] font-bold px-5 py-2 rounded-lg hover:bg-white/90 transition-all text-sm shadow-sm"
                    >
                        Sign Up
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button className="lg:hidden ml-auto p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                </button>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white text-[#222222] border-t border-gray-200 shadow-xl animate-in slide-in-from-top-2 duration-200">
                    {/* Mobile Search */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200">
                            <Search className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
                                placeholder="Search experts, universities..."
                                type="text"
                            />
                        </div>
                    </div>
                    <Link href="/signup/seeker" className="block px-4 py-3.5 border-b border-gray-100 font-semibold text-sm hover:bg-gray-50 transition-colors">Register as Seeker</Link>
                    <Link href="/signup/expert" className="block px-4 py-3.5 border-b border-gray-100 font-semibold text-sm hover:bg-gray-50 transition-colors">Register as Expert</Link>
                    <Link href="/login" className="block px-4 py-3.5 border-b border-gray-100 font-semibold text-sm hover:bg-gray-50 transition-colors">Log In</Link>
                    <Link href="/signup" className="block px-4 py-3.5 font-bold text-sm text-[#0ea5e9]">Sign Up Free →</Link>
                </div>
            )}
        </header>
    );
}
