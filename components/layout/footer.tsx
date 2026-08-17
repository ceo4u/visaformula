import Link from "next/link";
import { Globe } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#070b12] text-white pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
                    <div className="col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-5">
                            <Globe className="w-5 h-5 text-[#38bdf8]" />
                            <span className="text-2xl font-extrabold tracking-tight text-white">TravlTik</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            The Digital Diplomat for Global Migration. Simplifying the complex for thousands of dreamers daily.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-5 uppercase text-[11px] tracking-widest text-slate-500">Visa Types</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link className="hover:text-white transition-colors" href="/find-lawyer">Study Visas</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/find-lawyer">Work Permits</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/find-lawyer">Family Reunification</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/find-lawyer">PR & Citizenship</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-5 uppercase text-[11px] tracking-widest text-slate-500">Resources</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link className="hover:text-white transition-colors" href="/support">Support Center</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/about">About TravlTik</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/emergency">Emergency Help</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/ai-assistant">AI Assistant</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-5 uppercase text-[11px] tracking-widest text-slate-500">Legal</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="#">Terms of Service</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="#">Verification Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-5 uppercase text-[11px] tracking-widest text-slate-500">Business</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link className="hover:text-white transition-colors" href="/signup/expert">List your Firm</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/dashboard">Expert Dashboard</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/support">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <div className="flex gap-6 font-semibold">
                        <Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link>
                        <Link className="hover:text-white transition-colors" href="#">Terms of Service</Link>
                    </div>
                    <p className="font-medium">© {new Date().getFullYear()} TravlTik. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
