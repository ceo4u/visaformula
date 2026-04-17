"use client";
import { useState } from "react";
import { Wallet, Calculator, Star, MapPin, Building2, ArrowRight, IndianRupee } from "lucide-react";

const advisors = [
    { name: "FinVisa Advisors", city: "Mumbai", rating: 4.9, specialty: "GIC + Education Loans", fee: "Free consultation", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" },
    { name: "StudyLoan Pro", city: "Delhi", rating: 4.8, specialty: "HDFC Credila Partner", fee: "₹500 one-time", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop" },
    { name: "Global Finance Hub", city: "Bangalore", rating: 4.7, specialty: "SBI Global Ed-Vantage", fee: "Free consultation", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
    { name: "Loan Sarathi", city: "Pune", rating: 4.6, specialty: "Prodigy Finance Partner", fee: "Free consultation", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
];

export default function FinancialPage() {
    const [loanAmount, setLoanAmount] = useState(2000000);
    const [tenure, setTenure] = useState(5);
    const [rate, setRate] = useState(10.5);
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emi = Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1));

    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            <section className="bg-gradient-to-br from-emerald-600 via-teal-500 to-emerald-700 text-white py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6"><Wallet className="w-4 h-4" /> Financial Planning</div>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold mb-4">Plan Your Finances<br />for Study Abroad</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">Education loans, GIC deposits, EMI planning — get expert financial guidance.</p>
                </div>
            </section>

            {/* EMI Calculator */}
            <section className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 mb-12">
                <div className="bg-white rounded-2xl shadow-card border border-sky-100 p-6">
                    <h3 className="font-sora font-bold text-navy text-lg mb-5 flex items-center gap-2"><Calculator className="w-5 h-5 text-[#0ea5e9]" /> EMI Calculator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Loan Amount</label>
                            <input type="range" min={500000} max={5000000} step={100000} value={loanAmount} onChange={(e) => setLoanAmount(+e.target.value)} className="w-full accent-[#0ea5e9]" />
                            <span className="text-sm font-bold text-navy">₹{(loanAmount / 100000).toFixed(0)} Lakh</span>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Tenure (years)</label>
                            <input type="range" min={1} max={15} value={tenure} onChange={(e) => setTenure(+e.target.value)} className="w-full accent-[#0ea5e9]" />
                            <span className="text-sm font-bold text-navy">{tenure} years</span>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Interest Rate (%)</label>
                            <input type="range" min={7} max={15} step={0.5} value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full accent-[#0ea5e9]" />
                            <span className="text-sm font-bold text-navy">{rate}%</span>
                        </div>
                    </div>
                    <div className="bg-sky-50 rounded-xl p-5 flex items-center justify-between border border-sky-100">
                        <div className="text-sm text-gray-600">Your Monthly EMI:</div>
                        <div className="font-sora text-3xl font-extrabold text-[#0ea5e9] flex items-center gap-1"><IndianRupee className="w-6 h-6" />{emi.toLocaleString()}</div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 text-center">Total payable: ₹{(emi * months).toLocaleString()} | Total interest: ₹{(emi * months - loanAmount).toLocaleString()}</p>
                </div>
            </section>

            {/* GIC Info */}
            <section className="max-w-5xl mx-auto px-4 mb-12">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                    <h3 className="font-bold text-navy mb-2">🇨🇦 Need GIC for Canada?</h3>
                    <p className="text-sm text-gray-600 mb-3">The Guaranteed Investment Certificate (GIC) requires a deposit of CAD 20,635 (~₹12.8 Lakh). Our advisors can help you through the process.</p>
                    <div className="flex gap-3">
                        <span className="text-xs bg-white px-3 py-1.5 rounded-full border border-amber-200 font-semibold">CAD 20,635 required</span>
                        <span className="text-xs bg-white px-3 py-1.5 rounded-full border border-amber-200 font-semibold">Monthly refunds during study</span>
                        <span className="text-xs bg-white px-3 py-1.5 rounded-full border border-amber-200 font-semibold">ICICI / SBI / Scotiabank</span>
                    </div>
                </div>
            </section>

            {/* Advisors */}
            <section className="max-w-6xl mx-auto px-4 pb-16">
                <h2 className="font-sora text-2xl font-bold text-navy mb-8">Financial Advisors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {advisors.map(a => (
                        <div key={a.name} className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all group flex">
                            <div className="w-32 shrink-0 overflow-hidden">
                                <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-5 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 className="font-bold text-navy text-base group-hover:text-[#0ea5e9] transition-colors">{a.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                        <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {a.city}</span>
                                        <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-yellow-400" fill="currentColor" /> {a.rating}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">{a.specialty}</p>
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{a.fee}</span>
                                    <button className="bg-[#0ea5e9] text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-[#0284c7] transition-all">Consult</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
