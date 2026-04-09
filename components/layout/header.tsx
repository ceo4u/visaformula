"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Gavel, LogOut, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Find Lawyer", href: "/find-lawyer" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "About", href: "/about" },
    { name: "Support", href: "/support" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user, loading, signOut } = useAuth();

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 transform-gpu border-b",
            isScrolled
                ? "bg-white/80 backdrop-blur-2xl border-slate-200/60 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]"
                : "bg-white/80 backdrop-blur-2xl border-slate-200/60"
        )}>
            <div className="flex justify-between items-center h-20 px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group transition-transform duration-300 active:scale-95 shrink-0 z-20">
                    <Gavel className="w-6 h-6 text-[#5B58F6]" />
                    <span className="text-xl font-medium tracking-tight text-slate-900">VisaHub</span>
                </Link>

                {/* Center pill nav */}
                <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center z-10">
                    <div className="flex items-center p-1 border border-slate-200/80 bg-white/80 backdrop-blur-md rounded-full shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-5 py-2 text-sm font-medium rounded-full transition-all duration-200",
                                    pathname === item.href
                                        ? "bg-[#5B58F6]/10 text-[#5B58F6]"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Right actions */}
                <div className="hidden lg:flex gap-3 items-center ml-auto z-20">
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                    ) : user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-600 truncate max-w-[120px]">
                                {user.displayName}
                            </span>
                            {user.photoURL && (
                                <img src={user.photoURL} alt={user.displayName} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                            )}
                            <Button variant="ghost" size="icon" onClick={() => signOut()} className="text-slate-500 hover:text-red-500">
                                <LogOut className="w-5 h-5" />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-[#5B58F6] transition-colors px-2">
                                Client Login
                            </Link>
                            <Link
                                href="/signup"
                                className="group inline-flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#5B58F6] hover:shadow-[0_8px_20px_-6px_rgba(91,88,246,0.4)] hover:-translate-y-0.5 px-6 text-sm font-medium text-white bg-slate-900 h-11 rounded-full"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Burger */}
                <button
                    className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors active:scale-95"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={cn(
                "lg:hidden overflow-hidden transition-all duration-300 ease-out",
                isMobileMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="pb-5 pt-2 px-6">
                    <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-[0_12px_30px_-12px_rgba(15,23,42,0.08)] p-3 flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-4 py-3 text-sm font-medium rounded-2xl transition-colors",
                                    pathname === item.href ? "bg-[#5B58F6]/10 text-[#5B58F6]" : "text-slate-700 hover:bg-slate-100"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-slate-200/60">
                            {loading ? (
                                <div className="py-2 text-center text-sm text-slate-500">Loading...</div>
                            ) : user ? (
                                <>
                                    <div className="flex items-center gap-3 px-4 py-2">
                                        {user.photoURL && (
                                            <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
                                        )}
                                        <span className="font-medium text-sm text-slate-800">{user.displayName}</span>
                                    </div>
                                    <button
                                        onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                                        className="px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-2xl transition-colors text-left flex items-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" /> Log out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-2xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        Client Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="mx-1 py-3 text-sm font-medium text-white bg-slate-900 hover:bg-[#5B58F6] rounded-2xl transition-colors text-center"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
