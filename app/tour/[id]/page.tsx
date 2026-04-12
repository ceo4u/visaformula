"use client";

import { MapPin, Calendar, Clock, Star, Users } from "lucide-react";

export default function TourProfilePage() {
    return (
        <div className="bg-[#f5f5f5] min-h-screen text-[#222222]">
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">7-Day Scenic Swiss Alps Explorer</h1>
                        <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                            <span className="font-medium text-gray-600">by Alpine Adventures</span>
                            <span>·</span>
                            <div className="flex text-yellow-500">
                                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4" fill="currentColor" />)}
                            </div>
                            <span className="font-bold">5.0</span>
                            <span className="text-gray-500">(312 reviews)</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-4 gap-4">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Zurich, Switzerland (Start)</span>
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 7 Days</span>
                            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Max 15 people</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1140px] mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-[65%] shrink-0">
                    <img src="https://images.unsplash.com/photo-1527668752968-14ce70a4a7ae?w=800&h=400&fit=crop" className="w-full h-[400px] object-cover rounded-[8px] mb-8" alt="Tour" />

                    <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
                    <p className="text-sm leading-relaxed mb-6">Experience the raw beauty of the Swiss Alps on this week-long guided adventure. From the pristine lakes of Interlaken to the majestic peaks of Zermatt, this tour covers the best spots for nature lovers and photographers.</p>
                </div>

                <aside className="w-full md:w-[35%]">
                    <div className="bg-white border border-gray-200 rounded-[8px] p-6 shadow-sm sticky top-20">
                        <div className="mb-4">
                            <span className="text-2xl font-black">$2,499</span>
                            <span className="text-sm text-gray-500 ml-1">/ person</span>
                        </div>
                        <div className="space-y-4 text-sm mb-6 border-y border-gray-100 py-4">
                            <div className="flex justify-between"><span className="text-gray-600">Free Cancellation</span><span className="font-bold text-green-600">Yes</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Guide Language</span><span className="font-bold">English</span></div>
                        </div>
                        <button className="w-full bg-[#0ea5e9] text-white font-bold py-3 rounded hover:bg-[#0284c7] transition-colors">Book Tour</button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
