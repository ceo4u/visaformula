"use client";

import Link from "next/link";
import { Search, MapPin, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 flex items-center px-4 md:px-6 h-14 w-full bg-[#0ea5e9] text-white">
            <div className="flex items-center gap-6 w-full justify-between lg:justify-start">
                <Link href="/" className="flex items-center gap-1 group shrink-0">
                    <span className="text-2xl font-bold tracking-tight text-white">visara</span>
                </Link>

                {/* Integrated Search Bar (Desktop) */}
                <div className="hidden lg:flex flex-1 max-w-2xl bg-white rounded flex-row items-center border border-transparent focus-within:border-white focus-within:shadow-md transition-shadow h-10 ml-4">
                    <div className="flex items-center px-3 border-r border-gray-200 flex-1 h-full">
                        <input
                            className="w-full border-none focus:ring-0 text-sm text-gray-800 bg-transparent placeholder:text-gray-500 font-medium h-full outline-none"
                            placeholder="Find experts, universities, jobs, tours..."
                            type="text"
                        />
                    </div>
                    <div className="flex items-center px-3 flex-[0.5] h-full border-r border-gray-200">
                        <MapPin className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
                        <input
                            className="w-full border-none focus:ring-0 text-sm text-gray-800 bg-transparent placeholder:text-gray-500 font-medium h-full outline-none"
                            placeholder="Location"
                            type="text"
                        />
                    </div>
                    <button className="bg-primary hover:bg-[#0284c7] px-4 h-full flex items-center justify-center rounded-r transition-colors">
                        <Search className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div className="flex lg:hidden items-center ml-auto">
                    <button className="p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <Menu className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-4 whitespace-nowrap ml-6 flex-shrink-0">
                <Link
                    href="/signup/seeker"
                    className="text-white hover:text-white/80 font-medium text-sm transition-colors"
                >
                    Register as Seeker
                </Link>
                <div className="w-px h-4 bg-white/30"></div>
                <Link
                    href="/signup/expert"
                    className="text-white hover:text-white/80 font-medium text-sm transition-colors"
                >
                    Register as Expert
                </Link>
                <Link
                    href="/login"
                    className="text-white hover:text-white/80 font-medium text-sm transition-colors ml-2"
                >
                    Log In
                </Link>
                <Link
                    href="/signup"
                    className="bg-transparent border border-white text-white font-medium px-4 py-1.5 rounded hover:bg-white hover:text-primary transition-colors text-sm"
                >
                    Sign Up
                </Link>
            </div>

            {/* Mobile menu (simple implementation for now) */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-14 left-0 w-full bg-white text-black border-b border-gray-200 flex flex-col shadow-lg">
                    <Link href="/signup/seeker" className="px-4 py-3 border-b border-gray-100 font-medium">Register as Seeker</Link>
                    <Link href="/signup/expert" className="px-4 py-3 border-b border-gray-100 font-medium">Register as Expert</Link>
                    <Link href="/login" className="px-4 py-3 border-b border-gray-100 font-medium">Log In</Link>
                    <Link href="/signup" className="px-4 py-3 font-medium text-primary">Sign Up</Link>
                </div>
            )}
        </header>
    );
}
