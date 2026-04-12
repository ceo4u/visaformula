"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, UploadCloud, CheckCircle, Store, GraduationCap, Plane, FileText } from "lucide-react";

export default function ExpertSignupPage() {
    const [step, setStep] = useState(1);

    const businessTypes = [
        { id: "law_firm", label: "Immigration Law Firm", icon: Store },
        { id: "consultancy", label: "Consultancy Agency", icon: BriefcaseIcon },
        { id: "education", label: "Education Agent", icon: GraduationCap },
        { id: "tour", label: "Tour Operator", icon: Plane }
    ];

    function BriefcaseIcon(props: any) {
        return (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
        );
    }

    return (
        <div className="bg-[#f5f5f5] min-h-screen flex flex-col text-[#222222]">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight">Visara <span className="text-[#0ea5e9]">for Business</span></Link>
                <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-[#0ea5e9] transition-colors">Log in</Link>
            </div>

            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <div className="bg-white max-w-[650px] w-full rounded-[8px] border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-8">

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 px-2">
                            <span>Business Info</span>
                            <span>Verification</span>
                            <span>Services</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
                            <div className={`h-full bg-[#0ea5e9] transition-all duration-300 w-${step === 1 ? '1/3' : step === 2 ? '2/3' : 'full'}`} style={{ width: `${(step / 3) * 100}%` }}></div>
                        </div>
                    </div>

                    {step > 1 && (
                        <button onClick={() => setStep(step - 1)} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </button>
                    )}

                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h1 className="text-2xl font-bold mb-2">Claim your listing on Visara</h1>
                            <p className="text-gray-500 mb-6 text-sm">Join thousands of experts growing their business. First, tell us about your practice.</p>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Business Name</label>
                                    <input type="text" className="w-full border border-gray-300 rounded p-2.5 text-sm outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]" placeholder="e.g. Aristha Law Group" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Work Email</label>
                                        <input type="email" className="w-full border border-gray-300 rounded p-2.5 text-sm outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]" placeholder="contact@business.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Phone Number</label>
                                        <input type="tel" className="w-full border border-gray-300 rounded p-2.5 text-sm outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]" placeholder="(555) 123-4567" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Business Type</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {businessTypes.map((type) => (
                                            <label key={type.id} className="relative cursor-pointer">
                                                <input type="radio" name="business_type" value={type.id} className="peer sr-only" />
                                                <div className="border border-gray-200 rounded p-3 text-sm font-bold text-gray-700 peer-checked:border-[#0ea5e9] peer-checked:bg-sky-50 hover:bg-gray-50 transition-colors flex items-center gap-2">
                                                    <type.icon className="w-5 h-5 text-gray-400 peer-checked:text-[#0ea5e9]" />
                                                    {type.label}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h1 className="text-2xl font-bold mb-2">Verify your business</h1>
                            <p className="text-gray-500 mb-6 text-sm">To maintain platform trust, we require verified credentials from all experts.</p>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold mb-1">License / Registration Number</label>
                                    <input type="text" className="w-full border border-gray-300 rounded p-2.5 text-sm outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]" placeholder="e.g. BAR #123456" />
                                    <p className="text-xs text-gray-500 mt-1">This will be shown on your public profile with a 'Verified' badge.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2">Upload Certificates or ID</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer block group">
                                        <div className="bg-sky-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#0ea5e9] transition-colors">
                                            <UploadCloud className="w-6 h-6 text-[#0ea5e9] group-hover:text-white transition-colors" />
                                        </div>
                                        <p className="text-sm font-bold text-gray-700">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG (max 10MB)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h1 className="text-2xl font-bold mb-2">What services do you offer?</h1>
                            <p className="text-gray-500 mb-6 text-sm">Select the areas where you help clients.</p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-sm mb-3">Immigration Options</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["Employment Visas", "Family & Marriage", "Student Visas", "Asylum & Refugee", "Investor Visas", "Citizenship", "Appeals & Deportation"].map((srv) => (
                                            <label key={srv} className="relative cursor-pointer">
                                                <input type="checkbox" className="peer sr-only" />
                                                <div className="px-3 py-1.5 border border-gray-300 rounded-[20px] text-sm font-medium text-gray-600 peer-checked:border-[#0ea5e9] peer-checked:bg-[#0ea5e9] peer-checked:text-white hover:bg-gray-50 peer-checked:hover:bg-[#0284c7] transition-colors">
                                                    {srv}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-sm mb-3">Target Regions (Where do you send clients?)</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["USA", "Canada", "UK & Ireland", "Australia", "New Zealand", "EU & Schengen limit", "Middle East"].map((reg) => (
                                            <label key={reg} className="relative cursor-pointer">
                                                <input type="checkbox" className="peer sr-only" />
                                                <div className="px-3 py-1.5 border border-gray-300 rounded-[20px] text-sm font-medium text-gray-600 peer-checked:border-[#0ea5e9] peer-checked:bg-[#0ea5e9] peer-checked:text-white hover:bg-gray-50 peer-checked:hover:bg-[#0284c7] transition-colors">
                                                    {reg}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-[8px] text-sm text-green-800 flex gap-3">
                                <FileText className="w-5 h-5 shrink-0 text-green-600" />
                                <div>
                                    <span className="font-bold block mb-1">Final Step!</span>
                                    After submission, our team will review your credentials within 24 hours. Your profile will go live once verified.
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
                        {step < 3 ? (
                            <button onClick={() => setStep(step + 1)} className="flex-1 bg-[#0ea5e9] text-white py-3 rounded font-bold hover:bg-[#0284c7] transition-colors flex justify-center items-center shadow-sm">
                                Next <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        ) : (
                            <button onClick={() => window.location.href = "/"} className="flex-1 bg-[#0ea5e9] text-white py-3 rounded font-bold hover:bg-[#0284c7] transition-colors shadow">
                                Submit for Verification
                            </button>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
