import { useState, useEffect } from "react";
import { Star, MapPin, CheckCircle, Clock, Shield, Globe, Award, BookOpen, MessageSquare, Calendar, Phone } from "lucide-react";

interface ExpertProfilePortalProps {
    expert: {
        id: number;
        name: string;
        category: string;
        role: string;
        rating: number;
        reviews: number;
        price: number;
        city: string;
        countries: string[];
        experience: number;
        isRemote: boolean;
        isAvailableToday: boolean;
        isEmergency: boolean;
        tags: string[];
        image: string;
    };
}

export function ExpertProfilePortal({ expert }: ExpertProfilePortalProps) {
    const [currentExpert, setCurrentExpert] = useState(expert);
    const [selectedSlot, setSelectedSlot] = useState<string>("");
    const [selectedService, setSelectedService] = useState<string>("Initial Consultation");

    useEffect(() => {
        if (typeof window !== "undefined" && expert.id === 7) {
            const hasLocalExpert = localStorage.getItem("expert_businessName") && localStorage.getItem("expert_isLoggedIn") === "true";
            if (hasLocalExpert) {
                let tagsArray = ["Express Entry", "PNP"];
                try {
                    const savedTags = localStorage.getItem("expert_expertiseTags");
                    if (savedTags) tagsArray = JSON.parse(savedTags);
                } catch(e) {}

                setCurrentExpert({
                    id: 7,
                    name: localStorage.getItem("expert_businessName") || "Marcus Thorne",
                    category: "pr",
                    role: localStorage.getItem("expert_advisorType") === "Agency" ? "Immigration Agency" : "Immigration Consultant",
                    rating: 5.0,
                    reviews: 1,
                    price: 1800,
                    city: localStorage.getItem("expert_officeAddress") || "Remote",
                    countries: (localStorage.getItem("expert_countriesExpertise") || "Canada").split(",").map((c: string) => c.trim()),
                    experience: 12,
                    isRemote: true,
                    isAvailableToday: true,
                    isEmergency: false,
                    tags: tagsArray,
                    image: localStorage.getItem("expert_profilePhoto") || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
                });
            }
        }
    }, [expert]);

    // Dynamic packages based on category
    const services = currentExpert.category === "work" || currentExpert.category === "pr" ? [
        { name: "Initial Consultation (30 min)", price: currentExpert.price, desc: "30-minute introductory call to review eligibility, visa pathway strategies, and documentation outline.", active: true },
        { name: "Full Visa Application Support", price: currentExpert.price * 6, desc: "End-to-end guidance, case strategy, application filing support, and mock interview prep.", active: true },
        { name: "Document Review & Audit", price: currentExpert.price * 2.5, desc: "Detailed evaluation of your prepared visa file to identify flaws and ensure approval compliance.", active: true }
    ] : [
        { name: "Initial Consultation (30 min)", price: currentExpert.price, desc: "SOP guidelines, document checklist, and targeted country intake review.", active: true },
        { name: "SOP Review & Letter of Recommendation Check", price: currentExpert.price * 2, desc: "Multiple rounds of editing and polishing for your Statement of Purpose (SOP) and resumes.", active: true },
        { name: "Full University & Visa Filing Suite", price: currentExpert.price * 5, desc: "University selection support, document evaluation, visa form filing, and slots setup.", active: true }
    ];

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];

    const availability: Record<string, boolean> = {
        "Mon-09:00 AM": true, "Mon-10:30 AM": true, "Mon-12:00 PM": false,
        "Tue-10:30 AM": true, "Tue-02:30 PM": true, "Tue-04:00 PM": true,
        "Wed-09:00 AM": true, "Wed-04:00 PM": true, "Wed-05:30 PM": false,
        "Thu-10:30 AM": true, "Thu-12:00 PM": true, "Thu-02:30 PM": false,
        "Fri-09:00 AM": true, "Fri-02:30 PM": true, "Fri-04:00 PM": true,
    };

    const successStories = [
        { title: "Canada PR Approval in 90 Days", desc: "Successfully resolved a complex dual-intent profile issue for a technology manager.", result: "Express Entry Approved" },
        { title: "Student Visa Approved After Prior Rejection", desc: "Redrafted the Statement of Purpose (SOP) highlighting strong home country ties.", result: "UK Student Visa Active" },
        { title: "H-1B Cap-Exempt Filing Success", desc: "Drafted specialized specialty occupation support letters for a non-profit researcher.", result: "Filing Approved" }
    ];

    const reviewsList = [
        { client: "Ananya Patel", rating: 5, date: "June 2, 2026", text: "Extremely professional and detailed advice. Spelled out exactly what documents VFS and embassy officers look for. Highly recommended!" },
        { client: "Rohan Sengupta", rating: 4, date: "May 28, 2026", text: "Very helpful consultation. Answered all my Express Entry score questions clearly." },
        { client: "Meera Nair", rating: 5, date: "May 15, 2026", text: "The SOP review service made a night and day difference to my university admission file." }
    ];

    const handleProceedBooking = () => {
        if (!selectedSlot) {
            alert("Please select a preferred date and time slot from the calendar.");
            return;
        }
        const activeService = services.find(s => s.name === selectedService) || services[0];
        window.location.href = `/payment/EXPERT-SECURE-${currentExpert.id}?slot=${encodeURIComponent(selectedSlot)}&service=${encodeURIComponent(activeService.name)}&amount=${activeService.price}`;
    };

    return (
        <div className="bg-white min-h-screen text-[#1A3347] font-sans pb-20">
            {/* Cover Banner */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-[#0c1a2e] to-[#1a3347] relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Profile Info Card */}
            <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-10">
                <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    {/* Portrait Avatar */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 mx-auto md:mx-0">
                        <img src={currentExpert.image} alt={currentExpert.name} className="w-full h-full object-cover rounded-3xl border-4 border-white shadow-lg" />
                        {currentExpert.isAvailableToday && (
                            <span className="absolute bottom-2 right-2 bg-emerald-500 text-white text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full border-2 border-white animate-pulse">
                                Active Now
                            </span>
                        )}
                    </div>

                    {/* Headline Detail */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2 justify-center md:justify-start">
                            <h1 className="text-2xl md:text-3xl font-extrabold font-sora text-navy leading-tight flex items-center justify-center md:justify-start gap-2">
                                {currentExpert.name} <CheckCircle className="w-5 h-5 text-red-500 fill-red-50 shrink-0" />
                            </h1>
                            <span className="inline-block bg-red-50 text-red-600 text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full border border-red-100 mx-auto md:mx-0 w-max">
                                {currentExpert.role}
                            </span>
                        </div>

                        <p className="text-sm text-gray-500 font-medium mb-4">
                            {currentExpert.experience} Years Experience · Located in {currentExpert.city} · {currentExpert.isRemote ? "Remote Available" : "In-Person Only"}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm font-semibold text-gray-500 mb-6">
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {currentExpert.rating} ({currentExpert.reviews} reviews)
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                                <Globe className="w-4 h-4 text-slate-400" /> Destination Countries: {currentExpert.countries.join(", ")}
                            </span>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                            {currentExpert.tags.map(tag => (
                                <span key={tag} className="bg-slate-50 text-slate-700 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-200">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Quick Cost Block */}
                    <div className="w-full md:w-auto shrink-0 bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center md:text-left">
                        <div className="text-[10px] font-black tracking-widest text-gray-400 mb-1">Session Rate Starts At</div>
                        <div className="text-3xl font-extrabold text-navy mb-0.5">₹{currentExpert.price.toLocaleString()}</div>
                        <div className="text-[10px] text-gray-500 mb-4 font-semibold tracking-wider">per consultation</div>
                        <button 
                            onClick={() => document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" })}
                            className="w-full bg-slate-900 text-white font-bold text-xs tracking-wider py-3 px-6 rounded-xl hover:bg-black transition-all active:scale-[0.98] shadow-sm"
                        >
                            Book Consultation
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Layout */}
            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left & Middle Column (Details, Services, Stories) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Info Details */}
                        <section className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
                            <h2 className="font-sora text-lg font-bold text-navy mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-red-500" /> About & Bio
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                Dynamic, results-driven professional specializing in immigration policies and student visa advisories. Over a decade of consulting record assisting families, employees, and students successfully transition into new international jurisdictions. Proven success in handling complex visa scenarios, visa appeal filings, study permits, and employer sponsorships.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="border border-slate-100 p-4 rounded-xl">
                                    <div className="text-[10px] font-bold text-gray-400 tracking-wider">Qualifications</div>
                                    <div className="text-xs font-bold text-navy mt-1">Certified Immigration Consultant, Legal Degree</div>
                                </div>
                                <div className="border border-slate-100 p-4 rounded-xl">
                                    <div className="text-[10px] font-bold text-gray-400 tracking-wider">Languages</div>
                                    <div className="text-xs font-bold text-navy mt-1">English, Hindi, Telugu</div>
                                </div>
                            </div>
                        </section>

                        {/* Services List */}
                        <section className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
                            <h2 className="font-sora text-lg font-bold text-navy mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-red-500" /> Services & Packages
                            </h2>
                            <div className="space-y-4">
                                {services.map(s => (
                                    <div 
                                        key={s.name} 
                                        onClick={() => setSelectedService(s.name)}
                                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                                            selectedService === s.name 
                                                ? "border-red-500 bg-red-50/20" 
                                                : "border-slate-150 hover:bg-slate-50"
                                        }`}
                                    >
                                        <div className="flex justify-between items-center mb-1.5">
                                            <div className="font-bold text-sm text-navy flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${selectedService === s.name ? "border-red-500" : "border-slate-300"}`}>
                                                    {selectedService === s.name && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                                                </div>
                                                {s.name}
                                            </div>
                                            <div className="font-black text-sm text-navy">₹{s.price.toLocaleString()}</div>
                                        </div>
                                        <p className="text-xs text-gray-400 leading-normal pl-5">{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Success Stories */}
                        <section className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
                            <h2 className="font-sora text-lg font-bold text-navy mb-5 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-red-500" /> Success Stories & Cases
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {successStories.map(story => (
                                    <div key={story.title} className="border border-slate-100 rounded-xl p-4 bg-slate-50/30 hover:shadow-md transition-shadow">
                                        <div className="text-[10px] font-black text-emerald-600 tracking-widest mb-1.5">{story.result}</div>
                                        <div className="font-bold text-xs text-navy mb-1 leading-snug">{story.title}</div>
                                        <p className="text-[10px] text-gray-400 leading-relaxed">{story.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Reviews */}
                        <section className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
                            <h2 className="font-sora text-lg font-bold text-navy mb-5 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-red-500" /> Client Testimonials ({reviewsList.length})
                            </h2>
                            <div className="space-y-4 divide-y divide-slate-50">
                                {reviewsList.map((rev, i) => (
                                    <div key={rev.client} className={`pt-4 ${i === 0 ? "pt-0" : ""}`}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <div className="font-bold text-xs text-navy">{rev.client}</div>
                                            <div className="text-[10px] text-gray-400 font-semibold">{rev.date}</div>
                                        </div>
                                        <div className="flex text-yellow-400 mb-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star key={star} className="w-3 h-3" fill={star <= rev.rating ? "currentColor" : "none"} strokeWidth={star <= rev.rating ? 0 : 1.5} />
                                            ))}
                                        </div>
                                        <p className="text-xs text-slate-500 leading-relaxed font-medium">{rev.text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column (Booking Widget Panel) */}
                    <div id="booking-section" className="space-y-6">
                        <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 shadow-xl sticky top-24">
                            <h3 className="font-sora font-extrabold text-navy text-base mb-2 flex items-center gap-1.5">
                                <Calendar className="w-5 h-5 text-red-500" /> Choose Booking Slot
                            </h3>
                            <p className="text-xs text-gray-400 mb-5 leading-normal">
                                Select from the available weekly slots to book a direct visa consultation session.
                            </p>

                            <div className="space-y-4">
                                <div className="bg-red-50/50 rounded-xl p-3 border border-red-100 mb-4 text-xs font-semibold text-red-700 flex gap-2">
                                    <Shield className="w-4 h-4 shrink-0" />
                                    <span>Escrow Protected: Money held securely until slot review finishes.</span>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-[10px] font-black text-gray-400 tracking-widest">Select Date & Time</h4>
                                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                                        {weekDays.map(day => (
                                            <div key={day} className="col-span-2 space-y-1">
                                                <div className="text-[9px] font-extrabold text-[#1A3347] tracking-wider mt-2 mb-1 pl-1">{day} (Available Slots)</div>
                                                <div className="grid grid-cols-2 gap-1.5">
                                                    {timeSlots.map(time => {
                                                        const key = `${day}-${time}`;
                                                        const isAvail = availability[key];
                                                        const isSelected = selectedSlot === key;

                                                        if (isAvail === undefined) return null;

                                                        return (
                                                            <button
                                                                key={key}
                                                                type="button"
                                                                disabled={!isAvail}
                                                                onClick={() => setSelectedSlot(key)}
                                                                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold text-center transition-all ${
                                                                    !isAvail 
                                                                        ? "bg-slate-50 text-slate-300 cursor-not-allowed border border-transparent"
                                                                        : isSelected
                                                                            ? "bg-red-500 text-white shadow-sm border border-transparent"
                                                                            : "bg-white text-navy border border-slate-200 hover:border-red-500 hover:text-red-500"
                                                                }`}
                                                            >
                                                                {time}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100 my-4" />

                                {/* Summary details before booking */}
                                <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400 font-semibold">Service:</span>
                                        <span className="font-bold text-navy truncate max-w-[150px]">{selectedService}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400 font-semibold">Selected Slot:</span>
                                        <span className="font-bold text-navy">{selectedSlot ? selectedSlot.replace("-", " at ") : "None Selected"}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-navy font-bold text-sm">Total:</span>
                                        <span className="text-lg font-extrabold text-navy">
                                            ₹{(services.find(s => s.name === selectedService)?.price || currentExpert.price).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleProceedBooking}
                                    className="w-full bg-red-500 text-white font-bold text-xs tracking-widest py-3.5 rounded-xl hover:bg-red-600 transition-all active:scale-[0.98] mt-4 shadow-md flex items-center justify-center gap-1.5"
                                >
                                    Proceed to Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
