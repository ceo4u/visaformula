import React from "react";
import {
    RefreshCw,
    Luggage,
    ShieldAlert,
    ShieldCheck,
    DollarSign,
    Zap,
    Check,
    Plus,
    FileText,
    Plane,
    Building2,
    Laptop,
    FileEdit,
    Layers,
    Compass,
    Sparkles,
    Lock,
    Bookmark,
    CalendarCheck,
    Globe,
    CreditCard
} from "lucide-react";
import { getFlagEmoji } from "../utils/countryHelpers";
import type { LuggageItem } from "../types";

// Apple iOS squircle icon renderer for luggage items
function renderIosLuggageIcon(id: string) {
    const iconClass = "w-4.5 h-4.5 text-white stroke-[2.2]";
    const map: Record<string, { bg: string; icon: React.ReactNode }> = {
        cabin_passport: { bg: 'bg-blue-500', icon: <FileText className={iconClass} /> },
        cabin_tickets: { bg: 'bg-sky-500', icon: <Plane className={iconClass} /> },
        cabin_hotel: { bg: 'bg-purple-500', icon: <Building2 className={iconClass} /> },
        cabin_meds: { bg: 'bg-rose-500', icon: <ShieldAlert className={iconClass} /> },
        cabin_powerbank: { bg: 'bg-amber-500', icon: <Zap className={iconClass} /> },
        cabin_electronics: { bg: 'bg-indigo-600', icon: <Laptop className={iconClass} /> },
        cabin_forex: { bg: 'bg-emerald-500', icon: <DollarSign className={iconClass} /> },
        cabin_pen: { bg: 'bg-slate-700', icon: <FileEdit className={iconClass} /> },
        checked_clothes: { bg: 'bg-teal-500', icon: <Layers className={iconClass} /> },
        checked_shoes: { bg: 'bg-orange-500', icon: <Compass className={iconClass} /> },
        checked_toiletries: { bg: 'bg-cyan-500', icon: <Sparkles className={iconClass} /> },
        checked_docs_copy: { bg: 'bg-blue-600', icon: <FileText className={iconClass} /> },
        checked_lock: { bg: 'bg-zinc-700', icon: <Lock className={iconClass} /> },
        checked_tag: { bg: 'bg-amber-600', icon: <Bookmark className={iconClass} /> },
        prep_webcheckin: { bg: 'bg-violet-500', icon: <CalendarCheck className={iconClass} /> },
        prep_insurance: { bg: 'bg-emerald-600', icon: <ShieldCheck className={iconClass} /> },
        prep_esim: { bg: 'bg-pink-500', icon: <Globe className={iconClass} /> },
        prep_bank: { bg: 'bg-emerald-500', icon: <CreditCard className={iconClass} /> },
        prep_embassy: { bg: 'bg-slate-800', icon: <Building2 className={iconClass} /> },
    };

    const item = map[id] || { bg: 'bg-slate-700', icon: <Luggage className={iconClass} /> };
    return (
        <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shrink-0 shadow-2xs`}>
            {item.icon}
        </div>
    );
}

interface PreDepartureLuggageProps {
    selectedDestination: string;
    selectedPurpose: string;
    isFetchingPreDepartureAi: boolean;
    fetchPreDepartureAi: (dest?: string) => Promise<void>;
    luggageProgress: { packed: number; total: number; percent: number };
    luggageActiveSection: 'all' | 'cabin' | 'checked' | 'predeparture';
    setLuggageActiveSection: (sec: 'all' | 'cabin' | 'checked' | 'predeparture') => void;
    defaultLuggageItems: {
        cabin: Array<{ id: string; title: string; hint: string; icon?: string }>;
        checked: Array<{ id: string; title: string; hint: string; icon?: string }>;
        predeparture: Array<{ id: string; title: string; hint: string; icon?: string }>;
    };
    customLuggageItems: LuggageItem[];
    luggageChecklist: Record<string, boolean>;
    toggleLuggageItem: (itemId: string) => void;
    newLuggageCategory: 'cabin' | 'checked' | 'predeparture';
    setNewLuggageCategory: (cat: 'cabin' | 'checked' | 'predeparture') => void;
    newLuggageItemText: string;
    setNewLuggageItemText: (text: string) => void;
    handleAddCustomLuggageItem: (e?: React.FormEvent) => void;
}

export const PreDepartureLuggage: React.FC<PreDepartureLuggageProps> = ({
    selectedDestination,
    selectedPurpose,
    isFetchingPreDepartureAi,
    fetchPreDepartureAi,
    luggageProgress,
    luggageActiveSection,
    setLuggageActiveSection,
    defaultLuggageItems,
    customLuggageItems,
    luggageChecklist,
    toggleLuggageItem,
    newLuggageCategory,
    setNewLuggageCategory,
    newLuggageItemText,
    setNewLuggageItemText,
    handleAddCustomLuggageItem
}) => {
    return (
        <div className="space-y-6 animate-fade-up">
            {/* Header & Destination Control */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-2 py-0.5 rounded-md">
                                TRAVEL READINESS • PACKING & CUSTOMS
                            </span>
                            <span className="text-xs text-slate-400 font-medium">•</span>
                            <span className="text-xs font-bold text-slate-600">
                                AI-Verified Departure Rules
                            </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-1">
                            Pre-Departure &amp; Luggage Checklist
                        </h2>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                            Smart cabin baggage rules, customs prohibitions, and 48-hour flight preparation for {selectedDestination}.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                            type="button"
                            disabled={isFetchingPreDepartureAi}
                            onClick={() => fetchPreDepartureAi()}
                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isFetchingPreDepartureAi ? 'animate-spin' : ''}`} />
                            <span>{isFetchingPreDepartureAi ? 'Fetching AI Rules...' : 'Sync AI Directives'}</span>
                        </button>
                    </div>
                </div>

                {/* Destination & Packing Progress Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-1">
                    <div className="sm:col-span-2 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-700 flex items-center gap-1.5">
                                <Luggage className="w-4 h-4 text-slate-800" />
                                <span>Packing &amp; Readiness Completion:</span>
                            </span>
                            <span className="text-slate-950 font-black">
                                {luggageProgress.packed} of {luggageProgress.total} Items Checked ({luggageProgress.percent}%)
                            </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-slate-900 rounded-full transition-all duration-500"
                                style={{ width: `${luggageProgress.percent}%` }}
                            />
                        </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Active Trip</span>
                            <strong className="text-xs font-black text-slate-900 line-clamp-1">
                                {getFlagEmoji(selectedDestination)} {selectedDestination}
                            </strong>
                        </div>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                            {selectedPurpose}
                        </span>
                    </div>
                </div>

                {/* Section Filter Pills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                    {[
                        { id: 'all', label: 'All Essentials' },
                        { id: 'cabin', label: '🎒 Hand / Cabin Bag' },
                        { id: 'checked', label: '🧳 Checked Luggage' },
                        { id: 'predeparture', label: '📋 48-Hour Pre-Flight' },
                    ].map(sec => (
                        <button
                            key={sec.id}
                            type="button"
                            onClick={() => setLuggageActiveSection(sec.id as any)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                luggageActiveSection === sec.id
                                    ? 'bg-slate-900 text-white shadow-2xs'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {sec.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* AI Verified Customs & Prohibitions Alert Card */}
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 sm:p-6 space-y-4 text-left shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <ShieldAlert className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-slate-950 tracking-tight">
                                Consular Airport Customs &amp; Prohibitions • {selectedDestination}
                            </h4>
                            <span className="text-[11px] text-slate-500 font-medium">
                                Statutory civil aviation &amp; international border baggage directives
                            </span>
                        </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                        Official Rules
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                    <div className="p-4 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 transition-all">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                                <DollarSign className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <strong className="text-slate-950 font-black text-xs">Currency Declaration</strong>
                        </div>
                        <p className="text-slate-600 text-xs font-medium leading-relaxed">
                            Cash exceeding $10,000 USD (or equivalent) must be officially declared upon arrival.
                        </p>
                    </div>

                    <div className="p-4 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 transition-all">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <strong className="text-slate-950 font-black text-xs">Restricted Medications</strong>
                        </div>
                        <p className="text-slate-600 text-xs font-medium leading-relaxed">
                            Carrying painkillers/narcotics without a stamped doctor prescription is strictly forbidden.
                        </p>
                    </div>

                    <div className="p-4 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 transition-all">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                                <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <strong className="text-slate-950 font-black text-xs">Lithium Batteries</strong>
                        </div>
                        <p className="text-slate-600 text-xs font-medium leading-relaxed">
                            Power banks and spare lithium batteries strictly prohibited in checked luggage. Must carry in cabin bag.
                        </p>
                    </div>
                </div>
            </div>

            {/* Checklist Categories */}
            <div className="space-y-6">
                {/* 1. Cabin Luggage */}
                {(luggageActiveSection === 'all' || luggageActiveSection === 'cabin') && (
                    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4 text-left">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2.5">
                                <span className="text-2xl">🎒</span>
                                <div>
                                    <h3 className="text-base font-black text-slate-950">
                                        Hand Luggage / Cabin Baggage (Must-Carry Onboard)
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium">
                                        Critical travel documents, prescription medications, valuables and aviation-compliant electronics
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                                Max 7-10 kg
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {[
                                ...defaultLuggageItems.cabin,
                                ...customLuggageItems.filter(i => i.category === 'cabin')
                            ].map(item => {
                                const isPacked = !!luggageChecklist[item.id];
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => toggleLuggageItem(item.id)}
                                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3.5 shadow-2xs hover:shadow-xs active:scale-[0.99] ${
                                            isPacked
                                                ? 'bg-slate-50/70 border-slate-200'
                                                : 'bg-white border-slate-200/90 hover:border-slate-300'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            {renderIosLuggageIcon(item.id)}
                                            <div className="space-y-0.5 min-w-0">
                                                <h4 className={`text-xs sm:text-sm font-black tracking-tight leading-snug truncate ${isPacked ? 'line-through text-slate-400 font-semibold' : 'text-slate-950'}`}>
                                                    {item.title}
                                                </h4>
                                                {item.hint && (
                                                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed truncate">
                                                        {item.hint}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="shrink-0 pl-2">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                isPacked 
                                                    ? 'bg-slate-950 border-slate-950 text-white shadow-2xs' 
                                                    : 'border-slate-300 hover:border-slate-400 bg-white'
                                            }`}>
                                                {isPacked && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 2. Checked Baggage */}
                {(luggageActiveSection === 'all' || luggageActiveSection === 'checked') && (
                    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4 text-left">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2.5">
                                <span className="text-2xl">🧳</span>
                                <div>
                                    <h3 className="text-base font-black text-slate-950">
                                        Checked Luggage (Clothing, Footwear &amp; Toiletries)
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium">
                                        Main luggage checked in at airline counter. Liquids over 100ml must go here.
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200">
                                Standard 20-30 kg
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {[
                                ...defaultLuggageItems.checked,
                                ...customLuggageItems.filter(i => i.category === 'checked')
                            ].map(item => {
                                const isPacked = !!luggageChecklist[item.id];
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => toggleLuggageItem(item.id)}
                                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3.5 shadow-2xs hover:shadow-xs active:scale-[0.99] ${
                                            isPacked
                                                ? 'bg-slate-50/70 border-slate-200'
                                                : 'bg-white border-slate-200/90 hover:border-slate-300'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            {renderIosLuggageIcon(item.id)}
                                            <div className="space-y-0.5 min-w-0">
                                                <h4 className={`text-xs sm:text-sm font-black tracking-tight leading-snug truncate ${isPacked ? 'line-through text-slate-400 font-semibold' : 'text-slate-950'}`}>
                                                    {item.title}
                                                </h4>
                                                {item.hint && (
                                                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed truncate">
                                                        {item.hint}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="shrink-0 pl-2">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                isPacked 
                                                    ? 'bg-slate-950 border-slate-950 text-white shadow-2xs' 
                                                    : 'border-slate-300 hover:border-slate-400 bg-white'
                                            }`}>
                                                {isPacked && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 3. 48-Hour Pre-Flight Essentials */}
                {(luggageActiveSection === 'all' || luggageActiveSection === 'predeparture') && (
                    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4 text-left">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2.5">
                                <span className="text-2xl">📋</span>
                                <div>
                                    <h3 className="text-base font-black text-slate-950">
                                        48-Hour Pre-Departure Essentials
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium">
                                        Crucial digital, banking, and insurance tasks to complete before heading to airport
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                                Pre-Flight Gate
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {[
                                ...defaultLuggageItems.predeparture,
                                ...customLuggageItems.filter(i => i.category === 'predeparture')
                            ].map(item => {
                                const isPacked = !!luggageChecklist[item.id];
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => toggleLuggageItem(item.id)}
                                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3.5 shadow-2xs hover:shadow-xs active:scale-[0.99] ${
                                            isPacked
                                                ? 'bg-slate-50/70 border-slate-200'
                                                : 'bg-white border-slate-200/90 hover:border-slate-300'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            {renderIosLuggageIcon(item.id)}
                                            <div className="space-y-0.5 min-w-0">
                                                <h4 className={`text-xs sm:text-sm font-black tracking-tight leading-snug truncate ${isPacked ? 'line-through text-slate-400 font-semibold' : 'text-slate-950'}`}>
                                                    {item.title}
                                                </h4>
                                                {item.hint && (
                                                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed truncate">
                                                        {item.hint}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="shrink-0 pl-2">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                isPacked 
                                                    ? 'bg-slate-950 border-slate-950 text-white shadow-2xs' 
                                                    : 'border-slate-300 hover:border-slate-400 bg-white'
                                            }`}>
                                                {isPacked && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Add Custom Luggage Item Bar */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs text-left">
                    <h4 className="text-sm font-black text-slate-950 mb-3 flex items-center gap-2">
                        <Plus className="w-4 h-4 text-emerald-600" />
                        <span>Add Custom Item to Packing List</span>
                    </h4>
                    <form onSubmit={handleAddCustomLuggageItem} className="flex flex-col sm:flex-row gap-3">
                        <select
                            value={newLuggageCategory}
                            onChange={(e) => setNewLuggageCategory(e.target.value as any)}
                            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 outline-none focus:border-slate-900 shrink-0 cursor-pointer"
                        >
                            <option value="cabin">🎒 Hand / Cabin Baggage</option>
                            <option value="checked">🧳 Checked Suitcase</option>
                            <option value="predeparture">📋 Pre-Flight Task</option>
                        </select>
                        <input
                            type="text"
                            value={newLuggageItemText}
                            onChange={(e) => setNewLuggageItemText(e.target.value)}
                            placeholder="e.g. Travel neck pillow, Noise cancelling headphones, Extra prescription glasses..."
                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 bg-slate-50"
                        />
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white text-xs font-black transition-all shrink-0 cursor-pointer shadow-xs"
                        >
                            Add Item
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default PreDepartureLuggage;
