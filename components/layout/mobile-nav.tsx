"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, LayoutDashboard, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/find-lawyer", label: "Search", icon: Search },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/ai-assistant", label: "AI", icon: Bot },
    { href: "/login", label: "Profile", icon: User },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-white dark:bg-neutral-900 h-16 border-t border-neutral-200 dark:border-neutral-800 shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
            {mobileNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center flex-1 py-2 transition-all duration-100",
                            isActive
                                ? "text-primary font-bold"
                                : "text-neutral-500 dark:text-neutral-400"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-[11px] font-bold mt-0.5">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
