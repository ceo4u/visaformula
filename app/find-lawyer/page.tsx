"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Verified, CheckCircle, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const lawyers = [
    { id: 1, name: "Marcus Thorne", title: "H1-B Specialist, EB-5 Investor", barId: "#US-882941-NY", rating: 4.9, reviews: 142, success: 98, price: 150, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACg-9-3tlUWuf_4g-q31wC6GHqfq7o_4Pq_XwQ7GV1WjHLdgGUocHPwoNHQCkRh17S7Iaexex1susM3oAUtCn0d6EmHiD3edVn0lMaRa-qtNvJsGBSE77Oyqv9zN1hXH-7s-e5J_a-1u5W5VzTgr8SnCbc7HDzuSnDajSwQzqu2bvORvm9gpk23jZ5baQZmwYTgiLNtuOgBtnBoretwQ9NNth8VNd2-zyVNER9kyxVBRdKnv_xS0faZf08ftwvMMFlTRkdtv3wPzr7", specialties: ["H1-B Specialist", "EB-5 Investor", "Green Card"], languages: ["English", "Spanish"] },
    { id: 2, name: "Sarah Jenkins", title: "Express Entry, PNP Program", barId: "#CA-112093-TOR", rating: 5.0, reviews: 89, success: 96, price: 180, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB7StQIgDELHfmuRNxiQeCkHYZx7ple7wsHDY9OhBwedBPYJvR5o1NjYsGY6ieZIeUdeOvJ9vrP66vCBc2SXB8JEQ39JkO-uuUK6jDFdQXCzIX0kDCLim96rVMSG_gq07B0PVroVE882SaSdbXOtxvVj_gFZk3ktghXMcJmnlEGK5wketRYODF8I2LuQgLFV0PFkZyuX2zOyYh2CSvfZN3NfC-K6dnDNNXF6D5WFqmdFHX1qEjrCmgQYnKObGR9y2vqa5K_q3csenE", specialties: ["Express Entry", "PNP Program", "Family Sponsorship"], languages: ["English", "French"] },
    { id: 3, name: "David Chen", title: "Student Visas, Work Permits", barId: "#AU-554210-SYD", rating: 4.8, reviews: 210, success: 94, price: 130, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmDsGHt81YPmyNbrGnT1bqUcS1Jr5x-8twNhzp-mkwtsr0D4Qi2xu9ny37Cr7psjC7IfPzBPaoHrwPTXpvnnqRONz0fLRhjMsuhLAlaoPiC3fbnYO_ZZbbZqGuxiKs0Yc4-r3KX8hUFgYGviCb9buHviLn4rS1Fk_F6Uyx_cBz52n4CIr2n8YsBphmaIlsY3ClsiJihqjNvJC7dTlvWPskn2D9y0tbte8jv7Dj-u50ZPXVK3GAvZNssB72wpmvFe_bFHddxHzU1vKl", specialties: ["Student Visas", "Work Permits", "Appeals"], languages: ["English", "Mandarin"] },
];

export default function FindLawyerPage() {
    const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState(250);

    return (
        <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
            <div className="mb-12">
                <h1 className="text-[2.75rem] md:text-5xl font-bold tracking-tight mb-2 leading-tight">Find Your Immigration Expert</h1>
                <p className="text-lg text-on-surface-variant max-w-2xl">
                    Browse verified lawyers and legal consultants specializing in global migration, student visas, and permanent residency.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Sidebar Filters */}
                <aside className="hidden lg:block lg:col-span-3 space-y-8">
                    <div className="bg-surface-container-low p-6 rounded-2xl">
                        <h3 className="font-bold text-lg mb-6">Filters</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-3">Country Expertise</label>
                                <select className="w-full bg-surface-container-lowest border-none rounded-xl text-sm focus:ring-2 focus:ring-primary h-12 px-4">
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>United Kingdom</option>
                                    <option>Australia</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-3">Service Type</label>
                                <div className="space-y-2">
                                    {["Skilled Worker Visa", "Student Permits", "Asylum / Refugee"].map((type) => (
                                        <label key={type} className="flex items-center gap-3 text-sm">
                                            <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" defaultChecked={type === "Skilled Worker Visa"} /> {type}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-3">Fee Range (USD)</label>
                                <input type="range" min="50" max="500" value={priceRange} onChange={(e) => setPriceRange(parseInt(e.target.value))} className="w-full accent-primary" />
                                <div className="flex justify-between text-xs font-medium text-on-surface-variant mt-2">
                                    <span>$50</span>
                                    <span>${priceRange}+</span>
                                </div>
                            </div>
                            <Button className="w-full bg-tertiary hover:opacity-90 font-bold py-3 text-white rounded-xl">Apply Filters</Button>
                        </div>
                    </div>
                </aside>

                {/* Lawyer Listings */}
                <div className="lg:col-span-9 space-y-6">
                    {lawyers.map((lawyer, idx) => (
                        <motion.div key={lawyer.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_12px_40px_rgba(19,27,46,0.04)] hover:shadow-[0_12px_40px_rgba(19,27,46,0.08)] transition-all">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="relative shrink-0">
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
                                            <img src={lawyer.image} alt={lawyer.name} className="object-cover w-full h-full" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-tertiary text-white p-1 rounded-full border-4 border-white">
                                            <Verified className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h2 className="text-xl font-bold">{lawyer.name}</h2>
                                                    <span className="bg-secondary-fixed text-on-secondary-container text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">VERIFIED</span>
                                                </div>
                                                <p className="text-on-surface-variant text-sm mt-1">BAR ID: {lawyer.barId}</p>
                                            </div>
                                            <div className="text-right md:text-right">
                                                <p className="text-2xl font-black text-primary">${lawyer.price}<span className="text-sm font-normal text-on-surface-variant">/hr</span></p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {lawyer.specialties.map((spec) => (
                                                <span key={spec} className="bg-surface-container-low px-3 py-1 rounded-lg text-xs font-medium">{spec}</span>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 py-4 border-y border-outline-variant/10">
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                <span className="text-sm font-bold">{lawyer.rating} <span className="font-normal text-on-surface-variant">({lawyer.reviews})</span></span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-tertiary" />
                                                <span className="text-sm font-bold text-tertiary">{lawyer.success}% Success</span>
                                            </div>
                                            <div className="hidden md:flex items-center gap-2">
                                                <span className="material-symbols-outlined text-on-surface-variant">translate</span>
                                                <span className="text-sm font-medium">{lawyer.languages.join(", ")}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mt-6">
                                            <button className="flex-1 bg-surface-container-highest text-on-surface py-3 rounded-xl font-bold text-sm hover:bg-outline-variant/30 transition-colors">
                                                View Profile
                                            </button>
                                            <button className="flex-1 bg-tertiary text-white py-3 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Pagination */}
                    <div className="flex items-center justify-between pt-12 border-t border-outline-variant/20">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/30 font-bold hover:bg-surface-container-low transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Previous
                        </button>
                        <div className="hidden md:flex gap-2">
                            <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold">1</button>
                            <button className="w-10 h-10 rounded-lg font-bold hover:bg-surface-container-low">2</button>
                            <button className="w-10 h-10 rounded-lg font-bold hover:bg-surface-container-low">3</button>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/30 font-bold hover:bg-surface-container-low transition-colors">
                            Next <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
