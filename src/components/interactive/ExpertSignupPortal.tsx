import { useState } from "react";
import { CheckCircle, ArrowLeft, ArrowRight, Upload, Plus, X, User, FileText, DollarSign } from "lucide-react";

const specializations = ["Express Entry", "H-1B", "Study Visa", "Work Permit", "Family Visa", "PR", "Visa Appeal", "Asylum", "Business Immigration", "LMIA"];
const allCountries = ["USA", "Canada", "UK", "Australia", "Germany", "New Zealand", "Ireland", "Singapore", "UAE"];

export function ExpertSignupPortal() {
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
            <div className="bg-white min-h-screen flex items-center justify-center px-4 font-sans">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h1 className="font-sora text-2xl font-extrabold text-black mb-2">Application Submitted!</h1>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">Your expert profile is currently under review by our operations team. You will hear back from us with access details within 24–48 hours.</p>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-2 mb-6 font-medium text-slate-800">
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Specializations:</strong> {selectedSpecs.join(", ")}</p>
                    </div>
                    <a href="/" className="inline-block w-full bg-black hover:bg-slate-900 text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.98]">Return Home</a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-10 px-4 font-sans flex items-center justify-center">
            <div className="max-w-4xl w-full mx-auto">
                <h1 className="font-sora text-3xl font-extrabold text-black mb-2 text-center">Register as Expert</h1>
                <p className="text-sm text-gray-500 text-center mb-10">Join Visara's marketplace and offer consulting to clients globally.</p>

                {/* Progress Bar */}
                <div className="flex items-center justify-center gap-2 mb-12">
                    {[
                        { num: 1, label: "Basic Info", icon: User },
                        { num: 2, label: "Credentials", icon: FileText },
                        { num: 3, label: "Pricing", icon: DollarSign },
                    ].map((s, i) => (
                        <div key={s.num} className="flex items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border ${
                                step > s.num ? "bg-black text-white border-black" :
                                step === s.num ? "bg-black text-white border-black shadow-md" :
                                "bg-slate-50 text-slate-400 border-slate-200"
                            }`}>
                                {step > s.num ? <CheckCircle className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
                            </div>
                            <span className={`text-xs font-bold hidden sm:block ${step >= s.num ? "text-black" : "text-gray-400"}`}>{s.label}</span>
                            {i < 2 && <div className={`w-10 h-[2px] rounded-full mx-1 ${step > s.num ? "bg-black" : "bg-slate-200"}`} />}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-8">
                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <div className="space-y-5">
                            <h2 className="font-sora text-lg font-bold text-black mb-4">Basic Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Full Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. John Smith" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-black font-semibold text-black" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="john@firm.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-black font-semibold text-black" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Phone</label>
                                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 99999 99999" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-black font-semibold text-black" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Years of Experience</label>
                                    <input value={yearsExp} onChange={(e) => setYearsExp(e.target.value)} type="number" placeholder="5" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-black font-semibold text-black" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 block">Specializations</label>
                                <div className="flex flex-wrap gap-2">
                                    {specializations.map(s => (
                                        <button key={s} onClick={() => toggleItem(s, selectedSpecs, setSelectedSpecs)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedSpecs.includes(s) ? "bg-black text-white" : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"}`}>{s}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 block">Countries Covered</label>
                                <div className="flex flex-wrap gap-2">
                                    {allCountries.map(c => (
                                        <button key={c} onClick={() => toggleItem(c, selectedCountries, setSelectedCountries)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedCountries.includes(c) ? "bg-black text-white" : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"}`}>{c}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Bio</label>
                                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Tell prospective clients about your expertise..."
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-black resize-none font-semibold text-black" />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Credentials */}
                    {step === 2 && (
                        <div className="space-y-5">
                            <h2 className="font-sora text-lg font-bold text-black mb-4">Credentials & Verification</h2>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Licence / Registration Number</label>
                                <input value={licenceNo} onChange={(e) => setLicenceNo(e.target.value)} placeholder="BAR/2020/12345" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-black font-semibold text-black" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Government ID Document</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50/50 transition-colors cursor-pointer">
                                    <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                    <p className="text-sm text-slate-600 font-bold">Drop your ID here or click to upload</p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG · Max 10MB</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Professional Certificate</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50/50 transition-colors cursor-pointer">
                                    <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                    <p className="text-sm text-slate-600 font-bold">Drop certificate here or click to upload</p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG · Max 10MB</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Pricing */}
                    {step === 3 && (
                        <div className="space-y-5">
                            <h2 className="font-sora text-lg font-bold text-black mb-4">Pricing & Services</h2>
                            <div className="space-y-3">
                                {services.map((s, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <input value={s.name} onChange={(e) => { const copy = [...services]; copy[i].name = e.target.value; setServices(copy); }}
                                            placeholder="Service name" className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-black font-semibold text-black" />
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                            <input value={s.price} onChange={(e) => { const copy = [...services]; copy[i].price = e.target.value; setServices(copy); }}
                                                placeholder="Price" className="w-28 pl-7 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-black font-semibold text-black" />
                                        </div>
                                        {services.length > 1 && <button onClick={() => removeService(i)} className="text-slate-400 hover:text-red-500"><X className="w-4 h-4" /></button>}
                                    </div>
                                ))}
                                <button onClick={addService} className="w-full py-2.5 border-2 border-dashed border-slate-200 text-black font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-1">
                                    <Plus className="w-4 h-4" /> Add Service
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                        {step > 1 ? (
                            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                        ) : <div />}
                        {step < 3 ? (
                            <button onClick={() => setStep(step + 1)} className="bg-black hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2 active:scale-[0.97]">
                                Continue <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button onClick={() => setSubmitted(true)} className="bg-black hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2 active:scale-[0.97]">
                                <CheckCircle className="w-4 h-4 text-emerald-400" /> Submit Application
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
