"use client";

import { Briefcase, MapPin, Building, DollarSign, Clock, CheckCircle } from "lucide-react";

export default function JobProfilePage() {
    return (
        <div className="bg-[#f5f5f5] min-h-screen text-[#222222]">
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row gap-6">
                    <img src="https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop" className="w-[80px] h-[80px] rounded object-cover shadow-sm" alt="Logo" />
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Senior IT Project Manager</h1>
                        <div className="flex items-center gap-2 mb-2 text-sm text-[#0ea5e9] font-medium">
                            <Building className="w-4 h-4" /> TechFlow Solutions
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-4 gap-4">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Dubai, UAE</span>
                            <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> Full-time</span>
                            <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> AED 30,000 - 45,000 / mo</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1140px] mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-[65%] shrink-0">
                    <h2 className="text-2xl font-bold mb-4">Job Description</h2>
                    <p className="text-sm leading-relaxed mb-8">We are looking for an experienced Senior IT Project Manager to lead large-scale enterprise deployments across the Middle East. The ideal candidate has experience with cloud migrations, agile methodologies, and cross-functional team leadership.</p>

                    <h3 className="font-bold mb-3">Requirements</h3>
                    <ul className="list-disc pl-5 text-sm space-y-2 mb-8">
                        <li>PMP or PRINCE2 Certification</li>
                        <li>8+ years of experience in IT project management</li>
                        <li>Fluency in English (Arabic is a plus)</li>
                        <li>Willingness to relocate to Dubai</li>
                    </ul>
                </div>

                <aside className="w-full md:w-[35%]">
                    <div className="bg-white border border-gray-200 rounded-[8px] p-6 shadow-sm sticky top-20">
                        <h3 className="text-xl font-bold mb-4 border-b border-gray-100 pb-2">Apply for this position</h3>
                        <p className="text-sm text-gray-600 mb-6">Visa sponsorship is provided for the right candidate. Relocation assistance included.</p>
                        <button className="w-full bg-[#0ea5e9] text-white font-bold py-3 rounded hover:bg-[#0284c7] transition-colors mb-2">Apply on Company Site</button>
                        <div className="text-xs text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3" /> Posted 2 days ago
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
