"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Globe, Briefcase, User, Search } from "lucide-react";

interface VisaDropdownProps {
    className?: string;
}

export function VisaDropdown({ className }: VisaDropdownProps) {
    const router = useRouter();
    const [citizen, setCitizen] = useState("India");
    const [destination, setDestination] = useState("USA");
    const [visaType, setVisaType] = useState("Study");

    const handleSearch = () => {
        router.push(`/find-lawyer?citizen=${citizen}&destination=${destination}&type=${visaType}`);
    };

    return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 glass-card rounded-[2rem] md:rounded-[2.5rem] shadow-2xl backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-slate-800/60", className)}>
            <div className="px-5 py-4 flex items-center gap-4 bg-white/90 dark:bg-slate-950/90 hover:bg-white dark:hover:bg-slate-900 transition-colors rounded-2xl shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <User className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                    <label className="text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-0.5 whitespace-nowrap">Citizen of</label>
                    <select
                        value={citizen}
                        onChange={(e) => setCitizen(e.target.value)}
                        className="bg-transparent border-none p-0 focus:ring-0 text-slate-900 dark:text-white font-extrabold text-lg w-full cursor-pointer appearance-none outline-none truncate"
                    >
                        <option>India</option>
                        <option>UAE</option>
                        <option>Nigeria</option>
                        <option>Brazil</option>
                        <option>Philippines</option>
                    </select>
                </div>
            </div>

            <div className="px-5 py-4 flex items-center gap-4 bg-white/90 dark:bg-slate-950/90 hover:bg-white dark:hover:bg-slate-900 transition-colors rounded-2xl shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Globe className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                    <label className="text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-0.5 whitespace-nowrap">Traveling to</label>
                    <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="bg-transparent border-none p-0 focus:ring-0 text-slate-900 dark:text-white font-extrabold text-lg w-full cursor-pointer appearance-none outline-none truncate"
                    >
                        <option>USA</option>
                        <option>Canada</option>
                        <option>UK</option>
                        <option>Australia</option>
                        <option>Germany</option>
                    </select>
                </div>
            </div>

            <div className="px-5 py-4 flex items-center gap-4 bg-white/90 dark:bg-slate-950/90 hover:bg-white dark:hover:bg-slate-900 transition-colors rounded-2xl shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
                    <Briefcase className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                    <label className="text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-0.5 whitespace-nowrap">Visa Type</label>
                    <select
                        value={visaType}
                        onChange={(e) => setVisaType(e.target.value)}
                        className="bg-transparent border-none p-0 focus:ring-0 text-slate-900 dark:text-white font-extrabold text-lg w-full cursor-pointer appearance-none outline-none truncate"
                    >
                        <option>Study</option>
                        <option>Work</option>
                        <option>Tourist</option>
                        <option>Business</option>
                    </select>
                </div>
            </div>

            <Button onClick={handleSearch} className="w-full h-full min-h-[4.5rem] bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-[0_8px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.4)] transition-all font-bold text-lg flex items-center justify-center gap-2 group">
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Find Pros</span>
            </Button>
        </div>
    );
}
