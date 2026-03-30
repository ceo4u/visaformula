"use client";

import { Home, Search, FileText, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 w-full rounded-t-2xl z-50 md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-around items-center pt-3 pb-8 px-4">
                <Link className={`flex flex-col items-center gap-1 ${pathname === "/" ? "text-primary" : "text-slate-500 hover:text-primary"} transition-colors`} href="/">
                    <Home className={`w-6 h-6 ${pathname === "/" ? "fill-primary/20" : ""}`} />
                    <span className="text-[11px] font-semibold">Home</span>
                </Link>
                <Link className={`flex flex-col items-center gap-1 ${pathname?.includes("/visa-finder") ? "text-primary" : "text-slate-500 hover:text-primary"} transition-colors`} href="/visa-finder">
                    <Search className="w-6 h-6" />
                    <span className="text-[11px] font-semibold">Search</span>
                </Link>
                <Link className={`flex flex-col items-center gap-1 ${pathname?.includes("/dashboard") ? "text-primary" : "text-slate-500 hover:text-primary"} transition-colors`} href="/dashboard">
                    <FileText className="w-6 h-6" />
                    <span className="text-[11px] font-semibold">Apps</span>
                </Link>
                <Link className={`flex flex-col items-center gap-1 ${pathname?.includes("/about") || pathname?.includes("/support") ? "text-primary" : "text-slate-500 hover:text-primary"} transition-colors`} href="/support">
                    <User className="w-6 h-6" />
                    <span className="text-[11px] font-semibold">Profile</span>
                </Link>
            </div>
        </nav>
    );
}
