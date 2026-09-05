import React from "react";
import { Calendar, Lock, Briefcase, Plane } from "lucide-react";

interface ConsultationsProps {
    activeTab: string;
}

export const Consultations: React.FC<ConsultationsProps> = ({ activeTab }) => {
    if (activeTab === "consultations") {
        return (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4 animate-fade-up">
                <Calendar className="w-12 h-12 text-[#00a896] mx-auto" />
                <h3 className="text-lg font-black text-slate-900">1-on-1 Service Provider Consultation Schedule</h3>
                <p className="text-xs font-medium text-slate-500 max-w-md mx-auto">
                    View your upcoming video advisory calls with OISC &amp; Bar-licensed solicitors and verified immigration consultants.
                </p>
                <div className="pt-2">
                    <a href="/find-experts" className="inline-block bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all">
                        Book New 1-on-1 Session →
                    </a>
                </div>
            </div>
        );
    }

    if (activeTab === "escrow-milestones") {
        return (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6 animate-fade-up">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-[#00a896]" /> TravlTik 100% Escrow Protection
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">Your funds remain safely locked in escrow and are only released upon milestone completion.</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                        🛡️ 100% Money-Back Protection
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Milestone 1</span>
                        <h4 className="font-extrabold text-slate-900">AI &amp; Legal Quality Audit</h4>
                        <p className="text-slate-500 text-[11px]">30% released when all mandatory checklist items are verified.</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Milestone 2</span>
                        <h4 className="font-extrabold text-slate-900">Embassy / VFS Filing</h4>
                        <p className="text-slate-500 text-[11px]">40% released when official visa submission receipt is generated.</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Milestone 3</span>
                        <h4 className="font-extrabold text-slate-900">Visa Decision Clearance</h4>
                        <p className="text-slate-500 text-[11px]">Remaining 30% released upon passport stamping and outcome delivery.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (activeTab === "travel-history" || activeTab === "visa-history") {
        return (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4 animate-fade-up">
                <Plane className="w-12 h-12 text-[#00a896] mx-auto" />
                <h3 className="text-lg font-black text-slate-900">Your International Travel History</h3>
                <p className="text-xs font-medium text-slate-500 max-w-md mx-auto">
                    Track your past visas, entry/exit stamps, and international journeys to strengthen your visa readiness footprint.
                </p>
                <div className="pt-2">
                    <a href="/dashboard?tab=scanned-documents" className="inline-block bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all">
                        Upload Passport Stamps in Document Vault →
                    </a>
                </div>
            </div>
        );
    }

    // Generic Fallback View
    return (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4 animate-fade-up">
            <Briefcase className="w-12 h-12 text-[#00a896] mx-auto" />
            <h3 className="text-lg font-black text-slate-900 capitalize">{activeTab.replace('-', ' ')} Portal</h3>
            <p className="text-xs font-medium text-slate-500 max-w-md mx-auto">
                All your active {activeTab.replace('-', ' ')} records are synchronized in real-time with your TravlTik profile.
            </p>
            <a href="/find-experts" className="inline-block bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all">
                Connect with Service Provider →
            </a>
        </div>
    );
};
export default Consultations;
