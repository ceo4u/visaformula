"use client";
import { useState } from "react";
import { CheckCircle, ArrowLeft, ArrowRight, Upload, Plus, X, User, FileText, DollarSign } from "lucide-react";

const specializations = ["Express Entry", "H-1B", "Study Visa", "Work Permit", "Family Visa", "PR", "Visa Appeal", "Asylum", "Business Immigration", "LMIA"];
const allCountries = ["USA", "Canada", "UK", "Australia", "Germany", "New Zealand", "Ireland", "Singapore", "UAE"];

export default function ExpertSignupPage() {
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [yearsExp, setYearsExp] = useState("");
    const [bio, setBio] = useState("");
    const [licenceNo, setLicenceNo] = useState("");
    const [services, setServices] = useState([{ name: "Initial Consultation (30 min)", price: "2500" }]);
    const [submitted, setSubmitted] = useState(false);

    const toggleItem = (item: string, list: string[], setList: (l: string[]) => void) => {
        setList(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
    };

    const addService = () => setServices([...services, { name: "", price: "" }]);
    const removeService = (i: number) => setServices(services.filter((_, idx) => idx !== i));

    if (submitted) {
        return (
            <div className="bg-[#f0f4f8] min-h-screen flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl border border-sky-100 shadow-card p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="font-sora text-2xl font-extrabold text-navy mb-2">Application Submitted!</h1>
                    <p className="text-gray-500 text-sm mb-4">Your expert profile is under review. You&apos;ll hear from us in 24-48 hours.</p>
                    <div className="bg-sky-50 rounded-xl p-4 text-left text-sm space-y-1 mb-6">
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Specializations:</strong> {selectedSpecs.join(", ")}</p>
                    </div>
                    <a href="/" className="inline-block bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">Return Home</a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f0f4f8] min-h-screen py-10 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="font-sora text-2xl font-bold text-navy mb-2 text-center">Register as Expert</h1>
                <p className="text-sm text-gray-500 text-center mb-8">Join Visara and reach thousands of visa seekers worldwide.</p>

                {/* Progress Bar */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    {[
                        { num: 1, label: "Basic Info", icon: User },
                        { num: 2, label: "Credentials", icon: FileText },
                        { num: 3, label: "Pricing", icon: DollarSign },
                    ].map((s, i) => (
                        <div key={s.num} className="flex items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step > s.num ? "bg-emerald-500 text-white" :
                                    step === s.num ? "bg-[#0ea5e9] text-white shadow-lg shadow-sky-200" :
                                        "bg-gray-100 text-gray-400"
                                }`}>
                                {step > s.num ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
                            </div>
                            <span className={`text-xs font-semibold hidden sm:block ${step >= s.num ? "text-navy" : "text-gray-400"}`}>{s.label}</span>
                            {i < 2 && <div className={`w-10 h-[3px] rounded-full mx-1 ${step > s.num ? "bg-emerald-400" : "bg-gray-200"}`} />}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl border border-sky-100 shadow-card p-6 md:p-8">
                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <div className="space-y-5">
                            <h2 className="font-sora text-lg font-bold text-navy mb-4">Basic Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Full Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. John Smith" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="john@firm.com" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Phone</label>
                                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 99999 99999" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Years of Experience</label>
                                    <input value={yearsExp} onChange={(e) => setYearsExp(e.target.value)} type="number" placeholder="5" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Specializations</label>
                                <div className="flex flex-wrap gap-2">
                                    {specializations.map(s => (
                                        <button key={s} onClick={() => toggleItem(s, selectedSpecs, setSelectedSpecs)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedSpecs.includes(s) ? "bg-[#0ea5e9] text-white" : "bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100"}`}>{s}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Countries Covered</label>
                                <div className="flex flex-wrap gap-2">
                                    {allCountries.map(c => (
                                        <button key={c} onClick={() => toggleItem(c, selectedCountries, setSelectedCountries)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedCountries.includes(c) ? "bg-navy text-white" : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"}`}>{c}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Bio</label>
                                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Tell prospective clients about your expertise..."
                                    className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] resize-none" />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Credentials */}
                    {step === 2 && (
                        <div className="space-y-5">
                            <h2 className="font-sora text-lg font-bold text-navy mb-4">Credentials & Verification</h2>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Licence / Registration Number</label>
                                <input value={licenceNo} onChange={(e) => setLicenceNo(e.target.value)} placeholder="BAR/2020/12345" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Government ID Document</label>
                                <div className="border-2 border-dashed border-sky-200 rounded-xl p-8 text-center hover:bg-sky-50/50 transition-colors cursor-pointer">
                                    <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500 font-medium">Drop your ID here or click to upload</p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG · Max 10MB</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Professional Certificate</label>
                                <div className="border-2 border-dashed border-sky-200 rounded-xl p-8 text-center hover:bg-sky-50/50 transition-colors cursor-pointer">
                                    <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500 font-medium">Drop certificate here or click to upload</p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG · Max 10MB</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Pricing */}
                    {step === 3 && (
                        <div className="space-y-5">
                            <h2 className="font-sora text-lg font-bold text-navy mb-4">Pricing & Services</h2>
                            <div className="space-y-3">
                                {services.map((s, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <input value={s.name} onChange={(e) => { const copy = [...services]; copy[i].name = e.target.value; setServices(copy); }}
                                            placeholder="Service name" className="flex-1 p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                            <input value={s.price} onChange={(e) => { const copy = [...services]; copy[i].price = e.target.value; setServices(copy); }}
                                                placeholder="Price" className="w-28 pl-7 p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                                        </div>
                                        {services.length > 1 && <button onClick={() => removeService(i)} className="text-red-400 hover:text-red-500"><X className="w-4 h-4" /></button>}
                                    </div>
                                ))}
                                <button onClick={addService} className="w-full py-2.5 border-2 border-dashed border-sky-200 text-[#0ea5e9] font-bold text-sm rounded-xl hover:bg-sky-50 transition-colors flex items-center justify-center gap-1">
                                    <Plus className="w-4 h-4" /> Add Service
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                        {step > 1 ? (
                            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-navy transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                        ) : <div />}
                        {step < 3 ? (
                            <button onClick={() => setStep(step + 1)} className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2 active:scale-[0.97]">
                                Continue <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button onClick={() => setSubmitted(true)} className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2 active:scale-[0.97]">
                                <CheckCircle className="w-4 h-4" /> Submit Application
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
