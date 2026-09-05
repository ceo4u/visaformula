import React from "react";
import {
    Plus,
    Briefcase,
    Edit2,
    Copy,
    ArrowRight,
    ExternalLink,
    Trash2,
    CheckCircle,
    Clock,
    Sparkles,
    Shield
} from "lucide-react";
import { VisaApplicationDetailsView } from "../../interactive/VisaApplicationDetailsView";
import { getCountryCode } from "../utils/countryHelpers";
import type { VisaApplicationCase, VaultDocItem } from "../types";

interface VisaApplicationsProps {
    visasProcessingState: VisaApplicationCase[];
    selectedApplicationId: string | null;
    setSelectedApplicationId: (id: string | null) => void;
    editingAppId: string | null;
    setEditingAppId: (id: string | null) => void;
    editingAppName: string;
    setEditingAppName: (name: string) => void;
    handleRenameApplication: (id: string, name: string) => Promise<void> | void;
    handleDeleteApplication: (id: string) => Promise<void> | void;
    handleCopyTrackingId: (trackingId: string) => void;
    copiedTrackingId: string | null;
    setShowNewAppModal: (show: boolean) => void;
    showToastMsg: (msg: string) => void;
    fullName: string;
    userDisplayName: string;
    setActiveTab: (tab: string) => void;
    readinessScore: number;
    documents: any[];
}

export const VisaApplications: React.FC<VisaApplicationsProps> = ({
    visasProcessingState,
    selectedApplicationId,
    setSelectedApplicationId,
    editingAppId,
    setEditingAppId,
    editingAppName,
    setEditingAppName,
    handleRenameApplication,
    handleDeleteApplication,
    handleCopyTrackingId,
    copiedTrackingId,
    setShowNewAppModal,
    showToastMsg,
    fullName,
    userDisplayName,
    setActiveTab,
    readinessScore,
    documents
}) => {
    if (selectedApplicationId) {
        return (
            <VisaApplicationDetailsView
                application={visasProcessingState.find(c => c.id === selectedApplicationId) || visasProcessingState[0] || ({} as any)}
                applicantName={fullName || userDisplayName || 'Applicant'}
                onBack={() => setSelectedApplicationId(null)}
                onOpenChat={() => setActiveTab('consultations')}
                onOpenVault={() => {
                    setSelectedApplicationId(null);
                    setActiveTab('scanned-documents');
                }}
                readinessScore={readinessScore}
                vaultDocuments={documents as any}
            />
        );
    }

    return (
        <div className="space-y-6 animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-black text-slate-900">Visa Applications ({visasProcessingState.length}/3)</h2>
                        {visasProcessingState.length >= 3 && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                                Limit Reached (3/3)
                            </span>
                        )}
                    </div>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                        Real-time status, timeline milestones, and embassy filing tracker {visasProcessingState.length >= 3 ? "• Maximum 3 active applications allowed" : "(Max 3 active applications)"}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        if (visasProcessingState.length >= 3) {
                            showToastMsg("⚠️ Limit reached: Maximum 3 active visa applications allowed at a time. Please remove an existing application to add a new one.");
                        } else {
                            setShowNewAppModal(true);
                        }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black shadow-xs flex items-center gap-1.5 self-start sm:self-auto transition-all ${
                        visasProcessingState.length >= 3
                            ? "bg-slate-150 text-slate-400 border border-slate-200 cursor-not-allowed"
                            : "bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white cursor-pointer"
                    }`}
                    title={visasProcessingState.length >= 3 ? "Maximum 3 applications limit reached" : "Start New Application"}
                >
                    <Plus className={`w-3.5 h-3.5 ${visasProcessingState.length >= 3 ? "text-slate-400" : "text-emerald-400"}`} />
                    <span>Start New Application ({visasProcessingState.length}/3)</span>
                </button>
            </div>

            {visasProcessingState.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center space-y-4 shadow-sm">
                    <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="text-base font-black text-slate-900">No Active Visa Applications Found</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        You haven't submitted any visa dossiers yet. Explore official visa requirements or create a new visa case.
                    </p>
                    <button
                        type="button"
                        onClick={() => setShowNewAppModal(true)}
                        className="inline-block bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
                    >
                        + Create New Visa Application
                    </button>
                </div>
            ) : (
                <div className="space-y-5">
                    {visasProcessingState.map((cItem, idx) => {
                        const isEditingThis = editingAppId === cItem.id;
                        const appDisplayName = cItem.customName || `${cItem.destination || 'Destination'} • ${cItem.visaType || 'Standard Visa'}`;

                        return (
                            <div 
                                key={cItem.id || idx} 
                                onClick={() => setSelectedApplicationId(cItem.id)}
                                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-5 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
                            >
                                {/* Case Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-10 h-7 rounded-md overflow-hidden border border-slate-200/80 shadow-2xs shrink-0 bg-slate-100 flex items-center justify-center">
                                            <img
                                                src={`https://flagcdn.com/w80/${getCountryCode(cItem.destination)}.png`}
                                                alt={cItem.destination}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.currentTarget as HTMLImageElement).src = 'https://flagcdn.com/w80/un.png';
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            {isEditingThis ? (
                                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                                    <input
                                                        type="text"
                                                        value={editingAppName}
                                                        onChange={(e) => setEditingAppName(e.target.value)}
                                                        placeholder="e.g. Dubai Summer Trip"
                                                        className="px-3 py-1 text-sm font-black text-slate-900 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-slate-900"
                                                        autoFocus
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRenameApplication(cItem.id, editingAppName)}
                                                        className="px-2.5 py-1 bg-[#00a896] text-white text-xs font-bold rounded-lg hover:bg-[#009282] cursor-pointer"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingAppId(null)}
                                                        className="px-2 py-1 text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="text-lg font-black text-slate-950 group-hover:text-indigo-600 transition-colors">
                                                        {appDisplayName}
                                                    </h3>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setEditingAppId(cItem.id);
                                                            setEditingAppName(appDisplayName);
                                                        }}
                                                        className="p-1 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                                                        title="Rename Application"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="bg-emerald-50 text-[#00A86B] text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-200">
                                                        {(cItem.status || 'Active').replace(/Dossier Ingested/gi, 'Required Documents')}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
                                                <span>Tracking ID: <strong className="text-slate-900 font-mono">{cItem.trackingId || 'TT-APP-2026-9824'}</strong></span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCopyTrackingId(cItem.trackingId || 'TT-APP-2026-9824');
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-all cursor-pointer"
                                                    title="Copy Tracking ID"
                                                >
                                                    <Copy className="w-3 h-3 text-slate-500" />
                                                    <span>{copiedTrackingId === cItem.trackingId ? 'Copied ✓' : 'Copy'}</span>
                                                </button>
                                                <span>•</span>
                                                <span>Passport: <strong className="text-slate-700">{cItem.passport || 'Indian'}</strong></span>
                                                <span>•</span>
                                                <span className="font-mono text-[11px] text-slate-400">ID: #{String(cItem.id || idx).replace(/^app_/, '').slice(0, 8).toUpperCase()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-start sm:self-auto" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedApplicationId(cItem.id)}
                                            className="px-4 py-2 rounded-xl bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white text-xs font-black transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                                        >
                                            <span>View Details</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                        <a
                                            href={cItem.destination ? `/visa/${encodeURIComponent(cItem.destination.toLowerCase().replace(/\s+/g, '-'))}?purpose=${encodeURIComponent(cItem.purpose || 'tourism')}&passport=${encodeURIComponent(cItem.passport || 'India')}` : '/'}
                                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all inline-flex items-center gap-1"
                                            title="Resume Workspace"
                                        >
                                            <span>Workspace</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteApplication(cItem.id)}
                                            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer border border-transparent hover:border-rose-100"
                                            title="Delete Application"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* 5-Step Visual Timeline Progress - Clean Dark Slate Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-slate-800">
                                        <span>Application Pipeline Progress:</span>
                                        <span className="text-slate-900 font-black">{cItem.stage || 'Requirements & Document Collection'} ({cItem.progress || 10}%)</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-slate-900 rounded-full transition-all duration-500 shadow-2xs"
                                            style={{ width: `${cItem.progress || 10}%` }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[10px] font-bold text-slate-500">
                                        <div className={`flex items-center gap-1 ${(cItem.progress || 10) >= 20 ? 'text-slate-950 font-black' : 'text-indigo-600 font-bold'}`}>
                                            {(cItem.progress || 10) >= 20 ? <CheckCircle className="w-3.5 h-3.5 text-slate-900 shrink-0" /> : <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />} 1. Required Documents
                                        </div>
                                        <div className={`flex items-center gap-1 ${(cItem.progress || 10) >= 40 ? 'text-slate-950 font-black' : (cItem.progress || 10) >= 20 ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
                                            {(cItem.progress || 10) >= 40 ? <Sparkles className="w-3.5 h-3.5 text-slate-900 shrink-0" /> : <Clock className="w-3.5 h-3.5 shrink-0" />} 2. AI Quality Audit
                                        </div>
                                        <div className={`flex items-center gap-1 ${(cItem.progress || 10) >= 60 ? 'text-slate-950 font-black' : 'text-slate-400'}`}>
                                            {(cItem.progress || 10) >= 60 ? <CheckCircle className="w-3.5 h-3.5 text-slate-900 shrink-0" /> : <Clock className="w-3.5 h-3.5 shrink-0" />} 3. Consular Form Filing
                                        </div>
                                        <div className={`flex items-center gap-1 ${(cItem.progress || 10) >= 80 ? 'text-slate-950 font-black' : 'text-slate-400'}`}>
                                            {(cItem.progress || 10) >= 80 ? <CheckCircle className="w-3.5 h-3.5 text-slate-900 shrink-0" /> : <Clock className="w-3.5 h-3.5 shrink-0" />} 4. Biometrics Slot
                                        </div>
                                        <div className={`flex items-center gap-1 ${(cItem.progress || 10) >= 95 ? 'text-emerald-700 font-black' : 'text-slate-400'}`}>
                                            <Shield className="w-3.5 h-3.5 shrink-0" /> 5. Visa Stamped
                                        </div>
                                    </div>
                                </div>

                                {/* Key Case Specs */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Vault Documents</span>
                                        <strong className="text-xs font-black text-slate-900 mt-0.5 block">{cItem.documentsCount ?? documents.filter(d => d.isUploaded || d.isRealUpload).length} Files OCR Verified</strong>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Submitted On</span>
                                        <strong className="text-xs font-black text-slate-900 mt-0.5 block">{cItem.submittedAt || 'Active'}</strong>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Target Decision</span>
                                        <strong className="text-xs font-black text-slate-900 mt-0.5 block">{cItem.targetDate || 'Consular Filing Ready'}</strong>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
export default VisaApplications;
