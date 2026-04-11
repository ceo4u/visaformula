import Link from "next/link";
import { Gavel } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-neutral-900 text-white py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    <div className="col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <Gavel className="w-5 h-5 text-white" />
                            <span className="text-2xl font-black tracking-tighter text-white uppercase">VisaHub</span>
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                            The Digital Diplomat for Global Migration. Simplifying the complex for thousands of dreamers daily.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-neutral-500">Visa Types</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link className="hover:text-white transition-colors" href="/find-lawyer">Study Visas</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/find-lawyer">Work Permits</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/find-lawyer">Family Reunification</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/find-lawyer">PR & Citizenship</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-neutral-500">Resources</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link className="hover:text-white transition-colors" href="/support">Support Center</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/about">About VisaHub</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/emergency">Emergency Help</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="#">Fee Calculator</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-neutral-500">Legal</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="#">Terms of Service</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="#">Verification Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-neutral-500">Business</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link className="hover:text-white transition-colors" href="#">List your Firm</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/dashboard">Expert Dashboard</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="#">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500 font-bold uppercase tracking-widest">
                    <div className="flex gap-8">
                        <Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link>
                        <Link className="hover:text-white transition-colors" href="#">Terms of Service</Link>
                    </div>
                    <p>© {new Date().getFullYear()} VisaHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
