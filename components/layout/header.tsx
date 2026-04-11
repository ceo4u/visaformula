"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gavel, Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/find-lawyer", label: "Search" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About" },
    { href: "/support", label: "Support" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center px-6 h-16 w-full bg-primary dark:bg-primary-container shadow-sm">
            <div className="flex items-center gap-6 flex-1">
                <Link href="/" className="flex items-center gap-2">
                    <Gavel className="w-5 h-5 text-white" />
                    <span className="text-2xl font-black tracking-tighter text-white uppercase">VisaHub</span>
                </Link>

                {/* Integrated Search Bar (Desktop) */}
                <div className="hidden lg:flex flex-1 max-w-xl bg-white rounded-lg overflow-hidden h-10 shadow-inner">
                    <div className="flex items-center px-3 border-r border-neutral-200 flex-1">
                        <Search className="w-4 h-4 text-neutral-400 mr-2" />
                        <input
                            className="w-full border-none focus:ring-0 text-sm text-on-surface bg-transparent placeholder:text-neutral-400"
                            placeholder="Lawyers, Consultations..."
                            type="text"
                        />
                    </div>
                    <div className="flex items-center px-3 flex-1">
                        <MapPin className="w-4 h-4 text-neutral-400 mr-2" />
                        <input
                            className="w-full border-none focus:ring-0 text-sm text-on-surface bg-transparent placeholder:text-neutral-400"
                            placeholder="Location"
                            type="text"
                        />
                    </div>
                    <button className="bg-primary/90 hover:bg-primary-container px-4 flex items-center justify-center transition-colors">
                        <Search className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex gap-1 items-center h-full mr-4">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "px-3 py-1.5 text-sm transition-colors duration-100 rounded",
                                isActive
                                    ? "text-white font-bold border-b-2 border-white"
                                    : "text-blue-100 hover:bg-white/10"
                            )}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
                <Link
                    href="/login"
                    className="text-white font-bold hover:bg-white/10 px-4 py-2 rounded-lg transition-colors text-sm hidden md:block"
                >
                    Log In
                </Link>
                <Link
                    href="/signup"
                    className="bg-white text-primary font-bold px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors text-sm"
                >
                    Sign Up
                </Link>
            </div>
        </header>
    );
}
