"use client";

import { motion } from "framer-motion";
import { Star, Share2, Heart, Clock, Video, Phone, User, ChevronLeft, ChevronRight, ThumbsUp, Smile, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const lawyerData = {
    name: "Priya Sharma, RCIC",
    rating: 4.5,
    reviews: 243,
    title: "RCIC Licensed Consultant",
    location: "Toronto, ON",
    status: "Open now",
    hours: "9:00 AM - 6:00 PM",
    about: "With over 12 years of specialized experience in Canadian immigration law, Priya Sharma has successfully guided thousands of individuals and families through the complexities of Express Entry, Provincial Nominee Programs (PNP), and Family Sponsorship. As a Regulated Canadian Immigration Consultant (RCIC), she is known for her meticulous attention to detail and unwavering commitment to client success.",
    specialties: ["Express Entry", "LMIA Applications", "Study Permits", "Spousal Sponsorship", "PNP Ontario", "PR Renewals"],
    images: [
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop",
    ],
    reviewInsights: [
        { label: "Communication", score: 4.9, width: "95%" },
        { label: "Transparency", score: 4.7, width: "88%" },
        { label: "Speed", score: 4.8, width: "92%" },
    ],
};

const reviews = [
    { name: "Marcus T.", location: "Toronto, ON", reviewCount: "12 reviews", rating: 5, time: "2 days ago", text: "Priya was exceptional throughout my PR process. She is incredibly responsive and her legal knowledge is unmatched. I finally received my COPR last week thanks to her careful handling of my complex LMIA case.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    { name: "Elena S.", location: "Vaughan, ON", reviewCount: "4 reviews", rating: 4, time: "1 week ago", text: "Very professional. The study permit process was daunting but she made it look easy. Only docking a star because it took a few days to get the first appointment, but after that, it was smooth sailing.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
];

const similarExperts = [
    { name: "David Chen, RCIC", rating: 4.8, reviews: 182, role: "Business Immigration", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&crop=face" },
    { name: "Amara Okafor", rating: 4.9, reviews: 96, role: "Refugee & Asylum Cases", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=face" },
    { name: "Robert Müller, LL.M.", rating: 4.7, reviews: 215, role: "Federal & Startup Visa", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face" },
    { name: "Sophie Dubois", rating: 4.8, reviews: 142, role: "Quebec Immigration", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop&crop=face" },
];

function StarRating({ count, size = 18 }: { count: number; size?: number }) {
    return (
        <div className="flex text-primary">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`w-[${size}px] h-[${size}px]`} style={{ width: size, height: size }} fill={i <= count ? "currentColor" : "none"} strokeWidth={i <= count ? 0 : 1.5} />
            ))}
        </div>
    );
}

export default function LawyerProfilePage() {
    return (
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            {/* HEADER */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface font-heading">{lawyerData.name}</h1>
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-1">
                                <StarRating count={Math.floor(lawyerData.rating)} />
                                <span className="ml-1 text-sm font-bold text-on-surface">{lawyerData.reviews} reviews</span>
                            </div>
                            <span className="text-on-surface-variant text-sm font-medium">{lawyerData.title}</span>
                            <span className="text-on-surface-variant text-sm">•</span>
                            <span className="text-on-surface-variant text-sm">{lawyerData.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="bg-tertiary text-white px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">{lawyerData.status}</span>
                            <span className="text-on-surface-variant text-xs">{lawyerData.hours}</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 border border-neutral-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-neutral-50 transition-colors">
                            <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button className="flex items-center gap-2 border border-neutral-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-neutral-50 transition-colors">
                            <Heart className="w-4 h-4" /> Save
                        </button>
                    </div>
                </div>
            </motion.section>

            {/* PHOTO GRID */}
            <section className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[400px] mb-12 overflow-hidden rounded-xl shadow-editorial">
                <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden">
                    <img alt={lawyerData.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={lawyerData.images[0]} />
                </div>
                {lawyerData.images.slice(1).map((img, i) => (
                    <div key={i} className="hidden md:block relative group cursor-pointer overflow-hidden">
                        <img alt="Office" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={img} />
                    </div>
                ))}
            </section>

            {/* TWO COLUMN LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* LEFT: Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* About */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-on-surface font-heading">About the Expert</h2>
                        <p className="text-on-surface-variant leading-relaxed text-sm">{lawyerData.about}</p>
                    </section>

                    {/* Specialties */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-on-surface font-heading">Specialties</h2>
                        <div className="flex flex-wrap gap-2">
                            {lawyerData.specialties.map((s) => (
                                <span key={s} className="bg-surface-container-high text-on-surface px-4 py-2 rounded-full text-xs font-semibold">{s}</span>
                            ))}
                        </div>
                    </section>

                    {/* Review Insights */}
                    <section className="bg-surface-container-lowest p-8 rounded-xl shadow-editorial">
                        <h2 className="text-xl font-bold mb-6 text-on-surface font-heading">Review Insights</h2>
                        <div className="space-y-4">
                            {lawyerData.reviewInsights.map((r) => (
                                <div key={r.label} className="flex items-center gap-4">
                                    <span className="text-xs font-bold w-28">{r.label}</span>
                                    <div className="flex-1 bg-surface-container-low h-3 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: r.width }} />
                                    </div>
                                    <span className="text-xs font-bold text-primary">{r.score}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Reviews */}
                    <section className="space-y-8">
                        <h2 className="text-2xl font-bold text-on-surface font-heading">Recommended Reviews</h2>
                        {reviews.map((rev) => (
                            <div key={rev.name} className="border-b border-surface-container-highest pb-8">
                                <div className="flex gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                        <img alt={rev.name} className="w-full h-full object-cover" src={rev.image} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{rev.name}</h4>
                                        <p className="text-on-surface-variant text-xs">{rev.location} • {rev.reviewCount}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <StarRating count={rev.rating} size={14} />
                                    <span className="text-xs text-on-surface-variant">{rev.time}</span>
                                </div>
                                <p className="text-on-surface-variant text-sm leading-relaxed mb-4 italic">&ldquo;{rev.text}&rdquo;</p>
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-1 border border-neutral-300 px-3 py-1 rounded-full text-xs font-bold hover:bg-neutral-50 transition-all">
                                        <ThumbsUp className="w-3 h-3" /> Helpful
                                    </button>
                                    <button className="flex items-center gap-1 border border-neutral-300 px-3 py-1 rounded-full text-xs font-bold hover:bg-neutral-50 transition-all">
                                        <Smile className="w-3 h-3" /> Thanks
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>

                {/* RIGHT: Booking Card */}
                <div className="lg:col-span-1">
                    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-editorial sticky top-24 border border-surface-container-highest">
                        <h3 className="text-lg font-bold mb-6 text-on-surface font-heading">Book a Consultation</h3>
                        <div className="space-y-6">
                            {/* Type */}
                            <div>
                                <label className="text-xs font-bold text-on-surface-variant uppercase mb-3 block tracking-wider">Consultation Type</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-primary bg-blue-50 text-primary">
                                        <Video className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-bold">Video</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-transparent bg-surface-container-low hover:border-neutral-300 transition-all">
                                        <Phone className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-bold">Phone</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-transparent bg-surface-container-low hover:border-neutral-300 transition-all">
                                        <User className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-bold">In-Person</span>
                                    </button>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-on-surface-variant uppercase block tracking-wider">Duration</label>
                                <label className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <input defaultChecked className="text-primary focus:ring-primary" name="plan" type="radio" />
                                        <span className="text-sm font-medium">30 Min Consultation</span>
                                    </div>
                                    <span className="text-sm font-bold">$120</span>
                                </label>
                                <label className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <input className="text-primary focus:ring-primary" name="plan" type="radio" />
                                        <span className="text-sm font-medium">60 Min Full Review</span>
                                    </div>
                                    <span className="text-sm font-bold">$200</span>
                                </label>
                            </div>

                            {/* Calendar */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold">October 2026</span>
                                    <div className="flex gap-2">
                                        <ChevronLeft className="w-4 h-4 cursor-pointer text-on-surface-variant hover:text-on-surface" />
                                        <ChevronRight className="w-4 h-4 cursor-pointer text-on-surface-variant hover:text-on-surface" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center">
                                    {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                                        <span key={i} className="text-[10px] font-bold text-on-surface-variant">{d}</span>
                                    ))}
                                    <span /><span /><span />
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                                        <span
                                            key={d}
                                            className={`p-1.5 text-xs font-bold rounded cursor-pointer transition-colors ${d === 5 ? "bg-primary text-white" : "bg-surface-container-high hover:bg-surface-container-highest"}`}
                                        >
                                            {d}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full bg-primary-container text-white py-4 rounded-lg font-black text-sm uppercase tracking-widest shadow-lg hover:bg-primary transition-all active:scale-95">
                                Request to Book
                            </button>
                            <p className="text-[10px] text-center text-on-surface-variant">
                                You won&apos;t be charged yet. Consultant will confirm within 24 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SIMILAR EXPERTS */}
            <section className="mt-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-on-surface font-heading">Similar Immigration Experts</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {similarExperts.map((expert, idx) => (
                        <motion.div key={expert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}>
                            <div className="bg-surface-container-lowest rounded-xl shadow-editorial overflow-hidden group cursor-pointer">
                                <div className="h-48 overflow-hidden">
                                    <img alt={expert.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={expert.image} />
                                </div>
                                <div className="p-4 space-y-1">
                                    <h4 className="font-bold text-sm">{expert.name}</h4>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-primary" fill="currentColor" strokeWidth={0} />
                                        <span className="text-xs font-bold">{expert.rating}</span>
                                        <span className="text-xs text-on-surface-variant">({expert.reviews})</span>
                                    </div>
                                    <p className="text-xs text-on-surface-variant">{expert.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
