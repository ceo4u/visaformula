import { Gavel, Globe, Shield, HelpCircle, Send, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full py-16 px-6 mt-20 border-t border-slate-200/60 bg-[#FAFAFA]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
                <div className="col-span-1 md:col-span-1">
                    <div className="text-xl font-medium text-slate-900 mb-4 flex items-center gap-2.5 tracking-tight">
                        <Gavel className="w-6 h-6 text-[#5B58F6]" /> VisaHub
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">The Digital Diplomat for Global Migration. Simplifying the complex for thousands of dreamers daily.</p>
                </div>
                <div>
                    <h4 className="font-medium text-slate-900 text-sm tracking-wide uppercase mb-5">Resources</h4>
                    <ul className="space-y-3">
                        <li><Link className="text-slate-500 text-sm hover:text-[#5B58F6] transition-colors font-light" href="/find-lawyer">Find Lawyer</Link></li>
                        <li><Link className="text-slate-500 text-sm hover:text-[#5B58F6] transition-colors font-light" href="/dashboard">Dashboard</Link></li>
                        <li><Link className="text-slate-500 text-sm hover:text-[#5B58F6] transition-colors font-light" href="/about">About</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium text-slate-900 text-sm tracking-wide uppercase mb-5">Support</h4>
                    <ul className="space-y-3">
                        <li><Link className="text-slate-500 text-sm hover:text-[#5B58F6] transition-colors font-light" href="/emergency">Emergency Help</Link></li>
                        <li><Link className="text-slate-500 text-sm hover:text-[#5B58F6] transition-colors font-light" href="/support">Support Center</Link></li>
                        <li><Link className="text-slate-500 text-sm hover:text-[#5B58F6] transition-colors font-light" href="#">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium text-slate-900 text-sm tracking-wide uppercase mb-5">Newsletter</h4>
                    <p className="text-sm text-slate-500 mb-4 font-light">Stay updated on changing migration laws.</p>
                    <div className="flex gap-2">
                        <input
                            className="bg-white border border-slate-200/80 rounded-full text-sm flex-1 focus:ring-2 focus:ring-[#5B58F6] px-4 py-2.5 outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_1px_0_rgba(255,255,255,1)]"
                            placeholder="Email"
                            type="email"
                        />
                        <button className="bg-slate-900 hover:bg-[#5B58F6] text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-400 text-sm font-light">© 2026 VisaHub. The Digital Diplomat for Global Migration.</p>
                <div className="flex gap-6">
                    <Globe className="w-5 h-5 text-slate-400 cursor-pointer hover:text-[#5B58F6] transition-colors" />
                    <Shield className="w-5 h-5 text-slate-400 cursor-pointer hover:text-[#5B58F6] transition-colors" />
                    <HelpCircle className="w-5 h-5 text-slate-400 cursor-pointer hover:text-[#5B58F6] transition-colors" />
                </div>
            </div>
        </footer>
    );
}
