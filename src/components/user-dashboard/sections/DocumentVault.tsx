import React from "react";
import {
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    AlertCircle,
    KeyRound,
    Check,
    Upload,
    FileText,
    Calendar,
    Shield,
    Search,
    X,
    Plane,
    RotateCw,
    MoreVertical,
    Download,
    Trash2,
    CreditCard,
    User,
    Globe,
    MapPin,
    Building2,
    CheckCircle2
} from "lucide-react";
import { normalizeCountryName } from "../utils/countryHelpers";
import { computeExpiryStatus, formatDatePreview, formatDateOcr } from "../utils/vaultHelpers";
import { defaultVaultList } from "../utils/constants";
import type { VaultDocItem } from "../types";

interface DocumentVaultProps {
    hasVaultPassword: boolean | null;
    isVaultUnlocked: boolean;
    vaultPasswordInput: string;
    setVaultPasswordInput: (v: string) => void;
    vaultPasswordConfirm: string;
    setVaultPasswordConfirm: (v: string) => void;
    showVaultPassword: boolean;
    setShowVaultPassword: (v: boolean) => void;
    vaultError: string | null;
    setVaultError: (v: string | null) => void;
    isVaultSubmitting: boolean;
    handleSetInitialVaultPassword: (e?: React.FormEvent) => Promise<void>;
    handleUnlockVault: (e?: React.FormEvent) => Promise<void>;
    handleLockVault: () => void;
    setShowResetVaultPasswordModal: (v: boolean) => void;
    setShowChangeVaultPasswordModal: (v: boolean) => void;

    // Documents & Filters
    documents: any[];
    setDocuments: React.Dispatch<React.SetStateAction<any[]>>;
    selectedDestination: string;
    selectedPassport: string;
    selectedPurpose: string;
    fullName: string;
    email: string;

    isScanningVaultDoc: boolean;
    vaultDocSearch: string;
    setVaultDocSearch: (v: string) => void;
    vaultDocTypeFilter: string;
    setVaultDocTypeFilter: (v: string) => void;
    vaultDocSort: string;
    setVaultDocSort: (v: string) => void;
    selectedVaultDoc: any | null;
    setSelectedVaultDoc: (v: any | null) => void;
    isEditingOcr: boolean;
    setIsEditingOcr: (v: boolean) => void;
    editOcrForm: any;
    setEditOcrForm: (v: any) => void;
    vaultDocMenuId: string | null;
    setVaultDocMenuId: (v: string | null) => void;
    replacingDocId: string | null;
    setReplacingDocId: (v: string | null) => void;
    vaultActionToast: string | null;
    setVaultActionToast: (v: string | null) => void;

    vaultFileInputRef: React.RefObject<HTMLInputElement | null>;
    replaceFileInputRef: React.RefObject<HTMLInputElement | null>;
    vaultUploadTargetReq: { key: string; title: string; type: string } | null;
    setVaultUploadTargetReq: (v: { key: string; title: string; type: string } | null) => void;
    vaultUploadTargetReqRef: React.MutableRefObject<{ key: string; title: string; type: string } | null>;
    stagedPassportFile: File | null;
    setStagedPassportFile: (f: File | null) => void;
    stagedPassportPreview: string | null;
    setStagedPassportPreview: (s: string | null) => void;

    handleUploadVaultDocument: (file: File, targetOverride?: { key: string; title: string; type: string } | null) => Promise<void>;
    handleDownloadDoc: (doc: any) => void;
    handleDeleteDoc: (doc: any) => void;
    handleStartEditOcr: (doc: any) => void;
    handleSaveEditOcr: (activeSelectedDoc?: any) => void;
    handleTriggerUploadForReq: (target: { key: string; title: string; type: string }) => void;
    handleSubmitStagedPassport: () => void;
}

export const DocumentVault: React.FC<DocumentVaultProps> = ({
    hasVaultPassword,
    isVaultUnlocked,
    vaultPasswordInput,
    setVaultPasswordInput,
    vaultPasswordConfirm,
    setVaultPasswordConfirm,
    showVaultPassword,
    setShowVaultPassword,
    vaultError,
    setVaultError,
    isVaultSubmitting,
    handleSetInitialVaultPassword,
    handleUnlockVault,
    handleLockVault,
    setShowResetVaultPasswordModal,
    setShowChangeVaultPasswordModal,

    documents,
    selectedDestination,
    selectedPassport,
    selectedPurpose,
    fullName,
    isScanningVaultDoc,
    vaultDocSearch,
    setVaultDocSearch,
    vaultDocTypeFilter,
    setVaultDocTypeFilter,
    vaultDocSort,
    setVaultDocSort,
    selectedVaultDoc,
    setSelectedVaultDoc,
    isEditingOcr,
    setIsEditingOcr,
    editOcrForm,
    setEditOcrForm,
    vaultDocMenuId,
    setVaultDocMenuId,
    replacingDocId,
    setReplacingDocId,
    vaultActionToast,
    vaultFileInputRef,
    replaceFileInputRef,
    vaultUploadTargetReq,
    vaultUploadTargetReqRef,
    stagedPassportFile,
    setStagedPassportFile,
    stagedPassportPreview,
    setStagedPassportPreview,

    handleUploadVaultDocument,
    handleDownloadDoc,
    handleDeleteDoc,
    handleStartEditOcr,
    handleSaveEditOcr,
    handleTriggerUploadForReq,
    handleSubmitStagedPassport
}) => {
    // 1. Password verification loading screen
    if (hasVaultPassword === null) {
        return (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-4 shadow-sm animate-fade-up">
                <div className="w-10 h-10 border-3 border-[#00a896] border-t-transparent rounded-full animate-spin mx-auto" />
                <h3 className="text-base font-extrabold text-slate-900">Verifying Vault Security...</h3>
                <p className="text-xs text-slate-500 font-medium">Checking encrypted secret protection</p>
            </div>
        );
    }

    // 2. Initial password setup screen
    if (!hasVaultPassword) {
        return (
            <div className="max-w-xl mx-auto py-6 animate-fade-up">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white text-center relative overflow-hidden">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-inner">
                            <Lock className="w-8 h-8" />
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-black uppercase tracking-wider mb-2">
                            Document Vault Protection
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-white">Create Secret Vault Password</h2>
                        <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-md mx-auto mt-2 leading-relaxed">
                            Protect your passport scans, financial statements, and biometric records. You will enter this password every time you access your Document Vault.
                        </p>
                    </div>

                    <form onSubmit={handleSetInitialVaultPassword} className="p-6 sm:p-8 space-y-5">
                        {vaultError && (
                            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                <span>{vaultError}</span>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 block">Create Secret Password</label>
                            <div className="relative">
                                <input
                                    type={showVaultPassword ? "text" : "password"}
                                    value={vaultPasswordInput}
                                    onChange={(e) => setVaultPasswordInput(e.target.value)}
                                    placeholder="Enter secret password (min 4 chars)"
                                    className="w-full h-11 pl-4 pr-10 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowVaultPassword(!showVaultPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                >
                                    {showVaultPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium block">Can be alphanumeric or a secure 4-8 digit numeric PIN.</span>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 block">Confirm Secret Password</label>
                            <input
                                type={showVaultPassword ? "text" : "password"}
                                value={vaultPasswordConfirm}
                                onChange={(e) => setVaultPasswordConfirm(e.target.value)}
                                placeholder="Re-enter secret password"
                                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isVaultSubmitting}
                            className="w-full h-12 bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                        >
                            {isVaultSubmitting ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <ShieldCheck className="w-4 h-4 text-white" />
                                    <span>Set Vault Password &amp; Lock</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // 3. Vault locked entry screen
    if (!isVaultUnlocked) {
        return (
            <div className="max-w-md mx-auto py-10 animate-fade-up">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-7 sm:p-8 text-center space-y-6">
                    <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping opacity-75" />
                        <div className="w-20 h-20 rounded-2xl bg-[#00a896] border border-[#00a896]/20 text-white flex items-center justify-center shadow-lg relative z-10">
                            <Lock className="w-9 h-9" />
                        </div>
                    </div>

                    <div>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-black uppercase tracking-wider mb-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            Protected Document Vault
                        </span>
                        <h2 className="text-2xl font-black text-slate-950">Vault is Locked</h2>
                        <p className="text-xs text-slate-500 font-medium mt-1.5 max-w-xs mx-auto">
                            Enter your secret vault password to access your passport copies and confidential visa documents.
                        </p>
                    </div>

                    <form onSubmit={handleUnlockVault} className="space-y-4 text-left">
                        {vaultError && (
                            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                <span>{vaultError}</span>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 block">Secret Password</label>
                            <div className="relative">
                                <input
                                    type={showVaultPassword ? "text" : "password"}
                                    value={vaultPasswordInput}
                                    onChange={(e) => setVaultPasswordInput(e.target.value)}
                                    placeholder="Enter your secret password"
                                    autoFocus
                                    className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowVaultPassword(!showVaultPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                >
                                    {showVaultPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isVaultSubmitting}
                            className="w-full h-12 bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                        >
                            {isVaultSubmitting ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <KeyRound className="w-4 h-4 text-white" />
                                    <span>Unlock Document Vault</span>
                                </>
                            )}
                        </button>

                        <div className="text-center pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowResetVaultPasswordModal(true);
                                    setVaultError(null);
                                }}
                                className="text-xs font-bold text-slate-500 hover:text-slate-900 underline cursor-pointer"
                            >
                                Forgot secret vault password?
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // 4. Vault is UNLOCKED: Render the full Document Vault UI
    const combinedRouteRequirements: VaultDocItem[] = [...defaultVaultList];

    // Match against user uploads
    const sortedUserDocs = [...documents].sort((a: any, b: any) => {
        if (a.fileData && !b.fileData) return -1;
        if (!a.fileData && b.fileData) return 1;
        return (b.id || '').localeCompare(a.id || '');
    });
    const matchedUserDocIds = new Set<string>();
    const routeDocumentsList: any[] = combinedRouteRequirements.map((req) => {
        let matchedDoc = sortedUserDocs.find(d => {
            if (matchedUserDocIds.has(d.id)) return false;
            return (d.reqKey && d.reqKey === req.key) || d.id === req.key;
        });

        if (!matchedDoc) {
            matchedDoc = sortedUserDocs.find(d => {
                if (matchedUserDocIds.has(d.id)) return false;
                const dTitleL = (d.title || d.label || '').toLowerCase();
                const dType = d.type || '';
                if (req.key === 'statutory_passport') {
                    return dType === 'passport' ||
                        dTitleL.includes('passport') ||
                        Boolean(d.ocrData?.passportNumber) ||
                        Boolean(d.ocrData?.mrzLine1) ||
                        Boolean(d.docNumber && /^[A-Z][0-9]{7,8}$/i.test(d.docNumber)) ||
                        Boolean(d.ocrData?.documentNumber && /^[A-Z][0-9]{7,8}$/i.test(d.ocrData.documentNumber));
                }
                if (req.key === 'statutory_national_id') return (dType === 'id' && !dTitleL.includes('pan')) || dTitleL.includes('aadhaar') || (dTitleL.includes('identity') && !dTitleL.includes('pan'));
                if (req.key === 'statutory_tax_id') return dTitleL.includes('pan') || dTitleL.includes('tax');
                if (req.key === 'statutory_financial') return dType === 'bank' || dTitleL.includes('bank') || dTitleL.includes('statement');
                if (req.key === 'statutory_photos') return dTitleL.includes('photo');
                if (req.key === 'statutory_insurance') return dType === 'insurance' || dTitleL.includes('insurance');
                if (req.key === 'statutory_flight') return dType === 'flight' || dTitleL.includes('flight') || dTitleL.includes('ticket');
                if (req.key === 'statutory_accommodation') return dTitleL.includes('hotel') || dTitleL.includes('accommodation');
                if (req.key === 'statutory_employment') return dTitleL.includes('employment') || dTitleL.includes('salary');
                return false;
            });
        }

        if (matchedDoc) {
            matchedUserDocIds.add(matchedDoc.id);
        }

        let type: 'passport' | 'visa' | 'id' | 'insurance' | 'flight' | 'bank' | 'other' = 'other';
        if (req.key === 'statutory_passport') type = 'passport';
        else if (req.key === 'statutory_insurance') type = 'insurance';
        else if (req.key === 'statutory_flight') type = 'flight';
        else if (req.key === 'statutory_financial') type = 'bank';
        else if (req.key === 'statutory_national_id' || req.key === 'statutory_tax_id') type = 'id';

        const isUploaded = Boolean(matchedDoc && (matchedDoc.fileData || matchedDoc.scannedMethod === 'OCR Scanned' || matchedDoc.isUploaded || matchedDoc.isRealUpload));

        let displayExpiry = 'Permanent';
        if (req.key === 'statutory_national_id' || req.key === 'statutory_tax_id' || type === 'id') {
            displayExpiry = 'Permanent';
        } else if (req.key === 'statutory_financial' || type === 'bank') {
            displayExpiry = matchedDoc?.expiryDate && matchedDoc.expiryDate !== 'Permanent' && matchedDoc.expiryDate !== '—' && matchedDoc.expiryDate !== '-' ? matchedDoc.expiryDate : 'Recent (6 Months)';
        } else if (req.key === 'statutory_photos') {
            displayExpiry = 'Valid (< 6 Months)';
        } else if (req.key === 'statutory_flight' || type === 'flight') {
            displayExpiry = matchedDoc?.expiryDate && matchedDoc.expiryDate !== 'Permanent' && matchedDoc.expiryDate !== '—' && matchedDoc.expiryDate !== '-' ? matchedDoc.expiryDate : 'Confirmed Itinerary';
        } else if (req.key === 'statutory_accommodation') {
            displayExpiry = matchedDoc?.expiryDate && matchedDoc.expiryDate !== 'Permanent' && matchedDoc.expiryDate !== '—' && matchedDoc.expiryDate !== '-' ? matchedDoc.expiryDate : 'Confirmed Stay';
        } else if (req.key === 'statutory_employment') {
            displayExpiry = matchedDoc?.expiryDate && matchedDoc.expiryDate !== 'Permanent' && matchedDoc.expiryDate !== '—' && matchedDoc.expiryDate !== '-' ? matchedDoc.expiryDate : 'Current Employment';
        } else if (matchedDoc?.expiryDate && matchedDoc.expiryDate !== '—' && matchedDoc.expiryDate !== '-') {
            displayExpiry = matchedDoc.expiryDate;
        } else if (req.key === 'statutory_passport' || type === 'passport') {
            displayExpiry = '2034-05-19';
        } else if (req.key === 'statutory_insurance' || type === 'insurance') {
            displayExpiry = '2027-12-31';
        }

        const expInfo = isUploaded ? computeExpiryStatus(displayExpiry) : null;

        return {
            id: matchedDoc ? matchedDoc.id : `req-${req.key}`,
            reqKey: req.key,
            title: req.title,
            description: req.description,
            hint: req.hint,
            mandatory: req.mandatory,
            type,
            isUploaded,
            docNumber: isUploaded ? (matchedDoc.ocrData?.documentNumber || matchedDoc.ocrData?.docNumber || matchedDoc.docNumber || (req.key === 'statutory_national_id' ? 'AADHAAR-ON-FILE' : req.key === 'statutory_tax_id' ? 'PAN-ON-FILE' : 'Verified on File')) : '—',
            country: isUploaded ? (matchedDoc.country || matchedDoc.ocrData?.nationality || selectedPassport || 'India') : selectedPassport || 'India',
            issuer: isUploaded ? (matchedDoc.issuer || (type === 'flight' ? 'Commercial Airline' : type === 'insurance' ? 'International Travel Assure Ltd' : type === 'passport' ? `Government of ${selectedPassport || 'India'}` : 'Official Authority')) : `Government of ${selectedPassport || 'India'}`,
            holderName: isUploaded ? (matchedDoc.holderName || matchedDoc.ocrData?.fullName || fullName || 'Traveler') : '—',
            subDetails: isUploaded ? (matchedDoc.subDetails || req.hint || 'Verified & Ingested into Encrypted Vault') : (req.hint || req.description),
            dateOfBirth: isUploaded ? (matchedDoc.dateOfBirth || matchedDoc.ocrData?.dob || '14 Oct 1994') : '—',
            expiryDate: isUploaded ? displayExpiry : (req.mandatory ? 'Mandatory for Travel' : 'Recommended'),
            expirySubtext: isUploaded ? (expInfo?.subtext || 'Valid') : 'Upload Required',
            expiryStatus: isUploaded ? (expInfo?.status || 'valid') : 'pending',
            status: isUploaded ? (matchedDoc.status || 'verified') : 'pending',
            scannedMethod: isUploaded ? (matchedDoc.scannedMethod || 'OCR Scanned') : 'Unscanned',
            uploadedAt: isUploaded ? (matchedDoc.uploadedAt || 'Recently') : '—',
            size: isUploaded ? (matchedDoc.size || '1.8 MB') : '—',
            fileData: isUploaded ? ((matchedDoc && matchedDoc.fileData) || (typeof window !== 'undefined' ? (
                localStorage.getItem(`vault_file_preview_${req.key}`) ||
                sessionStorage.getItem(`vault_file_preview_${req.key}`) ||
                (req.key === 'statutory_passport' || type === 'passport' ? (localStorage.getItem('vault_file_preview_statutory_passport') || sessionStorage.getItem('vault_file_preview_statutory_passport')) : null)
            ) : null)) : null,
            ocrData: isUploaded ? (matchedDoc.ocrData || {
                documentNumber: matchedDoc.docNumber || 'DOC-ON-FILE',
                fullName: matchedDoc.holderName || fullName || 'Traveler',
                dob: '14 Oct 1994',
                nationality: selectedPassport || 'India',
                sex: 'M',
                placeOfBirth: selectedPassport || 'India',
                issueDate: '15 Oct 2022',
                expiryDate: displayExpiry
            }) : null
        };
    });

    // Append any extra user documents uploaded
    documents.forEach((d: any, idx: number) => {
        if (!matchedUserDocIds.has(d.id)) {
            const expInfo = computeExpiryStatus(d.expiryDate || (d.type === 'id' ? 'Permanent' : undefined));
            routeDocumentsList.push({
                id: d.id || `extra-doc-${idx}`,
                reqKey: d.id,
                title: d.title || d.label || 'Additional Travel Document',
                description: 'Custom travel document in encrypted vault.',
                hint: 'Uploaded document',
                mandatory: false,
                type: d.type || 'other',
                isUploaded: true,
                docNumber: d.ocrData?.documentNumber || d.docNumber || `DOC-${idx + 100}`,
                country: d.country || selectedPassport || 'India',
                issuer: d.issuer || 'Official Issuer',
                holderName: d.holderName || fullName || 'Traveler',
                subDetails: d.subDetails || 'Verified Travel Document',
                dateOfBirth: d.dateOfBirth || '14 Oct 1994',
                expiryDate: d.expiryDate || 'Valid on File',
                expirySubtext: expInfo.subtext,
                expiryStatus: expInfo.status,
                status: d.status || 'verified',
                scannedMethod: d.scannedMethod || 'OCR Scanned',
                uploadedAt: d.uploadedAt || 'Recently',
                size: d.size || '1.8 MB',
                fileData: d.fileData || null,
                ocrData: d.ocrData || null
            });
        }
    });

    // Filter and sort
    let filteredDocs = [...routeDocumentsList];
    if (vaultDocTypeFilter !== 'all') {
        filteredDocs = filteredDocs.filter(d => d.type === vaultDocTypeFilter);
    }
    if (vaultDocSearch.trim()) {
        const q = vaultDocSearch.toLowerCase();
        filteredDocs = filteredDocs.filter(d =>
            d.title.toLowerCase().includes(q) ||
            (d.docNumber && d.docNumber.toLowerCase().includes(q)) ||
            (d.country && d.country.toLowerCase().includes(q)) ||
            (d.description && d.description.toLowerCase().includes(q))
        );
    }
    if (vaultDocSort === 'oldest') {
        filteredDocs.reverse();
    } else if (vaultDocSort === 'name') {
        filteredDocs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (vaultDocSort === 'expiry') {
        filteredDocs.sort((a, b) => a.expiryDate.localeCompare(b.expiryDate));
    }

    const activeSelectedDoc = selectedVaultDoc
        ? (routeDocumentsList.find(d => d.id === selectedVaultDoc.id) || selectedVaultDoc)
        : (routeDocumentsList.find(d => d.isUploaded) || (routeDocumentsList.length > 0 ? routeDocumentsList[0] : null));

    const totalDocsCount = routeDocumentsList.length;
    const verifiedDocsCount = routeDocumentsList.filter(d => d.isUploaded).length;
    const expiringSoonCount = routeDocumentsList.filter(d => d.isUploaded && (d.expiryStatus === 'expiring_soon' || d.status === 'expiring_soon')).length;

    return (
        <div className="space-y-6 animate-fade-up font-sans text-left">
            {/* Hidden Inputs for Upload & Replace */}
            <input
                type="file"
                ref={vaultFileInputRef}
                accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleUploadVaultDocument(f, vaultUploadTargetReqRef.current || vaultUploadTargetReq);
                    e.target.value = '';
                }}
            />
            <input
                type="file"
                ref={replaceFileInputRef}
                accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f && replacingDocId) {
                        handleUploadVaultDocument(f);
                        setReplacingDocId(null);
                    }
                    e.target.value = '';
                }}
            />

            {/* ── 1. PAGE HEADER ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight">
                            Traveller Documents Vault
                        </h1>
                        <span className="w-6 h-6 rounded-full bg-[#00a896]/10 text-[#00a896] flex items-center justify-center border border-[#00a896]/20 shadow-2xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                        Securely store, manage and share your travel documents
                    </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                        type="button"
                        onClick={() => {
                            vaultUploadTargetReqRef.current = null;
                            if (vaultFileInputRef.current) {
                                vaultFileInputRef.current.value = '';
                                vaultFileInputRef.current.click();
                            }
                        }}
                        disabled={isScanningVaultDoc}
                        className="px-4 py-2.5 rounded-xl bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                        {isScanningVaultDoc ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Scanning Document...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                <span>Upload New Document</span>
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={handleLockVault}
                        title="Lock Document Vault"
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                    >
                        <Lock className="w-4 h-4 text-rose-600" />
                    </button>
                    <button
                        type="button"
                        onClick={() => { setShowChangeVaultPasswordModal(true); setVaultError(null); }}
                        title="Change Vault Password"
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                    >
                        <KeyRound className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* ── 2. TOP 4 METRIC CARDS ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-xs font-semibold text-slate-500 block truncate">Total Documents</span>
                            <strong className="text-2xl font-black text-slate-900 leading-tight block mt-0.5">{totalDocsCount}</strong>
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 mt-3 block">Active Documents</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                            <Calendar className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-xs font-semibold text-slate-500 block truncate">Expiring Soon</span>
                            <strong className="text-2xl font-black text-slate-900 leading-tight block mt-0.5">{expiringSoonCount}</strong>
                        </div>
                    </div>
                    <span className="text-[11px] font-bold text-amber-500 mt-3 block">Within 60 days</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#00a896]/10 text-[#00a896] border border-[#00a896]/20 flex items-center justify-center shrink-0">
                            <Shield className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-xs font-semibold text-slate-500 block truncate">Verified</span>
                            <strong className="text-2xl font-black text-slate-900 leading-tight block mt-0.5">{verifiedDocsCount}</strong>
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 mt-3 block">Documents Verified</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                            <Lock className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-xs font-semibold text-slate-500 block truncate">Secure Storage</span>
                            <strong className="text-2xl font-black text-slate-900 leading-tight block mt-0.5">100%</strong>
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 mt-3 block">Encrypted &amp; Safe</span>
                </div>
            </div>

            {/* ── 3. SEARCH & FILTER CONTROLS ── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        value={vaultDocSearch}
                        onChange={(e) => setVaultDocSearch(e.target.value)}
                        placeholder="Search documents by name, type or number..."
                        className="w-full h-11 pl-10 pr-9 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a896]/20 focus:border-[#00a896] shadow-2xs transition-all"
                    />
                    {vaultDocSearch && (
                        <button
                            type="button"
                            onClick={() => setVaultDocSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="w-full sm:w-auto flex items-center gap-2">
                    <select
                        value={vaultDocTypeFilter}
                        onChange={(e) => setVaultDocTypeFilter(e.target.value)}
                        className="h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00a896]/20 focus:border-[#00a896] shadow-2xs cursor-pointer"
                    >
                        <option value="all">All Types</option>
                        <option value="passport">Passport</option>
                        <option value="visa">Visa</option>
                        <option value="id">National ID / Aadhaar / PAN</option>
                        <option value="insurance">Travel Insurance</option>
                        <option value="flight">Flight Ticket</option>
                        <option value="bank">Financial Statement</option>
                        <option value="other">Other Documents</option>
                    </select>

                    <select
                        value={vaultDocSort}
                        onChange={(e) => setVaultDocSort(e.target.value)}
                        className="h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00a896]/20 focus:border-[#00a896] shadow-2xs cursor-pointer"
                    >
                        <option value="newest">Sort By: Newest</option>
                        <option value="oldest">Sort By: Oldest</option>
                        <option value="expiry">Sort By: Expiry Date</option>
                        <option value="name">Sort By: Document Name</option>
                    </select>
                </div>
            </div>

            {/* ── 4. DOCUMENT TABLE ── */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-white border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <div className="col-span-6">DOCUMENT</div>
                    <div className="col-span-2">EXPIRY / VALIDITY</div>
                    <div className="col-span-2">STATUS</div>
                    <div className="col-span-2 text-right">ACTIONS</div>
                </div>

                {filteredDocs.length === 0 ? (
                    <div className="p-12 text-center space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#00a896] flex items-center justify-center mx-auto border border-teal-100 shadow-2xs">
                            <FileText className="w-7 h-7" />
                        </div>
                        <div className="max-w-md mx-auto">
                            <h3 className="text-base font-black text-slate-900">Your Document Vault is Empty</h3>
                            <p className="text-xs text-slate-500 font-medium mt-1">
                                Securely upload and store your Passport, Visa, ID, and Travel Tickets here. They will be OCR scanned and encrypted with bank-level security.
                            </p>
                        </div>
                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => vaultFileInputRef.current?.click()}
                                className="px-4 py-2 rounded-xl bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
                            >
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload Your First Document</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredDocs.map((doc) => {
                            const isSelected = activeSelectedDoc?.id === doc.id;
                            const isMenuOpen = vaultDocMenuId === doc.id;

                            return (
                                <div
                                    key={doc.id}
                                    onClick={() => setSelectedVaultDoc(doc)}
                                    className={`p-4 sm:px-6 sm:py-4.5 flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 items-start md:items-center transition-colors cursor-pointer ${
                                        isSelected ? 'bg-[#00a896]/5 border-l-4 border-l-[#00a896]' : 'hover:bg-slate-50/60'
                                    }`}
                                >
                                    {/* 1. DOCUMENT COLUMN (col-span-6) */}
                                    <div className="col-span-6 flex items-center gap-3.5 min-w-0 w-full">
                                        {doc.type === 'passport' ? (
                                            <div className="w-10 h-13 rounded-md bg-[#182a44] border border-amber-400/40 p-1 flex flex-col items-center justify-between text-amber-300 shadow-2xs shrink-0 select-none">
                                                <span className="text-[5px] font-black tracking-widest uppercase text-amber-200 text-center leading-none">PASSPORT</span>
                                                <span className="text-xs leading-none">🏛️</span>
                                                <span className="text-[5px] font-bold text-amber-300/80 tracking-tighter uppercase leading-none">{doc.country?.slice(0, 5) || 'IND'}</span>
                                            </div>
                                        ) : doc.type === 'visa' ? (
                                            <div className="w-12 h-9 rounded-md bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 flex flex-col justify-between p-1 shadow-2xs shrink-0 select-none">
                                                <div className="flex items-center justify-between text-[6px] font-black text-amber-900 leading-none">
                                                    <span>VISA</span>
                                                    <span>★</span>
                                                </div>
                                                <span className="text-[7px] font-bold text-slate-700 truncate leading-none">{doc.country || 'VISA'}</span>
                                                <span className="text-[5px] text-emerald-700 font-bold leading-none">VALID</span>
                                            </div>
                                        ) : doc.type === 'id' ? (
                                            <div className="w-12 h-8 rounded-md bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 flex flex-col justify-between p-1 shadow-2xs shrink-0 select-none">
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2.5 bg-sky-200 rounded-xs" />
                                                    <div className="space-y-0.5 flex-1">
                                                        <div className="h-0.5 bg-sky-300 rounded-full w-full" />
                                                        <div className="h-0.5 bg-sky-200 rounded-full w-2/3" />
                                                    </div>
                                                </div>
                                                <span className="text-[6px] font-black text-slate-700 tracking-wider leading-none">ID CARD</span>
                                            </div>
                                        ) : doc.type === 'insurance' ? (
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                                                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                                            </div>
                                        ) : doc.type === 'flight' ? (
                                            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0 shadow-2xs">
                                                <Plane className="w-5 h-5 stroke-[2.2]" />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-[#00a896] flex items-center justify-center shrink-0 shadow-2xs">
                                                <FileText className="w-5 h-5 stroke-[2.2]" />
                                            </div>
                                        )}

                                        <div className="min-w-0 flex-1 space-y-0.5">
                                            <strong className="text-sm font-bold text-slate-900 block truncate">
                                                {doc.title}
                                            </strong>
                                            {doc.isUploaded ? (
                                                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium truncate">
                                                    <span>{doc.docNumber}</span>
                                                    {doc.holderName && <span>• {doc.holderName}</span>}
                                                    <span>• {doc.country || doc.issuer || 'Official Record'}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-[11px] truncate">
                                                    <span className="text-amber-600 font-bold">Pending Upload</span>
                                                    {doc.hint && (
                                                        <>
                                                            <span className="text-slate-300">•</span>
                                                            <span className="text-slate-400 font-medium truncate">{doc.hint}</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* 2. EXPIRY / VALIDITY COLUMN (col-span-2) */}
                                    <div className="col-span-2 w-full space-y-0.5 text-xs">
                                        <div className="font-semibold text-slate-800 truncate">{doc.expiryDate}</div>
                                        <div className={
                                            doc.expiryStatus === 'permanent' ? 'text-[#00a896] font-bold text-xs' :
                                            doc.expiryStatus === 'expiring_soon' ? 'text-amber-500 font-bold text-xs' :
                                            doc.isUploaded ? 'text-[#00a896] font-bold text-xs' :
                                            'text-amber-500 font-bold text-xs'
                                        }>
                                            {doc.expirySubtext}
                                        </div>
                                    </div>

                                    {/* 3. STATUS COLUMN (col-span-2) */}
                                    <div className="col-span-2 w-full space-y-1">
                                        {doc.isUploaded ? (
                                            <>
                                                {doc.status === 'verified' ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                                                        <Check className="w-3 h-3 stroke-[3]" /> Verified
                                                    </span>
                                                ) : doc.status === 'expiring_soon' ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                                                        Expiring Soon
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                                                        Pending Review
                                                    </span>
                                                )}
                                                <span className="text-[11px] text-slate-400 font-medium block">
                                                    {doc.scannedMethod}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                                                    ⏳ Pending
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-medium block">Unscanned</span>
                                            </>
                                        )}
                                    </div>

                                    {/* 4. ACTIONS COLUMN (col-span-2 text-right) */}
                                    <div className="col-span-2 w-full flex items-center md:justify-end gap-1.5 relative">
                                        {!doc.isUploaded ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleTriggerUploadForReq(doc);
                                                    }}
                                                    className="px-3.5 py-1.5 rounded-xl bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                                                    title={`Upload & OCR Scan ${doc.title}`}
                                                >
                                                    <Upload className="w-3.5 h-3.5" />
                                                    <span>Upload</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedVaultDoc(doc);
                                                    }}
                                                    title="Inspect Statutory Requirements"
                                                    className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedVaultDoc(doc);
                                                    }}
                                                    title="Inspect Document"
                                                    className="w-8 h-8 rounded-lg text-[#00a896] hover:text-[#007f71] hover:bg-[#00a896]/10 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setReplacingDocId(doc.id);
                                                        replaceFileInputRef.current?.click();
                                                    }}
                                                    title="Upload New Version / Replace"
                                                    className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                                                >
                                                    <RotateCw className="w-4 h-4" />
                                                </button>
                                                <div className="relative shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setVaultDocMenuId(isMenuOpen ? null : doc.id);
                                                        }}
                                                        title="More Actions"
                                                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>

                                                    {isMenuOpen && (
                                                        <div
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="absolute right-0 top-9 w-40 bg-white rounded-xl border border-slate-200 shadow-xl py-1 z-30 text-xs font-semibold text-slate-700 animate-in fade-in zoom-in-95"
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setVaultDocMenuId(null);
                                                                    handleDownloadDoc(doc);
                                                                }}
                                                                className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                                                            >
                                                                <Download className="w-3.5 h-3.5 text-[#00a896]" />
                                                                <span>Download</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setVaultDocMenuId(null);
                                                                    setReplacingDocId(doc.id);
                                                                    replaceFileInputRef.current?.click();
                                                                }}
                                                                className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                                                            >
                                                                <RotateCw className="w-3.5 h-3.5 text-[#00a896]" />
                                                                <span>Replace</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setVaultDocMenuId(null);
                                                                    handleDeleteDoc(doc);
                                                                }}
                                                                className="w-full px-3 py-2 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2 cursor-pointer"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── 5. DOCUMENT INSPECTION & OCR PREVIEW DRAWER ── */}
            {activeSelectedDoc && (() => {
                const isPassportDoc = activeSelectedDoc.type === 'passport' ||
                    activeSelectedDoc.reqKey?.toLowerCase().includes('passport') ||
                    (activeSelectedDoc.title || '').toLowerCase().includes('passport') ||
                    (activeSelectedDoc.label || '').toLowerCase().includes('passport') ||
                    Boolean(activeSelectedDoc.ocrData?.passportNumber) ||
                    Boolean(activeSelectedDoc.ocrData?.mrzLine1) ||
                    Boolean(activeSelectedDoc.ocrData?.placeOfBirth && activeSelectedDoc.ocrData?.issueDate) ||
                    Boolean(activeSelectedDoc.docNumber && /^[A-Z][0-9]{6,9}$/i.test(activeSelectedDoc.docNumber)) ||
                    Boolean(activeSelectedDoc.ocrData?.documentNumber && /^[A-Z][0-9]{6,9}$/i.test(activeSelectedDoc.ocrData.documentNumber)) ||
                    Boolean(activeSelectedDoc.ocrData?.docNumber && /^[A-Z][0-9]{6,9}$/i.test(activeSelectedDoc.ocrData.docNumber));

                const displayDocNumber = activeSelectedDoc.ocrData?.docNumber || activeSelectedDoc.ocrData?.documentNumber || activeSelectedDoc.docNumber || '—';
                const displayFullName = activeSelectedDoc.ocrData?.fullName || activeSelectedDoc.holderName || fullName || '—';
                const nameParts = (displayFullName === '—' || !displayFullName) ? [] : String(displayFullName).trim().split(/\s+/);
                const displaySurname = nameParts.length > 1 ? nameParts[nameParts.length - 1] : (displayFullName || '—');
                const displayGivenNames = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : (displayFullName || '—');
                const displayNationality = activeSelectedDoc.ocrData?.nationality || (activeSelectedDoc.country === 'India' ? 'Indian' : (activeSelectedDoc.country || '—'));

                const displayDobFormatted = formatDatePreview(activeSelectedDoc.ocrData?.dob || activeSelectedDoc.ocrData?.dateOfBirth || activeSelectedDoc.dateOfBirth, '—');
                const displayDobText = formatDateOcr(activeSelectedDoc.ocrData?.dob || activeSelectedDoc.ocrData?.dateOfBirth || activeSelectedDoc.dateOfBirth, '—');

                const rawSex = String(activeSelectedDoc.ocrData?.sex || activeSelectedDoc.sex || '').toUpperCase();
                const displaySex = rawSex.startsWith('F') ? 'Female' : rawSex.startsWith('M') ? 'Male' : (rawSex || '—');
                const displaySexCode = rawSex.startsWith('F') ? 'F' : rawSex.startsWith('M') ? 'M' : '—';

                const displayPlaceOfBirth = activeSelectedDoc.ocrData?.placeOfBirth || activeSelectedDoc.placeOfBirth || '—';
                const displayIssueDateText = formatDateOcr(activeSelectedDoc.ocrData?.issueDate || activeSelectedDoc.issueDate, '—');
                const displayExpiryDateText = formatDateOcr(activeSelectedDoc.ocrData?.expiryDate || activeSelectedDoc.expiryDate, '—');

                const cleanSurname = (displaySurname && displaySurname !== '—') ? String(displaySurname).toUpperCase().replace(/[^A-Z]/g, '') : '';
                const cleanGiven = (displayGivenNames && displayGivenNames !== '—') ? String(displayGivenNames).toUpperCase().replace(/[^A-Z]/g, '<') : '';
                const mrzLine1 = activeSelectedDoc.ocrData?.mrzLine1 || `P<IND${cleanSurname}<<${cleanGiven}`.padEnd(44, '<').slice(0, 44);
                const cleanDoc = (displayDocNumber && displayDocNumber !== '—') ? String(displayDocNumber).toUpperCase().replace(/[^A-Z0-9]/g, '') : '';
                const mrzLine2 = activeSelectedDoc.ocrData?.mrzLine2 || `${cleanDoc}<8IND8104057${displaySexCode || 'M'}3104042<<<<<<<<<<<<<<<08`.padEnd(44, '<').slice(0, 44);

                // PASSPORT FLOW
                if (isPassportDoc) {
                    if (!activeSelectedDoc.isUploaded) {
                        return (
                            <div className="space-y-6 animate-fade-up">
                                {/* Upload Dropzone */}
                                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                        <div className="flex items-center gap-3.5">
                                            <img
                                                src="/images/passport/passport_icon.png"
                                                alt="Passport"
                                                className="w-10 h-13 sm:w-11 sm:h-14 object-contain rounded-md shadow-2xs shrink-0"
                                                onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                                            />
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                                                        Upload Original Passport (Biometric Data Page)
                                                    </h3>
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                                                        ⏳ Pending Upload
                                                    </span>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                                                        Mandatory
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                    Upload your passport bio-data page. Document preview and extracted OCR fields will appear below.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedVaultDoc(null)}
                                                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                                                title="Close"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Drag and Drop Zone */}
                                    <div
                                        onClick={() => vaultFileInputRef.current?.click()}
                                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            const f = e.dataTransfer.files?.[0];
                                            if (f) {
                                                setStagedPassportFile(f);
                                                const reader = new FileReader();
                                                reader.onload = () => setStagedPassportPreview(reader.result as string);
                                                reader.readAsDataURL(f);
                                            }
                                        }}
                                        className="border-2 border-dashed border-slate-300 hover:border-[#00a896] bg-slate-50/60 hover:bg-teal-50/20 rounded-xl p-6 sm:p-7 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-3"
                                    >
                                        {stagedPassportFile ? (
                                            <div className="space-y-2">
                                                <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00a896] flex items-center justify-center mx-auto border border-teal-200 shadow-2xs">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <strong className="text-sm font-bold text-slate-900 block">{stagedPassportFile.name}</strong>
                                                    <span className="text-xs text-slate-500 font-medium">{(stagedPassportFile.size / 1024).toFixed(1)} KB • Ready to submit</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shadow-2xs">
                                                    <Upload className="w-6 h-6" />
                                                </div>
                                                <div className="space-y-1 max-w-sm">
                                                    <strong className="text-sm font-bold text-slate-900 block">
                                                        Click or drag passport bio-data page here
                                                    </strong>
                                                    <p className="text-xs text-slate-500">
                                                        Supports PDF, JPG, PNG, WEBP (Max 15MB) • 256-bit AES Encrypted
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Action Bar */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                                        <div className="text-xs text-slate-400 font-medium">
                                            Target Route: <strong className="text-slate-700">{selectedPassport || 'India'} ➔ {selectedDestination}</strong>
                                        </div>
                                        <div className="flex items-center gap-2.5 w-full sm:w-auto">
                                            {stagedPassportFile && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setStagedPassportFile(null);
                                                        setStagedPassportPreview(null);
                                                    }}
                                                    className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                                                >
                                                    Clear File
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={handleSubmitStagedPassport}
                                                disabled={isScanningVaultDoc}
                                                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00a896] hover:bg-[#009282] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                            >
                                                {isScanningVaultDoc ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        <span>Scanning with AI OCR...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Check className="w-4 h-4 stroke-[2.5]" />
                                                        <span>{stagedPassportFile ? 'Submit & Extract Information' : 'Select Document'}</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Placeholder 2-Column Preview */}
                                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5">
                                    <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                                        <div className="flex items-center gap-3.5">
                                            <img
                                                src="/images/passport/passport_icon.png"
                                                alt="Passport"
                                                className="w-11 h-14 object-contain rounded-md shadow-xs shrink-0"
                                                onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                                            />
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Original Passport</h3>
                                                <div className="flex items-center gap-2.5 mt-1">
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
                                                        ⏳ Awaiting Upload
                                                    </span>
                                                    <span className="text-xs text-slate-500 font-medium">
                                                        Upload your passport above to preview bio-data and view extracted OCR fields
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-bold text-slate-900">Document Preview</h4>
                                            {stagedPassportPreview ? (
                                                <div className="bg-white rounded-xl border border-slate-200/90 p-2 shadow-2xs overflow-hidden">
                                                    <img
                                                        src={stagedPassportPreview}
                                                        alt="Passport Document Preview"
                                                        className="w-full h-auto rounded-lg object-contain max-h-[360px] mx-auto"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="bg-slate-50/70 border-2 border-dashed border-slate-200 rounded-xl p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                                                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center shadow-2xs">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div className="space-y-1 max-w-xs">
                                                        <p className="text-sm font-bold text-slate-700">No Document Uploaded</p>
                                                        <p className="text-xs text-slate-400 font-medium">Upload your passport bio-data page in the section above to generate preview</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-2xs">
                                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                                <h4 className="text-sm font-bold text-slate-900">Extracted Information (OCR)</h4>
                                                <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Pending Document</span>
                                            </div>

                                            <div className="space-y-3.5 text-sm">
                                                {['Passport Number', 'Full Name', 'Date of Birth', 'Nationality', 'Sex', 'Place of Birth', 'Date of Issue', 'Date of Expiry'].map((field) => (
                                                    <div key={field} className="flex items-center justify-between gap-4">
                                                        <span className="text-slate-500 font-normal">{field}</span>
                                                        <span className="font-semibold text-slate-400 text-right">—</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    // Uploaded & Verified Passport
                    return (
                        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5 animate-fade-up">
                            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                                <div className="flex items-center gap-3.5">
                                    <img
                                        src="/images/passport/passport_icon.png"
                                        alt="Passport"
                                        className="w-11 h-14 sm:w-12 sm:h-15 object-contain rounded-md shadow-xs shrink-0"
                                        onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                                    />
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Passport – {displayDocNumber}</h3>
                                        <div className="flex items-center gap-2.5 mt-1">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e6f7f2] text-[#00a896] text-xs font-semibold border border-[#00a896]/30">
                                                <Check className="w-3.5 h-3.5 stroke-[3]" /> Verified
                                            </span>
                                            <span className="text-xs text-slate-500 font-medium">
                                                OCR Scanned on {activeSelectedDoc.uploadedAt || '03 May 2024, 10:30 AM'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleDownloadDoc(activeSelectedDoc)}
                                        className="px-4 py-2 rounded-lg bg-[#00a896] hover:bg-[#009282] text-white text-sm font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Download</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedVaultDoc(null)}
                                        className="text-slate-400 hover:text-slate-700 p-1 transition-colors cursor-pointer"
                                        title="Close"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                {/* Left: Document Preview */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-bold text-slate-900">Document Preview</h4>
                                        <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                                            Uploaded Original
                                        </span>
                                    </div>
                                    <div className="bg-white rounded-xl border border-slate-200/90 p-2 shadow-2xs overflow-hidden">
                                        {(() => {
                                            const previewSrc = activeSelectedDoc.fileData ||
                                                (typeof window !== 'undefined' ? (
                                                    localStorage.getItem(`vault_file_preview_${activeSelectedDoc.reqKey || activeSelectedDoc.id}`) ||
                                                    sessionStorage.getItem(`vault_file_preview_${activeSelectedDoc.reqKey || activeSelectedDoc.id}`) ||
                                                    localStorage.getItem(`vault_file_preview_${activeSelectedDoc.id}`) ||
                                                    sessionStorage.getItem(`vault_file_preview_${activeSelectedDoc.id}`) ||
                                                    localStorage.getItem('vault_file_preview_statutory_passport') ||
                                                    sessionStorage.getItem('vault_file_preview_statutory_passport') ||
                                                    localStorage.getItem('vault_file_preview_vault_upload') ||
                                                    sessionStorage.getItem('vault_file_preview_vault_upload')
                                                ) : null);

                                            if (previewSrc && (previewSrc.startsWith('data:image') || previewSrc.startsWith('http') || previewSrc.startsWith('/'))) {
                                                return (
                                                    <img
                                                        src={previewSrc}
                                                        alt={activeSelectedDoc.title || "Passport Document Preview"}
                                                        className="w-full h-auto rounded-lg object-contain max-h-[420px] mx-auto border border-slate-100 shadow-2xs"
                                                    />
                                                );
                                            }
                                            if (previewSrc && previewSrc.startsWith('data:application/pdf')) {
                                                return (
                                                    <iframe
                                                        src={previewSrc}
                                                        title="Document Preview"
                                                        className="w-full h-[380px] rounded-lg border border-slate-200"
                                                    />
                                                );
                                            }
                                            return (
                                                <div className="bg-slate-50/80 border-2 border-dashed border-slate-200 rounded-xl p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                                                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center shadow-2xs">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div className="space-y-1 max-w-xs">
                                                        <p className="text-sm font-bold text-slate-700">{activeSelectedDoc.label || activeSelectedDoc.title}</p>
                                                        <p className="text-xs text-slate-400 font-medium">Original document bio-data recorded & verified in encrypted vault.</p>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>

                                {/* Right: Extracted OCR fields */}
                                <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-2xs">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                        <h4 className="text-sm font-bold text-slate-900">Extracted Information (OCR)</h4>
                                        {isEditingOcr ? (
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={handleSaveEditOcr}
                                                    className="px-3 py-1 rounded-md bg-[#00a896] hover:bg-[#009282] text-white text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditingOcr(false)}
                                                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium cursor-pointer transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleStartEditOcr(activeSelectedDoc)}
                                                className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>

                                    {/* 8 Field Rows */}
                                    <div className="space-y-3.5 text-sm">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>Passport Number</span>
                                            </div>
                                            {isEditingOcr ? (
                                                <input
                                                    type="text"
                                                    value={editOcrForm.docNumber || ''}
                                                    onChange={(e) => setEditOcrForm({ ...editOcrForm, docNumber: e.target.value })}
                                                    className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                />
                                            ) : (
                                                <span className="font-semibold text-slate-900 text-right">{displayDocNumber}</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                <User className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>Full Name</span>
                                            </div>
                                            {isEditingOcr ? (
                                                <input
                                                    type="text"
                                                    value={editOcrForm.fullName || ''}
                                                    onChange={(e) => setEditOcrForm({ ...editOcrForm, fullName: e.target.value })}
                                                    className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                />
                                            ) : (
                                                <span className="font-semibold text-slate-900 text-right">{displayFullName}</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>Date of Birth</span>
                                            </div>
                                            {isEditingOcr ? (
                                                <input
                                                    type="text"
                                                    value={editOcrForm.dob || ''}
                                                    onChange={(e) => setEditOcrForm({ ...editOcrForm, dob: e.target.value })}
                                                    className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                />
                                            ) : (
                                                <span className="font-semibold text-slate-900 text-right">{displayDobText}</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>Nationality</span>
                                            </div>
                                            {isEditingOcr ? (
                                                <input
                                                    type="text"
                                                    value={editOcrForm.nationality || ''}
                                                    onChange={(e) => setEditOcrForm({ ...editOcrForm, nationality: e.target.value })}
                                                    className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                />
                                            ) : (
                                                <span className="font-semibold text-slate-900 text-right">{displayNationality}</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                <User className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>Sex</span>
                                            </div>
                                            {isEditingOcr ? (
                                                <input
                                                    type="text"
                                                    value={editOcrForm.sex || ''}
                                                    onChange={(e) => setEditOcrForm({ ...editOcrForm, sex: e.target.value })}
                                                    className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                />
                                            ) : (
                                                <span className="font-semibold text-slate-900 text-right">{displaySex}</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>Place of Birth</span>
                                            </div>
                                            {isEditingOcr ? (
                                                <input
                                                    type="text"
                                                    value={editOcrForm.placeOfBirth || ''}
                                                    onChange={(e) => setEditOcrForm({ ...editOcrForm, placeOfBirth: e.target.value })}
                                                    className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                />
                                            ) : (
                                                <span className="font-semibold text-slate-900 text-right">{displayPlaceOfBirth}</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>Date of Issue</span>
                                            </div>
                                            {isEditingOcr ? (
                                                <input
                                                    type="text"
                                                    value={editOcrForm.issueDate || ''}
                                                    onChange={(e) => setEditOcrForm({ ...editOcrForm, issueDate: e.target.value })}
                                                    className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                />
                                            ) : (
                                                <span className="font-semibold text-slate-900 text-right">{displayIssueDateText}</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>Date of Expiry</span>
                                            </div>
                                            {isEditingOcr ? (
                                                <input
                                                    type="text"
                                                    value={editOcrForm.expiryDate || ''}
                                                    onChange={(e) => setEditOcrForm({ ...editOcrForm, expiryDate: e.target.value })}
                                                    className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 text-right w-44 focus:border-[#00a896] focus:outline-hidden"
                                                />
                                            ) : (
                                                <span className="font-semibold text-slate-900 text-right">{displayExpiryDateText}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer actions */}
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setReplacingDocId(activeSelectedDoc.id);
                                                replaceFileInputRef.current?.click();
                                            }}
                                            className="hover:text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
                                        >
                                            <RotateCw className="w-3.5 h-3.5" />
                                            <span>Upload New / Replace</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteDoc(activeSelectedDoc)}
                                            className="text-rose-500 hover:text-rose-700 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }

                // OTHER DOCUMENTS (Flight, Insurance, Bank, ID, etc.)
                if (!activeSelectedDoc.isUploaded) {
                    return (
                        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-6 animate-fade-up">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 text-[#00a896] flex items-center justify-center shrink-0 text-xl shadow-2xs">
                                        {activeSelectedDoc.type === 'flight' ? '✈️' : activeSelectedDoc.type === 'insurance' ? '🛡️' : activeSelectedDoc.type === 'bank' ? '🏦' : '📋'}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-base sm:text-lg font-black text-slate-900">{activeSelectedDoc.title}</h3>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                                                ⏳ Pending Upload
                                            </span>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                activeSelectedDoc.mandatory ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                                            }`}>
                                                {activeSelectedDoc.mandatory ? 'Mandatory' : 'Optional'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 font-medium">
                                            Target Route: <strong className="text-slate-700">{selectedPassport || 'India'} ➔ {selectedDestination}</strong> • {selectedPurpose}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleTriggerUploadForReq(activeSelectedDoc)}
                                        className="px-4 py-2 rounded-xl bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                                    >
                                        <Upload className="w-3.5 h-3.5" />
                                        <span>Upload Document</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedVaultDoc(null)}
                                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div
                                onClick={() => handleTriggerUploadForReq(activeSelectedDoc)}
                                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const f = e.dataTransfer.files?.[0];
                                    if (f) {
                                        const targetReq = {
                                            key: activeSelectedDoc.reqKey || activeSelectedDoc.id,
                                            title: activeSelectedDoc.title,
                                            type: activeSelectedDoc.type
                                        };
                                        if (vaultUploadTargetReqRef) vaultUploadTargetReqRef.current = targetReq;
                                        handleUploadVaultDocument(f, targetReq);
                                    }
                                }}
                                className="group border-2 border-dashed border-[#00a896]/30 hover:border-[#00a896] bg-gradient-to-b from-[#00a896]/5 to-slate-50/50 hover:bg-[#00a896]/10 rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-4 shadow-2xs"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#00a896]/10 text-[#00a896] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                                    <Upload className="w-8 h-8 stroke-[2.2]" />
                                </div>
                                <div className="space-y-1.5 max-w-sm">
                                    <strong className="text-base font-black text-slate-900 block">
                                        Upload your {activeSelectedDoc.title}
                                    </strong>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                        Click or drag and drop your file here. Optical character recognition (Gemini Vision OCR) will automatically extract, analyze, and encrypt all details.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleTriggerUploadForReq(activeSelectedDoc);
                                    }}
                                    className="px-6 py-3 rounded-xl bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                                >
                                    <Upload className="w-4 h-4" />
                                    <span>Upload &amp; Scan with AI OCR</span>
                                </button>
                                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium pt-1 flex-wrap justify-center">
                                    <span>PDF, JPG, PNG, WEBP (Max 15MB)</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1 text-teal-700 font-semibold">
                                        <Lock className="w-3 h-3" /> 256-bit AES Encrypted
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                }

                // Generic Verified Document View
                return (
                    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5 animate-fade-up">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-3.5">
                                <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 text-[#00a896] flex items-center justify-center shrink-0 text-xl shadow-2xs">
                                    {activeSelectedDoc.type === 'flight' ? '✈️' : activeSelectedDoc.type === 'insurance' ? '🛡️' : activeSelectedDoc.type === 'bank' ? '🏦' : activeSelectedDoc.type === 'visa' ? '🛂' : '📋'}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-base sm:text-lg font-bold text-slate-800">
                                        {activeSelectedDoc.title} – {displayDocNumber}
                                    </h3>
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                                            <Check className="w-3 h-3 stroke-[3]" /> Verified
                                        </span>
                                        <span className="text-xs text-slate-400 font-normal">
                                            Scanned on {activeSelectedDoc.uploadedAt || 'Recently'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => handleDownloadDoc(activeSelectedDoc)}
                                    className="px-4 py-2 rounded-xl bg-[#00a896] hover:bg-[#009282] text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedVaultDoc(null)}
                                    className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                            {/* Left: Document Preview */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-slate-900">Document Preview</h4>
                                    <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                                        Uploaded Original
                                    </span>
                                </div>
                                <div className="bg-white rounded-xl border border-slate-200/90 p-2 shadow-2xs overflow-hidden">
                                    {(() => {
                                        const genPreviewSrc = activeSelectedDoc.fileData ||
                                            (typeof window !== 'undefined' ? (
                                                localStorage.getItem(`vault_file_preview_${activeSelectedDoc.reqKey || activeSelectedDoc.id}`) ||
                                                sessionStorage.getItem(`vault_file_preview_${activeSelectedDoc.reqKey || activeSelectedDoc.id}`) ||
                                                localStorage.getItem(`vault_file_preview_${activeSelectedDoc.id}`) ||
                                                sessionStorage.getItem(`vault_file_preview_${activeSelectedDoc.id}`) ||
                                                localStorage.getItem('vault_file_preview_vault_upload') ||
                                                sessionStorage.getItem('vault_file_preview_vault_upload')
                                            ) : null);

                                        if (genPreviewSrc && (genPreviewSrc.startsWith('data:image') || genPreviewSrc.startsWith('http') || genPreviewSrc.startsWith('/'))) {
                                            return (
                                                <img
                                                    src={genPreviewSrc}
                                                    alt={activeSelectedDoc.title || "Document Preview"}
                                                    className="w-full h-auto rounded-lg object-contain max-h-[420px] mx-auto border border-slate-100 shadow-2xs"
                                                />
                                            );
                                        }
                                        if (genPreviewSrc && genPreviewSrc.startsWith('data:application/pdf')) {
                                            return (
                                                <iframe
                                                    src={genPreviewSrc}
                                                    title="Document Preview"
                                                    className="w-full h-[380px] rounded-lg border border-slate-200"
                                                />
                                            );
                                        }
                                        return (
                                            <div className="bg-slate-50/80 border-2 border-dashed border-slate-200 rounded-xl p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3 min-h-[280px]">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center shadow-2xs">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <div className="space-y-1 max-w-xs">
                                                    <p className="text-sm font-bold text-slate-700">{activeSelectedDoc.label || activeSelectedDoc.title}</p>
                                                    <p className="text-xs text-slate-400 font-medium">Original document ingested & verified in encrypted vault.</p>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>

                            {/* Right: Extracted Details */}
                            <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-2xs">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <h4 className="text-sm font-bold text-slate-900">Extracted Information (OCR)</h4>
                                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
                                        <Check className="w-3 h-3 stroke-[3]" /> Verified
                                    </span>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                            <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span>Document Number</span>
                                        </div>
                                        <span className="font-semibold text-slate-900 text-right">{displayDocNumber}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                            <User className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span>Holder Name</span>
                                        </div>
                                        <span className="font-semibold text-slate-900 text-right">{displayFullName}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span>Issuer / Authority</span>
                                        </div>
                                        <span className="font-semibold text-slate-900 text-right">{activeSelectedDoc.issuer || 'Official Issuer'}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span>Validity / Expiry</span>
                                        </div>
                                        <span className="font-semibold text-slate-900 text-right">{activeSelectedDoc.expiryDate || 'Valid'}</span>
                                    </div>
                                    {displayIssueDateText !== '—' && (
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>Date of Issue</span>
                                            </div>
                                            <span className="font-semibold text-slate-900 text-right">{displayIssueDateText}</span>
                                        </div>
                                    )}
                                    {displayNationality !== '—' && (
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 text-slate-500 font-normal">
                                                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>Country / Nationality</span>
                                            </div>
                                            <span className="font-semibold text-slate-900 text-right">{displayNationality}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-50">
                                        <div className="flex items-center gap-3 text-slate-500 font-normal">
                                            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                                            <span>Security Audit</span>
                                        </div>
                                        <span className="text-xs font-bold text-teal-700">AES-256 Encrypted</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setReplacingDocId(activeSelectedDoc.id);
                                            replaceFileInputRef.current?.click();
                                        }}
                                        className="hover:text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
                                    >
                                        <RotateCw className="w-3.5 h-3.5" />
                                        <span>Upload New / Replace</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteDoc(activeSelectedDoc)}
                                        className="text-rose-500 hover:text-rose-700 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Toast Notification */}
            {vaultActionToast && (
                <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 flex items-center gap-3 text-xs font-bold animate-fade-up">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{vaultActionToast}</span>
                </div>
            )}
        </div>
    );
};
export default DocumentVault;
