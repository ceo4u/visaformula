"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Search, Verified, CheckCircle, Circle, Headset, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function VisaFinderPage() {
    const [formData, setFormData] = useState({
        destination: "Canada",
        visaType: "Student Visa",
        education: "Master's Degree",
        experience: "3 - 5 Years",
        budget: 5000,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle eligibility check
    };

    return (
        <div className="pt-24 pb-32 px-4 md:px-12 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <h1 className="text-[2.75rem] font-bold leading-tight tracking-tight text-on-surface mb-4">
                    Check Your <span className="text-primary">Visa Eligibility</span>
                </h1>
                <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                    Our AI-driven diplomat analyzes thousands of global migration policies to find your optimal path in seconds.
                </p>
            </motion.div>

            <div className="bg-surface-container-low p-8 rounded-[2rem] relative overflow-hidden mb-16">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-on-surface-variant ml-1">Destination Country</label>
                            <div className="relative">
                                <select
                                    value={formData.destination}
                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    className="w-full h-14 pl-4 pr-10 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary/20 appearance-none text-on-surface font-medium"
                                >
                                    <option>Canada</option>
                                    <option>Australia</option>
                                    <option>United Kingdom</option>
                                    <option>Germany</option>
                                    <option>USA</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-on-surface-variant ml-1">Visa Type</label>
                            <div className="relative">
                                <select
                                    value={formData.visaType}
                                    onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                                    className="w-full h-14 pl-4 pr-10 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary/20 appearance-none text-on-surface font-medium"
                                >
                                    <option>Student Visa</option>
                                    <option>Skilled Worker</option>
                                    <option>Family Sponsorship</option>
                                    <option>Digital Nomad</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-on-surface-variant ml-1">Education Level</label>
                            <div className="relative">
                                <select
                                    value={formData.education}
                                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                    className="w-full h-14 pl-4 pr-10 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary/20 appearance-none text-on-surface font-medium"
                                >
                                    <option>Master's Degree</option>
                                    <option>Bachelor's Degree</option>
                                    <option>Ph.D.</option>
                                    <option>High School</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-on-surface-variant ml-1">Work Experience</label>
                            <div className="relative">
                                <select
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    className="w-full h-14 pl-4 pr-10 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary/20 appearance-none text-on-surface font-medium"
                                >
                                    <option>0 - 2 Years</option>
                                    <option>3 - 5 Years</option>
                                    <option>5 - 10 Years</option>
                                    <option>10+ Years</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-on-surface-variant ml-1">Planned Budget (USD)</label>
                            <span className="text-primary font-bold">$0 - ${formData.budget.toLocaleString()}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            step="500"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                            className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-outline font-medium">
                            <span>$0</span>
                            <span>$5,000</span>
                            <span>$10,000+</span>
                        </div>
                    </div>

                    <button type="submit" className="w-full h-16 bg-gradient-to-r from-primary to-primary-fixed text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <Search className="w-5 h-5" /> Check Eligibility
                    </button>
                </form>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Verified className="w-6 h-6 text-primary" /> Your Personalized Analysis
                </h2>
                <div className="bg-surface-container-lowest p-8 rounded-[2rem] border-none shadow-[0_12px_40px_rgba(19,27,46,0.06)]">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 mb-8">
                        <div className="flex gap-4">
                            <div className="w-14 h-14 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary">
                                <Verified className="w-8 h-8" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-tertiary tracking-widest uppercase">Eligible Visa Type</span>
                                <h3 className="text-2xl font-bold text-on-surface leading-tight">Canada Student Visa Subclass 500</h3>
                            </div>
                        </div>
                        <div className="bg-surface-container-low px-4 py-2 rounded-full inline-flex items-center gap-2 self-start">
                            <div className="w-2 h-2 rounded-full bg-tertiary" />
                            <span className="text-sm font-bold">Risk Level: Low</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
                        <div className="space-y-3">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-sm font-bold text-on-surface-variant">Success Chance</span>
                                <span className="text-2xl font-black text-primary">78%</span>
                            </div>
                            <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                                <div className="h-full bg-[#40c2fd] rounded-full" style={{ width: "78%" }} />
                            </div>
                            <p className="text-xs text-on-surface-variant font-medium">Based on your academic profile and financial stability.</p>
                        </div>
                        <div className="bg-surface-container-low p-6 rounded-2xl">
                            <h4 className="text-sm font-bold mb-4 flex items-center text-on-surface-variant gap-2">
                                <FileText className="w-4 h-4" /> Required Documents (8)
                            </h4>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle className="w-4 h-4 text-tertiary" /> Valid Passport</li>
                                <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle className="w-4 h-4 text-tertiary" /> Letter of Acceptance</li>
                                <li className="flex items-center gap-2 text-sm font-medium"><CheckCircle className="w-4 h-4 text-tertiary" /> Financial Statements</li>
                                <li className="flex items-center gap-2 text-sm font-medium text-on-surface-variant"><Circle className="w-4 h-4 text-outline" /> Police Clearance</li>
                            </ul>
                            <Button variant="link" className="mt-4 p-0 text-primary text-xs font-bold hover:underline">View All 8 Requirements</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="h-14 bg-primary text-white rounded-xl font-bold active:scale-[0.98] transition-all">Apply Now</button>
                        <button className="h-14 bg-surface-container-low text-on-surface rounded-xl font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                            <Headset className="w-5 h-5" /> Talk to Expert
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
