"use client";

import { Star, MapPin, Globe, Users, BookOpen, Share, Bookmark } from "lucide-react";
import Link from "next/link";

export default function UniversityProfilePage() {
    return (
        <div className="bg-[#f5f5f5] min-h-screen text-[#222222]">
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">University of Melbourne</h1>
                        <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                            <span className="font-medium text-yellow-500">Global Top 50</span>
                            <span>·</span>
                            <div className="flex text-yellow-500">
                                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4" fill={i <= 4 ? "currentColor" : "none"} />)}
                            </div>
                            <span className="font-bold">4.8</span>
                            <span className="text-gray-500">(1,240 reviews)</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-4 gap-2">
                            <MapPin className="w-4 h-4" /> Parkville, Australia · Public University · Established 1853
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1140px] mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-[65%] shrink-0">
                    <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop" className="w-full h-[400px] object-cover rounded-[8px] mb-8" alt="Campus" />

                    <h2 className="text-2xl font-bold mb-4">About</h2>
                    <p className="text-sm leading-relaxed mb-8">The University of Melbourne is Australia's leading university, known for excellence in academic research and teaching. Our campus offers a vibrant community and state-of-the-art facilities.</p>
                </div>

                <aside className="w-full md:w-[35%]">
                    <div className="bg-white border border-gray-200 rounded-[8px] p-6 shadow-sm sticky top-20">
                        <h3 className="text-xl font-bold mb-4">Admissions Details</h3>
                        <div className="space-y-4 text-sm mb-6">
                            <div className="flex justify-between border-b pb-2"><span className="text-gray-600">Acceptance Rate</span><span className="font-bold">70%</span></div>
                            <div className="flex justify-between border-b pb-2"><span className="text-gray-600">Avg. Tuition</span><span className="font-bold">$35,000 / yr</span></div>
                            <div className="flex justify-between border-b pb-2"><span className="text-gray-600">Intl. Students</span><span className="font-bold">40%</span></div>
                        </div>
                        <button className="w-full bg-[#0ea5e9] text-white font-bold py-3 rounded hover:bg-[#0284c7] transition-colors">Apply Now</button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
