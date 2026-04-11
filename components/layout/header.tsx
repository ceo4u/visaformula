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
        <header className="sticky top-0 z-50 flex justify-between items-center px-6 h-16 w-full bg-white/90 dark:bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-container-high">
            <div className="flex items-center gap-6 flex-1">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Gavel className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xl font-black tracking-tight text-on-surface">VisaHub</span>
                </Link>

                {/* Integrated Search Bar (Desktop) */}
                <div className="hidden lg:flex flex-1 max-w-xl bg-surface-container-low rounded-full overflow-hidden h-10 border border-surface-container-high transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                    <div className="flex items-center px-3 border-r border-surface-container-highest flex-1 group">
                        <Search className="w-4 h-4 text-on-surface-variant mr-2 group-focus-within:text-primary transition-colors" />
                        <input
                            className="w-full border-none focus:ring-0 text-sm text-on-surface bg-transparent placeholder:text-on-surface-variant font-medium"
                            placeholder="Find lawyers, consultations..."
                            type="text"
                        />
                    </div>
                    <div className="flex items-center px-3 flex-1">
                        <MapPin className="w-4 h-4 text-on-surface-variant mr-2" />
                        <input
                            className="w-full border-none focus:ring-0 text-sm text-on-surface bg-transparent placeholder:text-on-surface-variant font-medium"
                            placeholder="Location"
                            type="text"
                        />
                    </div>
                    <button className="bg-primary hover:bg-primary/80 px-5 flex items-center justify-center transition-colors">
                        <span className="text-white text-xs font-bold tracking-wide">Search</span>
                    </button>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex gap-1 items-center h-full mx-6">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "px-3 py-1.5 text-sm transition-colors duration-200 rounded-full font-semibold",
                                isActive
                                    ? "text-primary bg-primary/10"
                                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
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
                    className="text-on-surface-variant font-bold hover:text-on-surface hover:bg-surface-container-low px-4 py-2 rounded-full transition-colors text-sm hidden md:block"
                >
                    Log in
                </Link>
                <Link
                    href="/signup"
                    className="bg-primary text-white font-bold px-5 py-2 rounded-full hover:bg-primary/80 transition-all text-sm shadow-[0_2px_10px_rgba(36,154,250,0.3)] hover:shadow-[0_4px_14px_rgba(36,154,250,0.4)]"
                >
                    Sign up
                </Link>
            </div>
        </header>
    );
}
