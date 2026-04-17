"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, FileText, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/find-lawyer", label: "Experts", icon: Search },
    { href: "/dashboard", label: "My Visas", icon: FileText },
    { href: "/emergency", label: "Help", icon: LifeBuoy },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-white/95 backdrop-blur-lg h-16 border-t border-sky-100 shadow-[0_-2px_12px_rgba(14,165,233,0.08)]">
            {mobileNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center flex-1 py-2 transition-all duration-150",
                            isActive
                                ? "text-[#0ea5e9] font-bold"
                                : "text-hint"
                        )}
                    >
                        <item.icon className={cn("w-5 h-5", isActive && "scale-110")} />
                        <span className="text-[10px] font-bold mt-0.5">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
