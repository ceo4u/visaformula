import { useState } from "react";
import { normalizeCountryName, getFlagEmoji } from "../utils/countryHelpers";

export function useApplications({
  email,
  documents = [],
  selectedDestination = "United States",
  selectedPassport = "India",
  selectedPurpose = "Tourism / Vacation",
  onSyncJourneyParams,
  onSwitchTab,
  showToastMsg
}: {
  email?: string;
  documents?: any[];
  selectedDestination?: string;
  selectedPassport?: string;
  selectedPurpose?: string;
  onSyncJourneyParams?: (dest: string, pass: string, purp: string) => void;
  onSwitchTab?: (tab: string) => void;
  showToastMsg?: (msg: string) => void;
}) {
  const [visasProcessingState, setVisasProcessingState] = useState<any[]>([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);

  // Application naming & creation modal states
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [newAppName, setNewAppName] = useState("");
  const [newAppDest, setNewAppDest] = useState("");
  const [newAppPass, setNewAppPass] = useState("India");
  const [newAppPurpose, setNewAppPurpose] = useState("Tourism / Vacation");
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [editingAppName, setEditingAppName] = useState("");
  const [copiedTrackingId, setCopiedTrackingId] = useState<string | null>(null);

  const persistApplicationsToDB = (apps: any[]) => {
    try {
      const userEmail = email || (typeof window !== 'undefined' ? (localStorage.getItem("seeker_email") || "") : "");
      if (userEmail && Array.isArray(apps)) {
        fetch('/api/user/vault-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'save_applications',
            email: userEmail,
            applications: apps
          })
        }).catch(e => console.warn('Failed saving applications to DB:', e));
      }
    } catch(e) {}
  };

  const handleCreateNewApplication = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (visasProcessingState.length >= 3) {
      if (showToastMsg) {
        showToastMsg("⚠️ Limit reached: Maximum 3 active visa applications allowed. Please delete or complete an existing application first.");
      }
      setShowNewAppModal(false);
      return;
    }
    const targetDest = normalizeCountryName(newAppDest || selectedDestination || "United States");
    const targetPass = normalizeCountryName(newAppPass || selectedPassport || "India");
    const targetPurp = newAppPurpose || selectedPurpose || "Tourism / Vacation";
    const appName = (newAppName || "").trim() || `${targetDest} ${targetPurp.includes('Study') ? 'Student Visa' : targetPurp.includes('Work') ? 'Work Visa' : 'Tourist Visa'}`;
    
    const uniqueAppId = `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const destCode = targetDest.slice(0, 2).toUpperCase();
    const uniqueTrackingId = `TT-${destCode}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const flag = getFlagEmoji(targetDest);
    const visaType = targetPurp.includes('Study') ? 'F-1 / Tier-4 Student Visa' : targetPurp.includes('Work') ? 'Skilled Worker Visa' : 'Tourist / Visitor Visa';

    const genuineUploadedDocsCount = (documents || []).filter(
      (d: any) => d && (d.fileData || d.isRealUpload || (d.scannedMethod === 'OCR Scanned' && d.id && !d.id.startsWith('doc_req_') && d.id !== 'global_passport'))
    ).length;

    const newCase = {
      id: uniqueAppId,
      customName: appName,
      trackingId: uniqueTrackingId,
      destination: targetDest,
      destinationFlag: flag,
      visaType,
      purpose: targetPurp.toLowerCase().includes('study') ? 'study' : targetPurp.toLowerCase().includes('work') ? 'work' : 'tourism',
      passport: targetPass,
      status: genuineUploadedDocsCount > 0 ? "Required Documents & AI Verified" : "Requirements & Eligibility Active",
      stage: genuineUploadedDocsCount > 0 ? "Document Vault Verification" : "Requirements & Document Collection",
      progress: genuineUploadedDocsCount > 0 ? Math.min(35, 15 + genuineUploadedDocsCount * 5) : 10,
      documentsCount: genuineUploadedDocsCount,
      addonsCount: 0,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      targetDate: "Consular Filing Ready",
      createdAt: new Date().toISOString()
    };

    let existingCases: any[] = [];
    try {
      existingCases = JSON.parse(localStorage.getItem("active_visa_cases") || "[]");
    } catch(e) {}
    const updatedCases = [newCase, ...existingCases.filter((c: any) => c.id !== uniqueAppId)].slice(0, 3);
    setVisasProcessingState(updatedCases);
    try {
      localStorage.setItem("active_visa_cases", JSON.stringify(updatedCases));
    } catch(e) {}
    persistApplicationsToDB(updatedCases);

    if (onSyncJourneyParams) {
      onSyncJourneyParams(targetDest, targetPass, targetPurp);
    }

    try {
      localStorage.setItem("user_journey_destination", targetDest);
      localStorage.setItem("user_journey_passport", targetPass);
      localStorage.setItem("user_journey_purpose", targetPurp);
      localStorage.setItem("seeker_target_destination", targetDest);
      localStorage.setItem("seeker_nationality", targetPass);
    } catch(e) {}

    setShowNewAppModal(false);
    setNewAppName("");
    setNewAppDest("");
    setNewAppPass("");
    setNewAppPurpose("");

    if (onSwitchTab) {
      onSwitchTab("cases");
    }
    if (showToastMsg) {
      showToastMsg(`✓ Application "${appName}" added to your dashboard! (Tracking ID: ${uniqueTrackingId})`);
    }
  };

  const handleRenameApplication = (appId: string, newName: string) => {
    if (!newName.trim()) return;
    const updated = visasProcessingState.map(c => c.id === appId ? { ...c, customName: newName.trim() } : c);
    setVisasProcessingState(updated);
    try {
      localStorage.setItem("active_visa_cases", JSON.stringify(updated));
    } catch(e) {}
    persistApplicationsToDB(updated);
    setEditingAppId(null);
    setEditingAppName("");
    if (showToastMsg) showToastMsg("Application name updated!");
  };

  const handleDeleteApplication = (appId: string) => {
    if (confirm("Are you sure you want to remove this visa application from your dashboard?")) {
      const updated = visasProcessingState.filter(c => c.id !== appId);
      setVisasProcessingState(updated);
      try {
        localStorage.setItem("active_visa_cases", JSON.stringify(updated));
      } catch(e) {}
      persistApplicationsToDB(updated);
      if (showToastMsg) showToastMsg("Application removed from dashboard.");
    }
  };

  const handleCopyTrackingId = (trackingId: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(trackingId);
      setCopiedTrackingId(trackingId);
      if (showToastMsg) showToastMsg(`Tracking ID ${trackingId} copied!`);
      setTimeout(() => setCopiedTrackingId(null), 2500);
    }
  };

  return {
    visasProcessingState,
    setVisasProcessingState,
    selectedApplicationId,
    setSelectedApplicationId,
    showNewAppModal,
    setShowNewAppModal,
    newAppName,
    setNewAppName,
    newAppDest,
    setNewAppDest,
    newAppPass,
    setNewAppPass,
    newAppPurpose,
    setNewAppPurpose,
    editingAppId,
    setEditingAppId,
    editingAppName,
    setEditingAppName,
    copiedTrackingId,
    persistApplicationsToDB,
    handleCreateNewApplication,
    handleRenameApplication,
    handleDeleteApplication,
    handleCopyTrackingId
  };
}
