"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmergencyFab() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsVisible(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50"
                >
                    <Link href="/emergency">
                        <button className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-destructive text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200">
                            <AlertTriangle className="w-6 h-6 md:w-7 md:h-7" />
                            <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                Emergency Help 24/7
                            </span>
                        </button>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
