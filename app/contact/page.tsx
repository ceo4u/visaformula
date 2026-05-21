"use client";

import { useState, useEffect } from "react";
import { 
    Phone, Mail, MapPin, MessageSquare, 
    Sparkles, Star, Instagram, Linkedin, Twitter 
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
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy text-white px-6 py-3 rounded-full text-xs font-bold z-50 transition-all duration-300 shadow-2xl flex items-center gap-2 border border-sky-950 ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}>
            <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
            {message}
        </div>
    );
}

export default function ContactPage() {
    const [toastMsg, setToastMsg] = useState("");
    const [isToastVisible, setIsToastVisible] = useState(false);

    // Form inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [need, setNeed] = useState("Student visa");
    const [msg, setMsg] = useState("");

    const triggerToast = (text: string) => {
        setToastMsg(text);
        setIsToastVisible(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        triggerToast("📧 Thanks! Our team will reach out soon.");
        setName("");
        setEmail("");
        setPhone("");
        setMsg("");
    };

    return (
        <div className="bg-[#f7fbff] min-h-screen pb-20">
            <Toast message={toastMsg} visible={isToastVisible} onClose={() => setIsToastVisible(false)} />

            <div className="max-w-6xl mx-auto px-4 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Form */}
                    <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 shadow-sm">
                        <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest block mb-1">Get In Touch</span>
                        <h2 className="font-sora font-extrabold text-navy text-xl sm:text-2xl mb-2">We&apos;d love to hear from you</h2>
                        <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                            Questions? Feedback? Partnership request? Fill out the form and our coordination team will reply within 24 hours.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4 text-left">
                            <div>
                                <label className="text-[11px] font-bold text-navy uppercase tracking-wider mb-1 block">Full Name *</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Rajesh Kumar" 
                                    className="w-full p-3 bg-sky-50/20 border border-sky-100 rounded-xl text-xs outline-none focus:border-sky-400 font-semibold text-navy placeholder:text-gray-400"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-navy uppercase tracking-wider mb-1 block">Email Address *</label>
                                <input 
                                    type="email" 
                                    required 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="rajesh@example.com" 
                                    className="w-full p-3 bg-sky-50/20 border border-sky-100 rounded-xl text-xs outline-none focus:border-sky-400 font-semibold text-navy placeholder:text-gray-400"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-navy uppercase tracking-wider mb-1 block">Phone Number</label>
                                <input 
                                    type="tel" 
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="+91 98765 43210" 
                                    className="w-full p-3 bg-sky-50/20 border border-sky-100 rounded-xl text-xs outline-none focus:border-sky-400 font-semibold text-navy placeholder:text-gray-400"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-navy uppercase tracking-wider mb-1 block">I need help with *</label>
                                <select 
                                    value={need}
                                    onChange={e => setNeed(e.target.value)}
                                    className="w-full p-3 bg-white border border-sky-100 rounded-xl text-xs outline-none focus:border-sky-400 font-semibold text-navy"
                                >
                                    <option>Student visa</option>
                                    <option>Work permit / PR</option>
                                    <option>Tourist visa / holiday package</option>
                                    <option>Exhibition / event support</option>
                                    <option>University fair registration</option>
                                    <option>Partnership / become an expert</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-navy uppercase tracking-wider mb-1 block">Message *</label>
                                <textarea 
                                    rows={4} 
                                    required 
                                    value={msg}
                                    onChange={e => setMsg(e.target.value)}
                                    placeholder="Tell us more about your visa or travel requirements..." 
                                    className="w-full p-3 bg-sky-50/20 border border-sky-100 rounded-xl text-xs outline-none focus:border-sky-400 font-semibold text-navy placeholder:text-gray-400 resize-none"
                                />
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-sky-400 to-[#0ea5e9] text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all active:scale-[0.97] text-xs">
                                Send Message →
                            </button>
                            <p className="text-[10px] text-gray-400 text-center mt-2.5">
                                By submitting, you agree to our privacy guidelines. We strictly protect your personal details.
                            </p>
                        </form>
                    </div>

                    {/* Right Info Details */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 shadow-sm space-y-6 text-left">
                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-xl text-sky-500 shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-sora font-bold text-navy text-xs sm:text-sm">Our Headquarters</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                        Hyderabad, India (Global Hub) · WeWork, Nanakramguda, Financial District
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-xl text-sky-500 shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-sora font-bold text-navy text-xs sm:text-sm">Email Support</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                        hello@visara.com <br />
                                        experts@visara.com (partnership inquiries)
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-xl text-sky-500 shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-sora font-bold text-navy text-xs sm:text-sm">Legal & Visa Helpline</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                        +91 40 1234 5678 (Available 24/7 for urgent visa matters)
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-xl text-sky-500 shrink-0">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-sora font-bold text-navy text-xs sm:text-sm">Live Chat Hours</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                        Monday–Saturday, 10 AM – 7 PM IST (click bottom right widget)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social & Review Block */}
                        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm text-left">
                            <div className="flex gap-3 items-center mb-4">
                                <div className="text-2xl">⭐</div>
                                <div>
                                    <h4 className="font-sora font-bold text-navy text-sm">Rated 4.8/5 on Trustpilot</h4>
                                    <p className="text-[10px] text-gray-400">Based on 2,400+ verified customer reviews</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => triggerToast("📱 Following us on Instagram")} className="bg-white text-sky-500 hover:bg-sky-50 border border-sky-100 hover:border-sky-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5">
                                    <Instagram className="w-3.5 h-3.5" /> Instagram
                                </button>
                                <button onClick={() => triggerToast("💼 Connecting on LinkedIn")} className="bg-white text-sky-500 hover:bg-sky-50 border border-sky-100 hover:border-sky-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5">
                                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                                </button>
                                <button onClick={() => triggerToast("🐦 Following us on X")} className="bg-white text-sky-500 hover:bg-sky-50 border border-sky-100 hover:border-sky-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5">
                                    <Twitter className="w-3.5 h-3.5" /> X / Twitter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partnership Request Card */}
                <div className="mt-10 bg-gradient-to-r from-navy to-sky-900 rounded-2xl p-6 sm:p-8 text-center text-white border border-sky-950">
                    <h3 className="font-sora text-xl font-bold mb-1">🤝 Partnership Inquiries</h3>
                    <p className="text-white/60 text-xs sm:text-sm max-w-lg mx-auto mb-4 leading-relaxed">
                        Are you an immigration expert, visa attorney, language institute, or travel agency? Join Visara&apos;s verified partner network and grow your business today.
                    </p>
                    <button onClick={() => triggerToast("📧 Partnership request: email experts@visara.com")} className="bg-white text-navy px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-white/90 transition-all active:scale-[0.97]">
                        Become a Partner →
                    </button>
                </div>
            </div>
        </div>
    );
}
