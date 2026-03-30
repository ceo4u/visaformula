export function MobileNav() {
    return (
        <nav className="fixed bottom-0 w-full rounded-t-2xl z-50 md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-around items-center pt-3 pb-8 px-4">
                <a className="flex flex-col items-center text-blue-700 dark:text-blue-400" href="/">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                    <span className="font-['Inter'] text-[11px] font-medium">Home</span>
                </a>
                <a className="flex flex-col items-center text-slate-500 dark:text-slate-500" href="/search">
                    <span className="material-symbols-outlined">search</span>
                    <span className="font-['Inter'] text-[11px] font-medium">Search</span>
                </a>
                <a className="flex flex-col items-center text-slate-500 dark:text-slate-500" href="/apps">
                    <span className="material-symbols-outlined">description</span>
                    <span className="font-['Inter'] text-[11px] font-medium">Apps</span>
                </a>
                <a className="flex flex-col items-center text-slate-500 dark:text-slate-500" href="/profile">
                    <span className="material-symbols-outlined">person</span>
                    <span className="font-['Inter'] text-[11px] font-medium">Profile</span>
                </a>
            </div>
        </nav>
    );
}
