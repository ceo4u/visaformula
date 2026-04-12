"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, CheckCircle, Globe, GraduationCap, Briefcase, Plane, Home } from "lucide-react";

export default function SeekerSignupPage() {
    const [step, setStep] = useState(1);

    const goals = [
        { id: "study", icon: GraduationCap, label: "Study Abroad" },
        { id: "work", icon: Briefcase, label: "Work Overseas" },
        { id: "visit", icon: Plane, label: "Visit / Tourist" },
        { id: "settle", icon: Home, label: "Settle Permanently" }
    ];

    return (
        <div className="bg-[#f5f5f5] min-h-screen flex flex-col text-[#222222]">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
                <Link href="/" className="font-bold text-xl tracking-tight">Visara.</Link>
                <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-[#0ea5e9] transition-colors">Log in instead</Link>
            </div>

            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <div className="bg-white max-w-[600px] w-full rounded-[8px] border border-gray-200 shadow-sm p-8">

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                            <span>Personal Info</span>
                            <span>Your Goals</span>
                            <span>Destinations</span>
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
                            <h1 className="text-2xl font-bold mb-2">Let's get started</h1>
                            <p className="text-gray-500 mb-6 text-sm">Create an account to explore immigration options and connect with experts.</p>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-1">First Name</label>
                                        <input type="text" className="w-full border border-gray-300 rounded p-2.5 text-sm outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Last Name</label>
                                        <input type="text" className="w-full border border-gray-300 rounded p-2.5 text-sm outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]" placeholder="Doe" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Email Address</label>
                                    <input type="email" className="w-full border border-gray-300 rounded p-2.5 text-sm outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Password</label>
                                    <input type="password" className="w-full border border-gray-300 rounded p-2.5 text-sm outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]" placeholder="••••••••" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Passport Country</label>
                                    <div className="relative">
                                        <Globe className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <select className="w-full border border-gray-300 rounded p-2.5 pl-10 text-sm outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] appearance-none bg-transparent">
                                            <option>Select a country</option>
                                            <option>India</option>
                                            <option>Nigeria</option>
                                            <option>Philippines</option>
                                            <option>Brazil</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h1 className="text-2xl font-bold mb-2">What is your primary goal?</h1>
                            <p className="text-gray-500 mb-6 text-sm">Select all that apply to help us personalize your experience.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {goals.map((goal) => (
                                    <label key={goal.id} className="relative cursor-pointer group">
                                        <input type="checkbox" className="peer sr-only" name="goal" value={goal.id} />
                                        <div className="p-4 border-2 border-gray-200 rounded-[8px] peer-checked:border-[#0ea5e9] peer-checked:bg-sky-50 hover:bg-gray-50 transition-colors flex flex-col items-center text-center gap-2">
                                            <goal.icon className="w-8 h-8 text-gray-500 peer-checked:text-[#0ea5e9] group-hover:scale-110 transition-transform" />
                                            <span className="font-bold text-sm text-gray-700 peer-checked:text-[#0ea5e9]">{goal.label}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h1 className="text-2xl font-bold mb-2">Where do you want to go?</h1>
                            <p className="text-gray-500 mb-6 text-sm">Select top destinations you are interested in.</p>

                            <div className="flex flex-wrap gap-3">
                                {["Canada", "USA", "UK", "Australia", "New Zealand", "Germany", "France", "Spain", "Singapore", "UAE"].map((country) => (
                                    <label key={country} className="relative cursor-pointer">
                                        <input type="checkbox" className="peer sr-only" />
                                        <div className="px-4 py-2 border-2 border-gray-200 rounded-[20px] text-sm font-bold text-gray-600 peer-checked:border-[#0ea5e9] peer-checked:bg-[#0ea5e9] peer-checked:text-white hover:border-gray-300 transition-colors">
                                            {country}
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded text-sm text-blue-800 flex gap-3">
                                <CheckCircle className="w-5 h-5 shrink-0 text-blue-600" />
                                <div>
                                    You're almost done! We will tailor experts and opportunities based on your selections.
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        {step < 3 ? (
                            <button onClick={() => setStep(step + 1)} className="w-full bg-[#0ea5e9] text-white py-3 rounded font-bold hover:bg-[#0284c7] transition-colors flex justify-center items-center">
                                Next <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        ) : (
                            <button onClick={() => window.location.href = "/"} className="w-full bg-[#0ea5e9] text-white py-3 rounded font-bold hover:bg-[#0284c7] transition-colors shadow">
                                Complete Registration
                            </button>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
