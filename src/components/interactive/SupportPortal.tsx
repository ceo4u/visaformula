import { useState, useEffect } from "react";
import { 
    MessageCircle, Phone, Mail, Clock, ChevronDown, Send, 
    Search, HelpCircle, FileText, CreditCard, Shield, 
    Users, ArrowRight, CheckCircle, Headphones, Sparkles, MapPin, Building, Globe
} from "lucide-react";

// Toast Helper
function Toast({ message, visible, onClose }: { message: string, visible: boolean, onClose: () => void }) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(onClose, 2600);
            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c1a2e] text-white px-6 py-3 rounded-full text-xs font-bold z-50 transition-all duration-300 shadow-2xl flex items-center gap-2 border border-amber-900/50 ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}>
            <Sparkles className="w-4 h-4 text-[#f59e0b] animate-pulse" />
            {message}
        </div>
    );
}

const faqs = [
    {
        question: "How do I book a consultation with a lawyer?",
        answer: "Simply use our 'Find Lawyer' page to browse verified experts. Select your preferred lawyer, choose a time slot, and complete the payment. You'll receive a confirmation email with a secure video call link.",
    },
    {
        question: "Is my personal information secure?",
        answer: "Yes. We use bank-grade 256-bit encryption for all data. Your documents are stored in secure servers and only accessible to you and your assigned legal representative.",
    },
    {
        question: "What is your refund policy?",
        answer: "We offer a 100% satisfaction guarantee. If your initial consultation doesn't meet expectations, request a full refund within 48 hours of the scheduled call.",
    },
    {
        question: "How are lawyers verified?",
        answer: "Every lawyer undergoes rigorous background checks including bar association verification, professional liability insurance, and client review analysis.",
    },
    {
        question: "What should I do in a visa emergency?",
        answer: "Use the red 'Emergency Help' button available 24/7. You'll be connected to an emergency response specialist within 15 minutes.",
    },
    {
        question: "Can I track my application status?",
        answer: "Yes! Your dashboard shows real-time updates for all active applications, including document status and next steps.",
    },
];

export function SupportPortal() {
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [toastMsg, setToastMsg] = useState("");
    const [isToastVisible, setIsToastVisible] = useState(false);
    
    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [visaType, setVisaType] = useState("Student Visa");
    const [message, setMessage] = useState("");

    const triggerToast = (msg: string) => {
        setToastMsg(msg);
        setIsToastVisible(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !phone || !visaType) {
            triggerToast("⚠️ Please fill in Name, Email, Phone, and select a Visa Type.");
            return;
        }
        triggerToast("✉️ Message sent successfully! We'll reply within 24 hours.");
        setName("");
        setEmail("");
        setPhone("");
        setVisaType("Student Visa");
        setMessage("");
    };

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="bg-[#f0f9fa] min-h-screen pb-24 font-sans selection:bg-teal-500/20 selection:text-teal-700">
            <Toast message={toastMsg} visible={isToastVisible} onClose={() => setIsToastVisible(false)} />

            {/* Offices & Contact Section Header */}
            <div className="pt-24 pb-8 text-center max-w-3xl mx-auto px-4">
                <h1 className="text-[#0e4b75] font-sans text-4xl font-extrabold tracking-tight mb-2">
                    Contact Us
                </h1>
                <p className="text-sky-600 text-sm font-semibold leading-relaxed">
                    We're here to help you. Reach out via email or phone, or submit the contact form below.
                </p>
            </div>

            {/* Primary Contacts: Visible First */}
            <div className="max-w-6xl mx-auto px-4 mb-12">
                <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <div className="bg-black text-white rounded-[24px] p-6 text-center border border-slate-850 shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-all">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/5 rounded-full blur-xl pointer-events-none" />
                        <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-4 mx-auto">
                            <Phone className="w-5 h-5 text-teal-300" />
                        </div>
                        <span className="text-[10px] font-black text-teal-300 tracking-widest block mb-1">Call Us</span>
                        <a href="tel:+917661989366" className="text-lg font-extrabold hover:text-teal-200 transition-colors hover:underline">
                            +91 766 1989 366
                        </a>
                    </div>

                    <div className="bg-black text-white rounded-[24px] p-6 text-center border border-slate-850 shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-all">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/5 rounded-full blur-xl pointer-events-none" />
                        <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-4 mx-auto">
                            <Mail className="w-5 h-5 text-teal-300" />
                        </div>
                        <span className="text-[10px] font-black text-teal-300 tracking-widest block mb-1">Email Us</span>
                        <a href="mailto:support@travltik.com" className="text-lg font-extrabold hover:text-teal-200 transition-colors hover:underline">
                            support@travltik.com
                        </a>
                    </div>
                </div>
            </div>

            {/* Address and Contact Form Grid */}
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Address Details */}
                <div className="md:col-span-5 bg-black text-white rounded-[24px] p-8 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between border border-slate-850">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="space-y-8 relative z-10">
                        <div>
                            <span className="text-[9px] font-black tracking-widest text-teal-300 block mb-2">
                                Headquarters
                            </span>
                            <h2 className="text-2xl font-extrabold tracking-tight mb-4 text-white">
                                Visas Formula Offices
                            </h2>
                        </div>

                        {/* Head Office Address */}
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                                <MapPin className="w-4.5 h-4.5 text-teal-300" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-extrabold text-xs text-teal-300 tracking-wider">Head Office</h4>
                                <p className="text-sm text-sky-100 font-bold leading-relaxed">
                                    11-5-334/1/B Red Hills<br />Hyderabad, Telangana – 500004
                                </p>
                            </div>
                        </div>

                        {/* Other Locations */}
                        <div className="flex gap-4 border-t border-white/5 pt-6">
                            <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                                <Globe className="w-4.5 h-4.5 text-teal-300" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-extrabold text-xs text-teal-300 tracking-wider">Other Branches</h4>
                                <p className="text-xs text-sky-200 font-semibold leading-relaxed">
                                    Raheja Mindspace IT Park Madhapur, Jubilee Hills, Bengaluru, Chennai, Kochi, and Mumbai.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 mt-8 pt-6">
                        <div className="flex text-[9px] font-bold tracking-widest text-teal-300 justify-center">
                             <span>India</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="md:col-span-7 bg-white rounded-[24px] p-8 sm:p-10 shadow-xl border border-sky-100/50">
                    <div className="mb-6">
                        <h2 className="text-[#0e4b75] font-sans text-2xl font-extrabold">Send a Message</h2>
                        <p className="text-xs text-sky-500 font-semibold mt-1">Fill out the details below and we will get back to you within 24 hours.</p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-[#0e4b75] tracking-wider">Full Name *</label>
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name" 
                                className="w-full px-4 h-12 text-xs font-semibold rounded-xl border border-sky-100 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder-gray-300 shadow-sm"
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-[#0e4b75] tracking-wider">Email Address *</label>
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email" 
                                    className="w-full px-4 h-12 text-xs font-semibold rounded-xl border border-sky-100 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder-gray-300 shadow-sm"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-[#0e4b75] tracking-wider">Phone Number *</label>
                                <input 
                                    type="tel" 
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your phone number" 
                                    className="w-full px-4 h-12 text-xs font-semibold rounded-xl border border-sky-100 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder-gray-300 shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-[#0e4b75] tracking-wider">Type of Visa looking for *</label>
                            <div className="relative">
                                <select 
                                    required
                                    value={visaType}
                                    onChange={(e) => setVisaType(e.target.value)}
                                    className="w-full px-4 h-12 text-xs font-bold rounded-xl border border-sky-100 focus:outline-none focus:ring-1 focus:ring-sky-500 appearance-none bg-white cursor-pointer shadow-sm"
                                >
                                    <option value="Student Visa">Student Visa</option>
                                    <option value="Job Visa">Job Visa</option>
                                    <option value="Visit Visa">Visit Visa</option>
                                    <option value="Migration Visa">Migration Visa</option>
                                    <option value="Other">Other</option>
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-[#0e4b75] tracking-wider">Message / Requirements</label>
                            <textarea 
                                rows={4} 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell us more about your case..."
                                className="w-full px-4 py-3 text-xs font-semibold rounded-xl border border-sky-100 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder-gray-300 resize-none shadow-sm"
                            ></textarea>
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="w-full bg-black hover:bg-slate-900 text-white font-extrabold text-xs py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                                Submit Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Optional FAQ Section */}
            <div className="max-w-6xl mx-auto px-4 border-t border-gray-200/50 pt-16">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-[10px] font-black text-slate-500 tracking-widest block mb-1">FAQs</span>
                    <h2 className="font-sans font-extrabold text-[#0c1a2e] text-2xl">Frequently Asked Questions</h2>
                </div>
                
                <div className="max-w-2xl mx-auto space-y-3">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className={`bg-white rounded-2xl border transition-all duration-300 ${openFaq === idx ? "border-slate-300 shadow-md scale-[1.005]" : "border-slate-200"}`}>
                            <button
                                className="w-full p-5 text-left flex justify-between items-center"
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                            >
                                <span className={`font-bold text-sm pr-4 text-[#0c1a2e]`}>{faq.question}</span>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === idx ? "bg-black text-white" : "bg-slate-50 text-slate-400"}`}>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                                </div>
                            </button>
                            {openFaq === idx && (
                                <div className="px-5 pb-5 pt-1">
                                    <div className="h-[1px] w-full bg-slate-100 mb-3" />
                                    <p className="text-xs text-gray-500 leading-relaxed font-semibold">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

