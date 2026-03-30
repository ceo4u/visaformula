export function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 w-full py-12 px-6 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                <div className="col-span-1 md:col-span-1">
                    <div className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-700">gavel</span> VisaHub
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-['Inter'] text-sm leading-relaxed">The Digital Diplomat for Global Migration. Simplifying the complex for thousands of dreamers daily.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Resources</h4>
                    <ul className="space-y-2">
                        <li><a className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-500 transition-colors" href="#">Find Lawyer</a></li>
                        <li><a className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-500 transition-colors" href="#">Visa Finder</a></li>
                        <li><a className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-500 transition-colors" href="#">Dashboard</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Support</h4>
                    <ul className="space-y-2">
                        <li><a className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-500 transition-colors" href="#">Emergency Help</a></li>
                        <li><a className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-500 transition-colors" href="#">Privacy Policy</a></li>
                        <li><a className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-500 transition-colors" href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Newsletter</h4>
                    <p className="text-sm text-slate-500 mb-4">Stay updated on changing migration laws.</p>
                    <div className="flex gap-2">
                        <input className="bg-white border-none rounded-lg text-sm flex-1 focus:ring-2 focus:ring-primary" placeholder="Email" type="email" />
                        <button className="bg-primary text-white p-2 rounded-lg">
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 bg-slate-200 dark:bg-slate-800 h-[1px]"></div>
            <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 dark:text-slate-400 font-['Inter'] text-sm">© 2024 VisaHub. The Digital Diplomat for Global Migration.</p>
                <div className="flex gap-6">
                    <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary">language</span>
                    <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary">shield</span>
                    <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary">help</span>
                </div>
            </div>
        </footer>
    );
}
