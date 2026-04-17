"use client";
import { useState } from "react";
import { Star, Heart, MessageCircle, Share2, CheckCircle, Trophy, Users, ArrowRight, Camera, X } from "lucide-react";

const filters = ["All", "Canada", "UK", "Australia", "USA", "Germany", "Emergency"];

const stories = [
    { id: 1, name: "Priya Sharma", destination: "Canada", visa: "Express Entry PR", headline: "From Hyderabad to Toronto — My PR Journey", story: "After 6 months of preparation with my Visara consultant, I received my ITA with a CRS score of 472. The process was seamless and transparent.", helpful: 142, comments: 23, date: "Mar 15, 2025", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", approved: true },
    { id: 2, name: "Rahul Verma", destination: "USA", visa: "H-1B Transfer", headline: "Successful H-1B Transfer in 45 Days", story: "My consultant guided me through the entire H-1B transfer process. Premium processing made it quick and stress-free.", helpful: 89, comments: 15, date: "Feb 28, 2025", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", approved: true },
    { id: 3, name: "Ananya Patel", destination: "UK", visa: "Tier-4 Student", headline: "UCL Admission + UK Student Visa in 3 Weeks", story: "Got my CAS from UCL and within 3 weeks my student visa was approved. My education agent on Visara handled everything perfectly.", helpful: 201, comments: 31, date: "Jan 20, 2025", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", approved: true },
    { id: 4, name: "Deepak Kumar", destination: "Australia", visa: "Subclass 189", headline: "Australia PR Granted — Dreams Do Come True", story: "After multiple failed attempts on my own, I found an expert on Visara who identified issues with my skills assessment. Got invited in 2 months.", helpful: 167, comments: 28, date: "Mar 1, 2025", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", approved: true },
    { id: 5, name: "Fatima Ali", destination: "Canada", visa: "Study Permit", headline: "Canadian Study Permit — First Attempt Success", story: "I was worried about SDS requirements but my Visara consultant made it simple. Got my study permit for UBC in under a month!", helpful: 95, comments: 12, date: "Feb 10, 2025", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face", approved: true },
    { id: 6, name: "Arjun Nair", destination: "Germany", visa: "Job Seeker Visa", headline: "Germany Job Seeker Visa — Engineer to Berlin", story: "Used the Opportunity Card assessment on Visara and qualified easily. Found a job within 4 months of arriving in Berlin.", helpful: 113, comments: 19, date: "Jan 5, 2025", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", approved: true },
];

export default function SuccessStoriesPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const filtered = activeFilter === "All" ? stories : stories.filter(s => s.destination === activeFilter);

    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold mb-4">✨ Success Stories</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">Real approvals from our community. Every story is a dream realized.</p>
                    <div className="flex justify-center gap-8">
                        {[
                            { label: "95% Success Rate", icon: Trophy },
                            { label: "2,400+ Approvals", icon: CheckCircle },
                            { label: "4.8★ Rating", icon: Star },
                        ].map(s => (
                            <div key={s.label} className="flex items-center gap-2 text-sm font-semibold">
                                <s.icon className="w-4 h-4" /> {s.label}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filters & CTA */}
            <section className="max-w-5xl mx-auto px-4 -mt-6 relative z-10">
                <div className="bg-white rounded-2xl shadow-card border border-sky-100 p-4 flex flex-wrap items-center gap-3 justify-between">
                    <div className="flex flex-wrap gap-2">
                        {filters.map(f => (
                            <button key={f} onClick={() => setActiveFilter(f)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeFilter === f ? "bg-[#0ea5e9] text-white" : "bg-gray-50 text-gray-600 hover:bg-sky-50 border border-gray-200"}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white px-5 py-2 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2">
                        <Camera className="w-4 h-4" /> Share Your Story
                    </button>
                </div>
            </section>

            {/* Stories Grid */}
            <section className="max-w-5xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((s, i) => (
                        <div key={s.id} className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all group">
                            <div className="h-3 bg-gradient-to-r from-[#0ea5e9] to-emerald-400" />
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={s.image} alt={s.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-100" />
                                    <div>
                                        <h3 className="font-bold text-navy text-sm">{s.name}</h3>
                                        <p className="text-xs text-gray-400">{s.date}</p>
                                    </div>
                                    <span className="ml-auto bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" /> {s.visa}
                                    </span>
                                </div>
                                <h2 className="font-sora font-bold text-navy text-base mb-2 group-hover:text-[#0ea5e9] transition-colors">{s.headline}</h2>
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">{s.story}</p>
                                <div className="flex items-center gap-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
                                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors font-semibold"><Heart className="w-3.5 h-3.5" /> {s.helpful} Helpful</button>
                                    <button className="flex items-center gap-1 hover:text-[#0ea5e9] transition-colors font-semibold"><MessageCircle className="w-3.5 h-3.5" /> {s.comments} Comments</button>
                                    <button className="flex items-center gap-1 hover:text-[#0ea5e9] transition-colors font-semibold ml-auto"><Share2 className="w-3.5 h-3.5" /> Share</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Share Story Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative max-h-[90vh] overflow-auto">
                        <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        <h2 className="font-sora font-bold text-xl text-navy mb-5">Share Your Success Story</h2>
                        <div className="space-y-4">
                            <input placeholder="Your Name" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                            <select className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] appearance-none">
                                <option value="">Destination Country</option>
                                <option>Canada</option><option>USA</option><option>UK</option><option>Australia</option><option>Germany</option>
                            </select>
                            <input placeholder="Visa Type (e.g., Express Entry PR)" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                            <input placeholder="Headline" className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9]" />
                            <textarea placeholder="Tell us your story (min 50 characters)..." rows={4} className="w-full p-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm outline-none focus:border-[#0ea5e9] resize-none" />
                            <button className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">Submit Story</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
