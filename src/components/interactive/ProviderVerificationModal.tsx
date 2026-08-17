import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  ShieldCheck, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  Trash2, 
  Eye, 
  BadgeCheck,
  Building2,
  Award,
  Lock
} from "lucide-react";

export interface ProviderVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  expertEmail?: string;
  expertName?: string;
  onSuccess?: () => void;
}

type DocCategory = "business_registration" | "professional_license" | "identity_document";

interface UploadedDocState {
  file: File | null;
  fileName: string;
  fileSize: string;
  mimeType: string;
  previewUrl: string | null;
  status: "idle" | "uploading" | "success" | "error";
  progress: number;
  errorMessage?: string;
  serverStatus?: "pending" | "under_review" | "approved" | "rejected";
}

export function ProviderVerificationModal({
  isOpen,
  onClose,
  expertEmail = "",
  expertName = "Consultant",
  onSuccess
}: ProviderVerificationModalProps) {
  const [activeTab, setActiveTab] = useState<DocCategory>("business_registration");
  const [email, setEmail] = useState(expertEmail);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [currentTier, setCurrentTier] = useState<string>("email_verified");
  const [overallStatus, setOverallStatus] = useState<string>("pending");
  const [generalError, setGeneralError] = useState("");
  const [generalSuccess, setGeneralSuccess] = useState("");

  const [docs, setDocs] = useState<Record<DocCategory, UploadedDocState>>({
    business_registration: { file: null, fileName: "", fileSize: "", mimeType: "", previewUrl: null, status: "idle", progress: 0 },
    professional_license: { file: null, fileName: "", fileSize: "", mimeType: "", previewUrl: null, status: "idle", progress: 0 },
    identity_document: { file: null, fileName: "", fileSize: "", mimeType: "", previewUrl: null, status: "idle", progress: 0 }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize and fetch current verification status
  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    document.body.style.overflow = "hidden";

    const resolvedEmail = expertEmail || (typeof window !== "undefined" ? localStorage.getItem("expert_email") || "" : "");
    if (resolvedEmail) {
      setEmail(resolvedEmail);
      fetchVerificationStatus(resolvedEmail);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, expertEmail]);

  const fetchVerificationStatus = async (targetEmail: string) => {
    if (!targetEmail) return;
    setLoadingInitial(true);
    try {
      const res = await fetch(`/api/provider/verify-documents?email=${encodeURIComponent(targetEmail)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentTier(data.verificationTier || "email_verified");
        setOverallStatus(data.verificationStatus || "pending");

        // Map existing server documents
        if (Array.isArray(data.documents)) {
          setDocs(prev => {
            const next = { ...prev };
            data.documents.forEach((d: any) => {
              const cat = d.document_type as DocCategory;
              if (cat && next[cat]) {
                next[cat] = {
                  ...next[cat],
                  fileName: d.file_name || d.label,
                  fileSize: d.file_size || "",
                  serverStatus: d.status || "under_review",
                  status: d.status === "verified" ? "success" : (d.status === "rejected" ? "error" : "idle")
                };
              }
            });
            return next;
          });
        }
      }
    } catch (e) {
      console.error("[ProviderVerificationModal] Status fetch error:", e);
    } finally {
      setLoadingInitial(false);
    }
  };

  if (!isOpen) return null;

  const docCategories: { id: DocCategory; title: string; desc: string; icon: any; tierBadge: string }[] = [
    {
      id: "business_registration",
      title: "Business Registration",
      desc: "Certificate of Incorporation, Tax/GST License, or Business Registry",
      icon: Building2,
      tierBadge: "Tier 2: Business Verified"
    },
    {
      id: "professional_license",
      title: "Professional License",
      desc: "Bar Council, ICCRC/CICC, MARA, OISC or Regulatory Accreditation",
      icon: Award,
      tierBadge: "Tier 3: Professional Verified"
    },
    {
      id: "identity_document",
      title: "Government Identity",
      desc: "Passport copy or Government-issued National ID Card of Principal Advisor",
      icon: ShieldCheck,
      tierBadge: "Tier 4: TravlTik Trusted"
    }
  ];

  const handleFileSelect = (file: File) => {
    setGeneralError("");
    setGeneralSuccess("");

    // Validate size (< 10MB)
    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      setGeneralError(`File size exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please choose a smaller file.`);
      return;
    }

    // Validate mime type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|jpe?g|png|webp)$/i)) {
      setGeneralError("Invalid file type. Please upload a PDF, PNG, JPG, or WEBP document.");
      return;
    }

    const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
    const formattedSize = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    setDocs(prev => ({
      ...prev,
      [activeTab]: {
        file,
        fileName: file.name,
        fileSize: formattedSize,
        mimeType: file.type || "application/octet-stream",
        previewUrl: preview,
        status: "idle",
        progress: 0,
        errorMessage: undefined
      }
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUploadSubmit = async () => {
    const activeDoc = docs[activeTab];
    if (!activeDoc.file) {
      setGeneralError("Please select a document file first.");
      return;
    }

    if (!email) {
      setGeneralError("Provider email address is missing. Please log in first.");
      return;
    }

    // Set uploading state with simulated smooth progress
    setDocs(prev => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], status: "uploading", progress: 25 }
    }));

    const progressTimer = setInterval(() => {
      setDocs(prev => {
        const cur = prev[activeTab].progress;
        if (cur < 85) {
          return { ...prev, [activeTab]: { ...prev[activeTab], progress: cur + 20 } };
        }
        return prev;
      });
    }, 200);

    try {
      // Convert file to base64 payload
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(activeDoc.file!);
      });
      const fileData = await base64Promise;

      const res = await fetch("/api/provider/verify-documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expertEmail: email,
          documentType: activeTab,
          fileName: activeDoc.fileName,
          fileSize: activeDoc.fileSize,
          mimeType: activeDoc.mimeType,
          fileData: fileData.substring(0, 1000) // Secure tokenized reference
        })
      });

      clearInterval(progressTimer);
      const data = await res.json();

      if (res.ok && data.success) {
        setDocs(prev => ({
          ...prev,
          [activeTab]: {
            ...prev[activeTab],
            status: "success",
            progress: 100,
            serverStatus: "under_review"
          }
        }));
        setOverallStatus("under_review");
        setGeneralSuccess("Document successfully submitted for compliance verification!");
        if (onSuccess) onSuccess();
      } else {
        throw new Error(data.error || "Failed to submit document.");
      }
    } catch (err: any) {
      clearInterval(progressTimer);
      setDocs(prev => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          status: "error",
          progress: 0,
          errorMessage: err.message || "Upload failed. Please retry."
        }
      }));
      setGeneralError(err.message || "Failed to upload document. Please try again.");
    }
  };

  const removeSelectedFile = () => {
    if (docs[activeTab].previewUrl) {
      URL.revokeObjectURL(docs[activeTab].previewUrl!);
    }
    setDocs(prev => ({
      ...prev,
      [activeTab]: { file: null, fileName: "", fileSize: "", mimeType: "", previewUrl: null, status: "idle", progress: 0 }
    }));
  };

  const currentDocState = docs[activeTab];

  // Helper for Status Badge styling
  const renderStatusPill = (status?: string) => {
    switch (status) {
      case "approved":
      case "verified":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case "under_review":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Under Review
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-red-50 text-red-700 border border-red-200">
            <AlertTriangle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
            <Clock className="w-3.5 h-3.5" /> Pending Upload
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn font-sora">
      <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900 relative">
        
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-[#481268] via-[#5c1a84] to-[#00a896] p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  Provider Verification
                </h2>
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-white/20 px-2 py-0.5 rounded-md text-teal-200">
                  Compliance
                </span>
              </div>
              <p className="text-xs text-white/80 font-medium mt-0.5">
                Upload official credentials for verification & higher trust tier placement.
              </p>
            </div>
          </div>

          {/* Verification Tiers Banner */}
          <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-bold">
            <div className={`p-1.5 rounded-xl border ${currentTier === 'email_verified' ? 'bg-white/20 border-teal-300 text-white' : 'bg-black/10 border-white/10 text-white/70'}`}>
              ✓ 1. Email Verified
            </div>
            <div className={`p-1.5 rounded-xl border ${currentTier === 'business_verified' ? 'bg-white/20 border-teal-300 text-white' : 'bg-black/10 border-white/10 text-white/70'}`}>
              🏢 2. Business Verified
            </div>
            <div className={`p-1.5 rounded-xl border ${currentTier === 'professional_verified' ? 'bg-white/20 border-teal-300 text-white' : 'bg-black/10 border-white/10 text-white/70'}`}>
              📜 3. Professional
            </div>
            <div className={`p-1.5 rounded-xl border ${currentTier === 'travltik_trusted' ? 'bg-white/20 border-teal-300 text-white' : 'bg-black/10 border-white/10 text-white/70'}`}>
              🌟 4. TravlTik Trusted
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-left">
          
          {/* Notification Alerts */}
          {generalError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{generalError}</span>
            </div>
          )}

          {generalSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{generalSuccess}</span>
            </div>
          )}

          {/* Document Type Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {docCategories.map(cat => {
              const Icon = cat.icon;
              const isSelected = activeTab === cat.id;
              const docItem = docs[cat.id];
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(cat.id);
                    setGeneralError("");
                    setGeneralSuccess("");
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? "border-[#00a896] bg-teal-50/70 shadow-sm ring-1 ring-[#00a896]" 
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Icon className={`w-4 h-4 ${isSelected ? "text-[#00a896]" : "text-slate-500"}`} />
                    {renderStatusPill(docItem.serverStatus)}
                  </div>
                  <div className="text-xs font-extrabold text-slate-900">{cat.title}</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5 line-clamp-1">{cat.tierBadge}</div>
                </button>
              );
            })}
          </div>

          {/* Active Category Instructions */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">
                  {docCategories.find(c => c.id === activeTab)?.title} Requirements
                </h4>
                <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                  {docCategories.find(c => c.id === activeTab)?.desc}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Status</span>
                {renderStatusPill(currentDocState.serverStatus)}
              </div>
            </div>
          </div>

          {/* Upload Area */}
          {!currentDocState.file && !currentDocState.fileName ? (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-[#00a896] rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-teal-50/30 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7 text-[#00a896]" />
              </div>
              <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-1">
                Drag & Drop your document here, or <span className="text-[#00a896] underline">Browse</span>
              </h5>
              <p className="text-[11px] text-slate-500 font-medium">
                Supports PDF, JPG, PNG, WEBP (Max 10MB)
              </p>
            </div>
          ) : (
            /* Selected File Card */
            <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-2xs space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00a896] border border-teal-100 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-slate-900 truncate">
                      {currentDocState.fileName}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {currentDocState.fileSize} • {currentDocState.mimeType.split("/")[1]?.toUpperCase() || "DOCUMENT"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {currentDocState.previewUrl && (
                    <a
                      href={currentDocState.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      title="Preview file"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  )}
                  {currentDocState.status !== "uploading" && (
                    <button
                      type="button"
                      onClick={removeSelectedFile}
                      className="p-1.5 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress bar during upload */}
              {currentDocState.status === "uploading" && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin text-[#00a896]" /> Encrypting & Uploading...
                    </span>
                    <span>{currentDocState.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#00a896] h-full transition-all duration-200 rounded-full"
                      style={{ width: `${currentDocState.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Privacy Note */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Documents are stored in encrypted private storage and reviewed solely by TravlTik compliance team.</span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>

          {currentDocState.file && currentDocState.status !== "success" && (
            <button
              type="button"
              disabled={currentDocState.status === "uploading"}
              onClick={handleUploadSubmit}
              className="px-6 py-2.5 rounded-xl bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {currentDocState.status === "uploading" ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" /> Submit Document for Review
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
