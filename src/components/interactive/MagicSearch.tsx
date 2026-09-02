import { useState, useEffect } from "react";
import { Search, Globe, MapPin, Briefcase, ChevronDown } from "lucide-react";

const countries = ["India", "Pakistan", "Bangladesh", "Nepal", "Sri Lanka", "Nigeria", "Philippines", "Brazil", "UAE", "China", "Other"];
const residingCountries = ["India", "USA", "Canada", "UK", "Australia", "UAE", "Germany", "Other"];
const destinationCountries = ["USA", "Canada", "UK", "Australia", "Germany", "New Zealand", "Ireland", "Singapore"];
const visaTypes = ["Student Visa", "Work Visa", "Visit / Tourist Visa", "PR / Residency Visa", "Business Visa", "Spouse / Dependent Visa", "Visa Appeal", "Transit Visa", "Other"];
const purposes = ["Study", "Work", "Tourist", "Visa Appeal", "PR"];

function CustomSelect({
    label,
    value,
    onChange,
    options,
    placeholder,
    icon: Icon,
    onOpenCheck
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: string[];
    placeholder: string;
    icon: any;
    onOpenCheck: (e: any) => boolean;
}) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const clickOutside = () => setIsOpen(false);
        window.addEventListener("click", clickOutside);
        return () => window.removeEventListener("click", clickOutside);
    }, [isOpen]);

    return (
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <label className="text-[11px] font-bold text-gray-500 tracking-wider mb-1.5 block">{label}</label>
            <div className="relative">
                <Icon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <button
                    type="button"
                    onClick={(e) => {
                        if (onOpenCheck(e)) {
                            setIsOpen(!isOpen);
                        }
                    }}
                    className="w-full pl-10 pr-10 py-3 bg-red-50/50 border border-red-100 rounded-xl text-sm font-medium text-left outline-none focus:border-[#ef4444] focus:ring-2 focus:ring-red-100 transition-all cursor-pointer flex items-center justify-between h-[48px]"
                >
                    <span className={value ? "text-navy font-semibold" : "text-gray-450"}>{value || placeholder}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl mt-1.5 py-1.5 z-50 max-h-56 overflow-y-auto font-sans">
                        {options.map(o => (
                            <button
                                key={o}
                                type="button"
                                onClick={() => { onChange(o); setIsOpen(false); }}
                                className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-black hover:text-white transition-colors"
                            >
                                {o}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export function MagicSearch({ className = "" }: { className?: string }) {
    const [passport, setPassport] = useState("");
    const [residing, setResiding] = useState("");
    const [lookingForVisa, setLookingForVisa] = useState("");
    const [destination, setDestination] = useState("");
    const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
    const [validationError, setValidationError] = useState(false);

    const checkAuthAndPrevent = (e: React.MouseEvent | React.FocusEvent) => {
        if (typeof window !== "undefined") {
            const seekerFirst = localStorage.getItem("seeker_firstName");
            const expertBusiness = localStorage.getItem("expert_businessName");
            const userStr = (localStorage.getItem("travltik_user"));
            const isLoggedIn = seekerFirst || expertBusiness || (userStr && userStr !== "null");

            if (!isLoggedIn) {
                e.preventDefault();
                e.stopPropagation();
                if (e.target && 'blur' in e.target) {
                    (e.target as any).blur();
                }
                const targetRedirect = window.location.pathname + window.location.search;
                window.location.href = `/login?redirect=${encodeURIComponent(targetRedirect || '/find-experts')}`;
                return false;
            }
        }
        return true;
    };

    const togglePurpose = (p: string) => {
        setSelectedPurposes(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
    };

    const handleSearch = () => {
        if (typeof window !== "undefined") {
            const seekerFirst = localStorage.getItem("seeker_firstName");
            const expertBusiness = localStorage.getItem("expert_businessName");
            const userStr = localStorage.getItem("travltik_user");
            const isLoggedIn = seekerFirst || expertBusiness || (userStr && userStr !== "null");
            if (!isLoggedIn) {
                window.location.href = `/login?redirect=/find-experts`;
                return;
            }
        }

        if (!passport || !residing || !lookingForVisa || !destination) {
            setValidationError(true);
            return;
        }
        setValidationError(false);
        const params = new URLSearchParams();
        
        if (lookingForVisa) {
            const visa = lookingForVisa.toLowerCase();
            if (visa.includes("student")) {
                params.set("category", "student");
            } else if (visa.includes("work")) {
                params.set("category", "work");
            } else if (visa.includes("pr") || visa.includes("residency")) {
                params.set("category", "pr");
            }
        }

        if (destination) {
            params.set("country", destination);
        }

        if (passport) params.set("passport", passport);
        if (residing) params.set("residing", residing);
        window.location.href = `/find-experts?${params.toString()}`;
    };

    return (
        <div className={`bg-white rounded-2xl shadow-card border border-red-100 p-6 ${className}`}>
            <h3 className="font-sans font-bold text-lg text-navy mb-5">Find the right expert for your visa journey</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Passport */}
                <CustomSelect
                    label="Passport / Citizenship"
                    value={passport}
                    onChange={setPassport}
                    options={countries}
                    placeholder="Select country"
                    icon={Globe}
                    onOpenCheck={checkAuthAndPrevent}
                />

                {/* Residing */}
                <CustomSelect
                    label="Currently Residing In"
                    value={residing}
                    onChange={setResiding}
                    options={residingCountries}
                    placeholder="Select country"
                    icon={MapPin}
                    onOpenCheck={checkAuthAndPrevent}
                />

                {/* Looking For (Visa Types) */}
                <CustomSelect
                    label="Looking for"
                    value={lookingForVisa}
                    onChange={setLookingForVisa}
                    options={visaTypes}
                    placeholder="Select visa type"
                    icon={Briefcase}
                    onOpenCheck={checkAuthAndPrevent}
                />

                {/* Destination (Countries) */}
                <CustomSelect
                    label="Destination"
                    value={destination}
                    onChange={setDestination}
                    options={destinationCountries}
                    placeholder="Select destination"
                    icon={Globe}
                    onOpenCheck={checkAuthAndPrevent}
                />
            </div>

            {/* Purpose Chips */}
            <div className="mb-5">
                <label className="text-[11px] font-bold text-gray-500 tracking-wider mb-2 block">Purpose</label>
                <div className="flex flex-wrap gap-2">
                    {purposes.map(p => (
                        <button
                            key={p}
                            onClick={(e) => { if (checkAuthAndPrevent(e)) togglePurpose(p); }}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedPurposes.includes(p)
                                    ? "bg-red-500 text-white shadow-sm"
                                    : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {validationError && (
                <p className="text-red-500 text-[11px] font-bold text-center mb-3.5 animate-pulse font-sans">
                    ⚠️ Please select all options (Passport, Residing, Looking for & Destination) before searching.
                </p>
            )}

            <button
                onClick={(e) => { if (checkAuthAndPrevent(e)) handleSearch(); }}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-base hover:bg-neutral-900 hover:shadow-lg hover:shadow-neutral-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <Search className="w-5 h-5" />
                Find Experts
            </button>
        </div>
    );
}
