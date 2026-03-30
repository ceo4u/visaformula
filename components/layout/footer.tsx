import { Gavel, Globe, Shield, HelpCircle, Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 w-full py-12 px-6 mt-20 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                <div className="col-span-1 md:col-span-1">
                    <div className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
                        <Gavel className="w-6 h-6 text-blue-700 dark:text-blue-400" /> VisaHub
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">The Digital Diplomat for Global Migration. Simplifying the complex for thousands of dreamers daily.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Resources</h4>
                    <ul className="space-y-3">
                        <li><a className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-600 transition-colors font-medium" href="/find-lawyer">Find Lawyer</a></li>
                        <li><a className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-600 transition-colors font-medium" href="/visa-finder">Visa Finder</a></li>
                        <li><a className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-600 transition-colors font-medium" href="/dashboard">Dashboard</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Support</h4>
                    <ul className="space-y-3">
                        <li><a className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-600 transition-colors font-medium" href="/emergency">Emergency Help</a></li>
                        <li><a className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-600 transition-colors font-medium" href="/support">Support Center</a></li>
                        <li><a className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-600 transition-colors font-medium" href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Newsletter</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">Stay updated on changing migration laws.</p>
                    <div className="flex gap-2">
                        <input className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm flex-1 focus:ring-2 focus:ring-primary px-3 py-2 outline-none" placeholder="Email" type="email" />
                        <button className="bg-primary hover:bg-primary/90 text-white px-4 rounded-lg flex items-center justify-center transition-colors">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">© 2024 VisaHub. The Digital Diplomat for Global Migration.</p>
                <div className="flex gap-6">
                    <Globe className="w-5 h-5 text-slate-400 cursor-pointer hover:text-primary transition-colors" />
                    <Shield className="w-5 h-5 text-slate-400 cursor-pointer hover:text-primary transition-colors" />
                    <HelpCircle className="w-5 h-5 text-slate-400 cursor-pointer hover:text-primary transition-colors" />
                </div>
            </div>
        </footer>
    );
}
