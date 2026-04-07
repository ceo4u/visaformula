"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Gavel, LogOut, Loader2 } from "lucide-react";
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
            "fixed top-0 w-full z-50 transition-all duration-300 transform-gpu",
            isScrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}>
            <div className="flex justify-between items-center h-16 px-6 md:px-12 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-2 text-xl font-black">
                    <Gavel className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                    <span className="tracking-tight text-on-surface">VisaHub</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                    ) : user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold truncate max-w-[120px]">
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
                            <Button variant="ghost" asChild>
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b shadow-lg py-4 px-6">
                    <nav className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium py-2 transition-colors",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-2 pt-4 border-t">
                            {loading ? (
                                <div className="py-2 text-center text-sm text-slate-500">Loading...</div>
                            ) : user ? (
                                <>
                                    <div className="flex items-center gap-3 py-2">
                                        {user.photoURL && (
                                            <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
                                        )}
                                        <span className="font-bold text-sm">{user.displayName}</span>
                                    </div>
                                    <Button variant="ghost" onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <LogOut className="w-4 h-4 mr-2" /> Log out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" asChild className="w-full justify-start">
                                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                                    </Button>
                                    <Button asChild className="w-full">
                                        <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
