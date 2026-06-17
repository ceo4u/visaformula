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
    const [city, setCity] = useState("");
    const [destination, setDestination] = useState("");
    const [userType, setUserType] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [qualification, setQualification] = useState("");
    const [message, setMessage] = useState("");

    const triggerToast = (msg: string) => {
        setToastMsg(msg);
        setIsToastVisible(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !phone || !message) {
            triggerToast("⚠️ Please fill in name, email, phone, and message.");
            return;
        }
        triggerToast("✉️ Message sent successfully! We'll reply within 24 hours.");
        setName("");
        setEmail("");
        setPhone("");
        setCity("");
        setDestination("");
        setUserType("");
        setCompanyName("");
        setQualification("");
        setMessage("");
    };

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#fff5f5] min-h-screen pb-24 font-sans selection:bg-primary/20 selection:text-primary">
            <Toast message={toastMsg} visible={isToastVisible} onClose={() => setIsToastVisible(false)} />

            {/* Offices & Contact Section Header */}
            <div className="pt-24 pb-8 text-center max-w-3xl mx-auto px-4">
                <h1 className="text-[#0c1a2e] font-sans text-3xl font-extrabold tracking-tight mb-2">
                    Our Offices
                </h1>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    Connect with us across our multiple locations. We're here to help you achieve your global education dreams.
                </p>
            </div>

            {/* Main Offices Banner Container */}
            <div className="max-w-6xl mx-auto px-4 mb-6">
                <div className="bg-gradient-to-br from-[#0c1a2e] to-[#071324] text-white rounded-[24px] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                    {/* Background glow effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="grid md:grid-cols-12 gap-8 items-start relative z-10">
                        {/* Left Side: Office Locations */}
                        <div className="md:col-span-7 space-y-6">
                            {/* Head Office */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-4.5 h-4.5 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-extrabold text-sm text-white tracking-wide uppercase">Head Office</h4>
                                    <p className="text-xs text-gray-300 font-medium leading-relaxed">
                                        5th Floor, Block A, Jubilee Square, Road No. 36,<br />Jubilee Hills, Hyderabad, Telangana – 500033
                                    </p>
                                </div>
                            </div>

                            {/* Corporate Office */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <Building className="w-4.5 h-4.5 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-extrabold text-sm text-white tracking-wide uppercase">Corporate Office</h4>
                                    <p className="text-xs text-gray-300 font-medium leading-relaxed">
                                        Level 2, Building 12B, Raheja Mindspace IT Park, Madhapur, Hyderabad – 500081
                                    </p>
                                </div>
                            </div>

                            {/* Other Branches */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <Globe className="w-4.5 h-4.5 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-extrabold text-sm text-white tracking-wide uppercase">Other Branches</h4>
                                    <p className="text-xs text-gray-300 font-medium leading-relaxed">
                                        Bengaluru, Chennai, Kochi, and Mumbai
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Connecting message & details */}
                        <div className="md:col-span-5 flex flex-col justify-between h-full space-y-6">
                            <div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 block mb-2">
                                    ONE PORTAL. GLOBAL OPPORTUNITIES.
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-sans tracking-tight mb-4">
                                    Global Pathways.<br />Trusted Guidance.
                                </h2>
                                
                                <div className="flex flex-wrap gap-2.5 mb-5">
                                    <span className="bg-slate-100 text-[#0c1a2e] font-extrabold text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                        Education Consultants
                                    </span>
                                    <span className="bg-white text-[#0c1a2e] font-extrabold text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                        Students
                                    </span>
                                </div>

                                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                                    Empowering students and consultants through a trusted international education network across multiple countries.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Strip: Countries horizontal bar */}
                    <div className="border-t border-white/10 mt-8 pt-6 flex justify-center">
                        <div className="flex gap-6 sm:gap-8 flex-wrap justify-center text-[10px] font-extrabold uppercase tracking-widest text-slate-350">
                             <span>India</span>
                             <span className="text-white/20">•</span>
                             <span>Nepal</span>
                             <span className="text-white/20">•</span>
                             <span>Bangladesh</span>
                             <span className="text-white/20">•</span>
                             <span>Sri Lanka</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Container: Get In Touch With Us banner */}
            <div className="max-w-6xl mx-auto px-4 mb-8">
                <div className="bg-white border border-slate-200 text-[#0c1a2e] rounded-[24px] py-6 px-8 shadow-sm text-center">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#0c1a2e] mb-4">Get In Touch With Us</h3>
                    <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-2">
                                <Mail className="w-4.5 h-4.5 text-[#0c1a2e]" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email Us</span>
                            <a href="mailto:support@visaformula.com" className="text-xs font-extrabold text-[#0c1a2e] hover:underline">
                                support@visaformula.com
                            </a>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-2">
                                <Phone className="w-4.5 h-4.5 text-[#0c1a2e]" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Call Us</span>
                            <a href="tel:+914048517171" className="text-xs font-extrabold text-[#0c1a2e] hover:underline">
                                +91 40 4851 7171 | +91 90000 84850
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Third Container: Send us a Message White Form Card */}
            <div className="max-w-2xl mx-auto px-4 mb-16">
                <div className="bg-white rounded-[24px] p-8 sm:p-10 shadow-xl border border-yellow-100/30">
                    <div className="text-center mb-8">
                        <h2 className="text-[#0c1a2e] font-sans text-2xl font-extrabold">Send us a Message</h2>
                        <p className="text-xs text-gray-400 font-semibold mt-1">We'll get back to you within 24 hours.</p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        {/* Name and Email */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name" 
                                    className="w-full px-4 h-11 text-xs font-semibold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] placeholder-gray-300"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email" 
                                    className="w-full px-4 h-11 text-xs font-semibold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] placeholder-gray-300"
                                />
                            </div>
                        </div>

                        {/* Phone and City */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone</label>
                                <input 
                                    type="tel" 
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your phone number" 
                                    className="w-full px-4 h-11 text-xs font-semibold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] placeholder-gray-300"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">City</label>
                                <input 
                                    type="text" 
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Enter Your City" 
                                    className="w-full px-4 h-11 text-xs font-semibold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] placeholder-gray-300"
                                />
                            </div>
                        </div>

                        {/* Destination and Are you a Company or Student */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Preferred Destination</label>
                                <input 
                                    type="text" 
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Enter Preferred Destination" 
                                    className="w-full px-4 h-11 text-xs font-semibold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] placeholder-gray-300"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Are You A Company Or Student</label>
                                <div className="relative">
                                    <select 
                                        value={userType}
                                        onChange={(e) => setUserType(e.target.value)}
                                        className="w-full px-4 h-11 text-xs font-bold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="">Select</option>
                                        <option value="student">Student</option>
                                        <option value="company">Company</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Company Name and Qualification */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Company Name</label>
                                <input 
                                    type="text" 
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Enter your Company Name" 
                                    className="w-full px-4 h-11 text-xs font-semibold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] placeholder-gray-300"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Highest Qualification</label>
                                <input 
                                    type="text" 
                                    value={qualification}
                                    onChange={(e) => setQualification(e.target.value)}
                                    placeholder="Enter your Qualification" 
                                    className="w-full px-4 h-11 text-xs font-semibold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] placeholder-gray-300"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Message</label>
                            <textarea 
                                rows={4} 
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell us about your requirements..."
                                className="w-full px-4 py-3 text-xs font-semibold rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] placeholder-gray-300 resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-2">
                            <button type="submit" className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Optional FAQ Section */}
            <div className="max-w-6xl mx-auto px-4 border-t border-gray-200/50 pt-16">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-[10px] font-black text-[#f59e0b] uppercase tracking-widest block mb-1">FAQs</span>
                    <h2 className="font-sora font-extrabold text-[#0c1a2e] text-2xl">Frequently Asked Questions</h2>
                </div>
                
                <div className="max-w-2xl mx-auto space-y-3">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className={`bg-white rounded-2xl border transition-all duration-300 ${openFaq === idx ? "border-[#f59e0b] shadow-md" : "border-yellow-100/50"}`}>
                            <button
                                className="w-full p-5 text-left flex justify-between items-center"
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                            >
                                <span className={`font-bold text-sm pr-4 ${openFaq === idx ? "text-[#f59e0b]" : "text-[#0c1a2e]"}`}>{faq.question}</span>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === idx ? "bg-[#f59e0b] text-white" : "bg-yellow-50 text-amber-700"}`}>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                                </div>
                            </button>
                            {openFaq === idx && (
                                <div className="px-5 pb-5 pt-1">
                                    <div className="h-[1px] w-full bg-yellow-50 mb-3" />
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

