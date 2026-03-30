"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VisaDropdownProps {
    className?: string;
}

export function VisaDropdown({ className }: VisaDropdownProps) {
    const router = useRouter();
    const [destination, setDestination] = useState("USA");
    const [visaType, setVisaType] = useState("Student");

    const handleCheckEligibility = () => {
        router.push(`/visa-finder?destination=${destination}&type=${visaType}`);
    };

    return (
        <div className={cn("flex flex-col md:flex-row gap-2 p-2 glass-card rounded-2xl shadow-xl", className)}>
            <div className="flex-1 px-4 py-3 flex items-center gap-3 bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-outline">public</span>
                <div className="flex flex-col flex-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-outline">Destination</label>
                    <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="bg-transparent border-none p-0 focus:ring-0 text-on-surface font-semibold w-full"
                    >
                        <option>USA</option>
                        <option>Canada</option>
                        <option>UK</option>
                        <option>Australia</option>
                        <option>Germany</option>
                    </select>
                </div>
            </div>
            <div className="flex-1 px-4 py-3 flex items-center gap-3 bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-outline">badge</span>
                <div className="flex flex-col flex-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-outline">Visa Type</label>
                    <select
                        value={visaType}
                        onChange={(e) => setVisaType(e.target.value)}
                        className="bg-transparent border-none p-0 focus:ring-0 text-on-surface font-semibold w-full"
                    >
                        <option>Student</option>
                        <option>Work</option>
                        <option>Tourist</option>
                        <option>Business</option>
                        <option>PR</option>
                    </select>
                </div>
            </div>
            <Button onClick={handleCheckEligibility} className="bg-[#35ac35] hover:bg-[#2d932d] shadow-lg shadow-green-200">
                Check Eligibility
            </Button>
        </div>
    );
}
