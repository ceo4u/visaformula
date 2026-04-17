"use client";
import { Languages, Star, MapPin, ArrowRight, Globe, Users } from "lucide-react";

const languages = [
    {
        name: "French", flag: "🇫🇷", required: "Canada (Quebec), France, Belgium", courses: [
            { institute: "Alliance Française", city: "Delhi", rating: 4.9, fee: "₹22,000", duration: "3 months" },
            { institute: "French Academy India", city: "Mumbai", rating: 4.7, fee: "₹18,000", duration: "2.5 months" },
        ]
    },
    {
        name: "German", flag: "🇩🇪", required: "Germany, Austria, Switzerland", courses: [
            { institute: "Goethe-Institut", city: "Bangalore", rating: 4.8, fee: "₹25,000", duration: "4 months" },
            { institute: "German Language Hub", city: "Pune", rating: 4.6, fee: "₹15,000", duration: "3 months" },
        ]
    },
    {
        name: "Spanish", flag: "🇪🇸", required: "Spain, Latin America", courses: [
            { institute: "Instituto Cervantes", city: "Delhi", rating: 4.7, fee: "₹20,000", duration: "3 months" },
            { institute: "Spanish School India", city: "Mumbai", rating: 4.5, fee: "₹14,000", duration: "2 months" },
        ]
    },
    {
        name: "Arabic", flag: "🇸🇦", required: "UAE, Saudi Arabia, Qatar", courses: [
            { institute: "Arabic Language Center", city: "Hyderabad", rating: 4.6, fee: "₹12,000", duration: "3 months" },
        ]
    },
];

export default function LanguageTrainingPage() {
    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            <section className="bg-gradient-to-br from-purple-600 via-violet-500 to-purple-700 text-white py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6"><Languages className="w-4 h-4" /> Language Training</div>
                    <h1 className="font-sora text-4xl md:text-5xl font-extrabold mb-4">Learn the Language<br />Your Destination Needs</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">French, German, Spanish, Arabic — find certified courses near you.</p>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-4 py-14">
                <div className="space-y-10">
                    {languages.map(lang => (
                        <div key={lang.name}>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-3xl">{lang.flag}</span>
                                <div>
                                    <h2 className="font-sora font-bold text-xl text-navy">{lang.name}</h2>
                                    <p className="text-xs text-gray-500">Required for: {lang.required}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {lang.courses.map(c => (
                                    <div key={c.institute} className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all group">
                                        <h3 className="font-bold text-navy text-base mb-2 group-hover:text-[#0ea5e9] transition-colors">{c.institute}</h3>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.city}</span>
                                            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" fill="currentColor" /> {c.rating}</span>
                                            <span>{c.duration}</span>
                                        </div>
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                            <span className="font-extrabold text-navy text-lg">{c.fee}</span>
                                            <button className="bg-[#0ea5e9] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#0284c7] transition-all">Enroll</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
