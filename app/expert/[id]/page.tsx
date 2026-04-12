"use client";

import { Star, MapPin, Phone, MessageSquare, Globe, Calendar, Clock, Share, Bookmark, ThumbsUp, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ExpertProfilePage() {
    return (
        <div className="bg-[#f5f5f5] min-h-screen text-[#222222]">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 pt-6">
                <div className="max-w-[1140px] mx-auto px-4 md:px-0 flex flex-col md:flex-row justify-between pb-6 gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Marcus Thorne, JD</h1>
                        <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                            <Link href="#" className="font-medium hover:underline">Immigration Attorney</Link>
                            <span>·</span>
                            <div className="flex text-yellow-500">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-4 h-4" fill={i <= 4.5 ? "currentColor" : "none"} />
                                ))}
                            </div>
                            <span className="font-bold">4.5</span>
                            <a href="#reviews" className="hover:underline text-gray-500">(142 reviews)</a>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-4 gap-2">
                            <span>New York, NY</span>
                            <span>·</span>
                            <span>15 years experience</span>
                            <span>·</span>
                            <span>1,500+ cases handled</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-green-100 text-green-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-green-200">Open now</span>
                            <span className="bg-sky-50 text-yellow-500 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-sky-200">Verified</span>
                            <span className="bg-orange-50 text-orange-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-orange-200">Top Rated</span>
                        </div>
                    </div>

                    <div className="flex flex-row md:flex-col gap-2 shrink-0 self-start md:self-end mt-4 md:mt-0">
                        <button className="flex items-center gap-1.5 border border-gray-300 px-4 py-2 text-sm font-bold rounded hover:bg-gray-50 transition-colors">
                            <Share className="w-4 h-4" /> Share
                        </button>
                        <button className="flex items-center gap-1.5 border border-gray-300 px-4 py-2 text-sm font-bold rounded hover:bg-gray-50 transition-colors">
                            <Bookmark className="w-4 h-4" /> Save
                        </button>
                    </div>
                </div>

                {/* Photo Grid */}
                <div className="max-w-[1140px] mx-auto px-4 md:px-0 pb-8 flex h-[350px] gap-1 relative">
                    <div className="w-[60%] bg-gray-200 overflow-hidden cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Main" />
                    </div>
                    <div className="w-[40%] grid grid-cols-2 grid-rows-2 gap-1 h-full">
                        <div className="bg-gray-200 overflow-hidden cursor-pointer"><img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Office" /></div>
                        <div className="bg-gray-200 overflow-hidden cursor-pointer"><img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Meeting" /></div>
                        <div className="bg-gray-200 overflow-hidden cursor-pointer"><img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Award" /></div>
                        <div className="bg-gray-200 overflow-hidden cursor-pointer relative">
                            <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Team" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">See all photos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-[1140px] mx-auto px-4 md:px-0 py-8 flex flex-col md:flex-row gap-8">
                {/* 65% Left Column */}
                <div className="w-full md:w-[65%] shrink-0">
                    {/* About section */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">About the Expert</h2>
                        <p className="text-sm leading-relaxed mb-4">
                            Marcus Thorne is an award-winning immigration attorney specializing with over 15 years of experience resolving complex H-1B, O-1, and EB-1 visa cases. He runs a dedicated boutique firm tailored to the tech and creative industries.
                        </p>
                        <h3 className="font-bold mb-2">Specialties</h3>
                        <div className="flex flex-wrap gap-2">
                            {["H-1B Visa", "O-1 Extraordinary Ability", "EB-1 Green Card", "L-1 Transfer", "RFE Responses"].map((spec) => (
                                <span key={spec} className="border border-gray-300 text-sm px-3 py-1.5 rounded-[20px] font-medium bg-white">{spec}</span>
                            ))}
                        </div>
                    </section>

                    <hr className="border-gray-200 mb-8" />

                    {/* Review Insights */}
                    <section className="mb-10" id="reviews">
                        <h2 className="text-2xl font-bold mb-4">Review Insights</h2>
                        <div className="bg-white border border-gray-200 rounded-[8px] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1 font-medium"><span>Response Quality</span><span>4.8</span></div>
                                    <div className="w-full h-2 bg-[#e8e8e8] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#0ea5e9] w-[96%]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1 font-medium"><span>Communication</span><span>4.5</span></div>
                                    <div className="w-full h-2 bg-[#e8e8e8] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#0ea5e9] w-[90%]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1 font-medium"><span>Success Rate</span><span>4.9</span></div>
                                    <div className="w-full h-2 bg-[#e8e8e8] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#0ea5e9] w-[98%]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1 font-medium"><span>Value</span><span>4.2</span></div>
                                    <div className="w-full h-2 bg-[#e8e8e8] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#0ea5e9] w-[84%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Reviews List */}
                    <section>
                        {/* Sample Review */}
                        <div className="mb-8 border-b border-gray-100 pb-8">
                            <div className="flex items-start gap-4 mb-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">JD</div>
                                <div>
                                    <div className="font-bold">John Doe</div>
                                    <div className="text-xs text-gray-500">San Francisco, CA · 15 reviews</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3" fill="currentColor" />)}
                                </div>
                                <span className="text-xs text-gray-500">Oct 24, 2023</span>
                            </div>
                            <p className="text-sm leading-relaxed mb-4">
                                Marcus handled my H-1B RFE with incredible precision. They walked me through everything and didn't charge me extra when things got complicated. They are highly organized.
                            </p>
                            <button className="flex items-center gap-1.5 text-xs font-bold text-gray-600 border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors">
                                <ThumbsUp className="w-3 h-3" /> Helpful (12)
                            </button>

                            {/* Business Reply */}
                            <div className="bg-gray-50 mt-4 p-4 rounded ml-4 border-l-[3px] border-[#0ea5e9]">
                                <div className="text-xs font-bold mb-1">Business Reply</div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Thank you John! It was a pleasure working with you. Dealing with an RFE can be stressful, but your quick responses made it a seamless collaborative effort. Looking forward to your extensions!
                                </p>
                            </div>
                        </div>

                        {/* More Reviews (Pagination/Link conceptually) */}
                        <div className="text-center">
                            <button className="border-2 border-gray-300 text-gray-700 font-bold px-6 py-2 rounded hover:bg-gray-50 transition-colors">Load more reviews</button>
                        </div>
                    </section>
                </div>

                {/* 35% Right Column (Sticky) */}
                <aside className="w-full md:w-[35%]">
                    <div className="sticky top-20 flex flex-col gap-6">
                        {/* Booking Card */}
                        <div className="bg-white border border-gray-200 rounded-[8px] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
                            <h3 className="text-xl font-bold mb-4 border-b border-gray-100 pb-4">Book a Consultation</h3>

                            <label className="block text-sm font-bold mb-2">Session Type</label>
                            <div className="flex gap-2 mb-4">
                                <button className="flex-1 border-2 border-[#0ea5e9] bg-sky-50 text-yellow-500 font-bold py-2 rounded-[20px] text-sm">Video</button>
                                <button className="flex-1 border border-gray-300 hover:border-gray-400 font-medium text-gray-700 py-2 rounded-[20px] text-sm">Phone</button>
                                <button className="flex-1 border border-gray-300 hover:border-gray-400 font-medium text-gray-700 py-2 rounded-[20px] text-sm hidden sm:block">In-person</button>
                            </div>

                            <label className="block text-sm font-bold mb-2">Duration & Price</label>
                            <select className="w-full border border-gray-300 rounded p-2 text-sm mb-4 outline-none focus:border-[#0ea5e9]">
                                <option>30 min ($150)</option>
                                <option>60 min ($250)</option>
                                <option>Document Review ($400)</option>
                            </select>

                            <label className="block text-sm font-bold mb-2">Select Date</label>
                            {/* Mini Calendar placeholder */}
                            <div className="border border-gray-200 rounded p-3 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <ChevronLeft className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-bold">November 2023</span>
                                    <ChevronRight className="w-4 h-4 text-yellow-500 cursor-pointer" />
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => <div key={d} className="font-medium text-gray-400 py-1">{d}</div>)}
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <div key={i} className={`py-1.5 rounded cursor-pointer ${i === 14 ? "bg-[#0ea5e9] text-white font-bold" : i > 12 ? "hover:bg-gray-100" : "text-gray-300"}`}>
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <label className="block text-sm font-bold mb-2">Available Times for Nov 15</label>
                            <div className="grid grid-cols-3 gap-2 mb-6">
                                <button className="border border-[#0ea5e9] bg-sky-50 text-yellow-500 rounded py-1.5 text-xs font-bold">10:00 AM</button>
                                <button className="border border-gray-300 hover:border-gray-400 rounded py-1.5 text-xs font-medium">1:30 PM</button>
                                <button className="border border-gray-300 hover:border-gray-400 rounded py-1.5 text-xs font-medium">3:00 PM</button>
                            </div>

                            <button className="w-full bg-[#0ea5e9] text-white font-bold py-3 rounded-[4px] hover:bg-[#0284c7] transition-colors shadow">
                                Request to Book
                            </button>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-white border border-gray-200 rounded-[8px] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
                            <h3 className="font-bold mb-4">Contact Info</h3>
                            <div className="space-y-4 text-sm text-[#222222]">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-gray-500" />
                                    <a href="#" className="text-blue-600 hover:underline">www.thornelaw.com</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    <span>(212) 555-0198</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-gray-500" />
                                    <div>
                                        120 Broadway, Suite 3400<br />
                                        New York, NY 10271
                                    </div>
                                </div>
                                <button className="mt-2 w-full border-2 border-gray-300 text-gray-800 font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                                    <MessageSquare className="w-4 h-4" /> Message Expert
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
