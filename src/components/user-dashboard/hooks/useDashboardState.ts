import { useState, useEffect } from "react";
import {
  LayoutDashboard, Briefcase, ShieldCheck, Luggage,
  FileText, Calendar, Bookmark, Lock, BookOpen, User
} from "lucide-react";
import { normalizeCountryName } from "../utils/countryHelpers";
import { useVaultPassword } from "./useVaultPassword";
import { useApplications } from "./useApplications";
import { useLuggageChecklist } from "./useLuggageChecklist";
import { useReadinessAudit } from "./useReadinessAudit";
import { useDocuments } from "./useDocuments";

export function useDashboardState() {
  const [dashboardSearch, setDashboardSearch] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [passportCountry, setPassportCountry] = useState("");
  const [countryOfCitizenship, setCountryOfCitizenship] = useState("");
  const [residentOf, setResidentOf] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedDests, setSelectedDests] = useState<string[]>([]);
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab) {
        if (tab === "pre-departure" || tab === "predeparture" || tab === "luggage" || tab === "packing") return "predeparture";
        if (tab === "vault" || tab === "documents" || tab === "scanned-documents") return "scanned-documents";
        if (tab === "readiness" || tab === "visa-readiness") return "visa-readiness";
        if (tab === "cases" || tab === "applications") return "cases";
        return tab;
      }
    }
    return "dashboard";
  });

  const [selectedPassport, setSelectedPassport] = useState('India');
  const [selectedDestination, setSelectedDestination] = useState('United States');
  const [selectedPurpose, setSelectedPurpose] = useState('Tourism / Vacation');
  const [profileUpdatedToast, setProfileUpdatedToast] = useState(false);
  const [dashboardToast, setDashboardToast] = useState<string | null>(null);

  const showToastMsg = (msg: string) => {
    setDashboardToast(msg);
    setTimeout(() => setDashboardToast(null), 3500);
  };

  const userDisplayName = firstName || (email ? email.split("@")[0] : "User");
  const fullName = `${firstName} ${lastName}`.trim() || userDisplayName;

  // Edit Profile Modal States
  const [modalFirstName, setModalFirstName] = useState("");
  const [modalLastName, setModalLastName] = useState("");
  const [modalPhone, setModalPhone] = useState("");
  const [modalPassportCountry, setModalPassportCountry] = useState("");
  const [modalResidentOf, setModalResidentOf] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [modalGoals, setModalGoals] = useState("");
  const [modalDestinations, setModalDestinations] = useState("");
  const [modalCity, setModalCity] = useState("");
  const [modalState, setModalState] = useState("");
  const [modalZip, setModalZip] = useState("");
  const [modalPhoto, setModalPhoto] = useState("");

  // Sub-hooks
  const vaultPassword = useVaultPassword(email);

  const docHook = useDocuments({
    email,
    selectedDestination,
    selectedPassport,
    fullName,
    passportCountry
  });

  const appHook = useApplications({
    email,
    documents: docHook.documents,
    selectedDestination,
    selectedPassport,
    selectedPurpose,
    onSyncJourneyParams: (dest, pass, purp) => {
      setSelectedDestination(dest);
      setSelectedPassport(pass);
      setSelectedPurpose(purp);
    },
    onSwitchTab: (tab) => setActiveTab(tab),
    showToastMsg
  });

  const luggageHook = useLuggageChecklist({
    selectedDestination,
    selectedPassport,
    selectedPurpose,
    showToastMsg
  });

  const auditHook = useReadinessAudit({
    selectedDestination,
    selectedPassport,
    selectedPurpose,
    documents: docHook.documents,
    vaultChecklistState: docHook.vaultChecklistState,
    setVaultChecklistState: docHook.setVaultChecklistState
  });

  const fetchAiRequirements = async (dest: string, pass: string, purp: string) => {
    auditHook.setIsLoadingAi(true);
    try {
      const res = await fetch('/api/visa-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: dest, passport_country: pass, purpose: purp })
      });
      const data = await res.json();
      if (data && data.success && data.data) {
        auditHook.setAiVisaData(data.data);
      }
    } catch (e) {
      console.error('Error fetching AI visa requirements:', e);
    } finally {
      auditHook.setIsLoadingAi(false);
    }
  };

  const handleCreateOrSwitchTripProfile = (dest?: string, pass?: string, purp?: string) => {
    const targetDest = normalizeCountryName(dest || selectedDestination);
    const targetPass = normalizeCountryName(pass || selectedPassport);
    const targetPurp = purp || selectedPurpose;

    setSelectedDestination(targetDest);
    setSelectedPassport(targetPass);
    setSelectedPurpose(targetPurp);

    try {
      const profile = { destination: targetDest, passport: targetPass, purpose: targetPurp, updatedAt: new Date().toISOString() };
      localStorage.setItem("active_travel_profile", JSON.stringify(profile));
      localStorage.setItem("user_journey_destination", targetDest);
      localStorage.setItem("user_journey_passport", targetPass);
      localStorage.setItem("user_journey_purpose", targetPurp);
    } catch(e) {}

    fetchAiRequirements(targetDest, targetPass, targetPurp);
    setProfileUpdatedToast(true);
    setTimeout(() => setProfileUpdatedToast(false), 3500);
  };

  // Profile Save Modal Handler
  const handleSaveProfileModal = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPhone = modalPhone.startsWith("+") ? modalPhone : (countryCode + " " + modalPhone).trim();
    setFirstName(modalFirstName);
    setLastName(modalLastName);
    setPhone(formattedPhone);
    setCountryOfCitizenship(modalPassportCountry);
    setPassportCountry(modalPassportCountry);
    setResidentOf(modalResidentOf);
    setProfilePhoto(modalPhoto);

    const goalsArr = modalGoals.split(",").map(g => g.trim()).filter(Boolean);
    const destsArr = modalDestinations.split(",").map(d => d.trim()).filter(Boolean);
    setSelectedGoals(goalsArr);
    setSelectedDests(destsArr);

    try {
      localStorage.setItem("seeker_firstName", modalFirstName);
      localStorage.setItem("seeker_lastName", modalLastName);
      localStorage.setItem("seeker_phone", formattedPhone);
      localStorage.setItem("seeker_passportCountry", modalPassportCountry);
      localStorage.setItem("seeker_country_of_citizenship", modalPassportCountry);
      localStorage.setItem("seeker_resident_of", modalResidentOf);
      localStorage.setItem("seeker_destinations", modalDestinations);
      localStorage.setItem("seeker_profilePhoto", modalPhoto);

      const uStr = localStorage.getItem("travltik_user");
      if (uStr) {
        const u = JSON.parse(uStr);
        u.displayName = `${modalFirstName} ${modalLastName}`.trim() || modalFirstName;
        u.firstName = modalFirstName;
        u.lastName = modalLastName;
        if (modalPhoto) u.photoURL = modalPhoto;
        localStorage.setItem("travltik_user", JSON.stringify(u));
      }
    } catch(e) {}

    setIsProfileIncomplete(false);
    setShowProfileModal(false);
    showToastMsg("✓ Profile details saved successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("travltik_user");
    localStorage.removeItem("seeker_firstName");
    localStorage.removeItem("seeker_lastName");
    localStorage.removeItem("seeker_email");
    localStorage.removeItem("seeker_phone");
    localStorage.removeItem("seeker_passportCountry");
    localStorage.removeItem("seeker_goals");
    localStorage.removeItem("seeker_destinations");
    localStorage.removeItem("seeker_profilePhoto");
    window.location.href = "/";
  };

  // Initial Account & Storage Hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDocs = localStorage.getItem("seeker_documents");
      if (savedDocs) {
        try {
          const parsedDocs = JSON.parse(savedDocs);
          if (Array.isArray(parsedDocs) && parsedDocs.length > 0) {
            const cleanDocs = parsedDocs.filter((d: any) => 
              d && (d.fileData || d.isRealUpload || (d.scannedMethod === 'OCR Scanned' && d.id && !d.id.startsWith('doc_req_') && d.id !== 'global_passport'))
            );
            docHook.setDocuments(cleanDocs);
          }
        } catch(e) {}
      }

      const activeCasesStr = localStorage.getItem("active_visa_cases");
      if (activeCasesStr) {
        try {
          const parsedCases = JSON.parse(activeCasesStr);
          if (Array.isArray(parsedCases) && parsedCases.length > 0) {
            appHook.setVisasProcessingState(parsedCases);
          }
        } catch(e) {}
      }

      const savedProfileStr = localStorage.getItem("active_travel_profile");
      let initialDest = 'United States';
      let initialPass = 'India';
      let initialPurp = 'Tourism / Vacation';

      if (savedProfileStr) {
        try {
          const p = JSON.parse(savedProfileStr);
          if (p.destination) initialDest = normalizeCountryName(p.destination);
          if (p.passport) initialPass = normalizeCountryName(p.passport);
          if (p.purpose) initialPurp = p.purpose;
        } catch(e) {}
      }

      setSelectedDestination(initialDest);
      setSelectedPassport(initialPass);
      setSelectedPurpose(initialPurp);

      fetchAiRequirements(initialDest, initialPass, initialPurp);

      const userStr = localStorage.getItem("travltik_user");
      const savedEmail = localStorage.getItem("seeker_email");
      if (userStr) {
        try {
          const u = JSON.parse(userStr);
          if (u && u.email) setEmail(u.email);
          if (u && u.name) {
            const parts = u.name.split(" ");
            if (parts[0]) setFirstName(parts[0]);
            if (parts[1]) setLastName(parts.slice(1).join(" "));
          }
        } catch(e) {}
      }
      if (savedEmail) setEmail(savedEmail);

      fetch('/api/auth/me')
        .then(r => r.json())
        .then(authRes => {
          if (authRes?.user?.email) setEmail(authRes.user.email);
        })
        .catch(() => {});

      const savedFirst = localStorage.getItem("seeker_firstName");
      if (savedFirst) {
        setFirstName(savedFirst);
        setModalFirstName(savedFirst);
      }
      const savedLast = localStorage.getItem("seeker_lastName");
      if (savedLast) {
        setLastName(savedLast);
        setModalLastName(savedLast);
      }
      const savedPhone = localStorage.getItem("seeker_phone");
      if (savedPhone) {
        setPhone(savedPhone);
        const match = savedPhone.match(/^(\+\d+)\s*(.*)$/);
        if (match) {
          setCountryCode(match[1]);
          setModalPhone(match[2]);
        } else {
          setModalPhone(savedPhone);
        }
      }
      const savedCountry = localStorage.getItem("seeker_passportCountry");
      if (savedCountry) {
        setPassportCountry(savedCountry);
        setCountryOfCitizenship(savedCountry);
        setModalPassportCountry(savedCountry);
      }
      const savedResidence = localStorage.getItem("seeker_resident_of");
      if (savedResidence) {
        setResidentOf(savedResidence);
        setModalResidentOf(savedResidence);
      }
      const savedPhoto = localStorage.getItem("seeker_profilePhoto") || localStorage.getItem("seeker_profilePhotoUrl") || "";
      setProfilePhoto(savedPhoto);
      setModalPhoto(savedPhoto);

      const hasPhone = Boolean(localStorage.getItem("seeker_phone"));
      const hasCitizenship = Boolean(localStorage.getItem("seeker_country_of_citizenship") || localStorage.getItem("seeker_passportCountry"));
      const hasResidence = Boolean(localStorage.getItem("seeker_resident_of"));
      const hasDestinations = Boolean(localStorage.getItem("seeker_destinations"));
      setIsProfileIncomplete(!hasPhone || !hasCitizenship || !hasResidence || !hasDestinations);
    }
  }, []);

  // Check vault password on tab switch
  useEffect(() => {
    if (activeTab === "scanned-documents") {
      vaultPassword.checkVaultPasswordStatus();
    } else {
      vaultPassword.setIsVaultUnlocked(false);
      vaultPassword.setVaultPasswordInput("");
      vaultPassword.setVaultError(null);
    }
  }, [activeTab]);

  const navSections = [
    {
      title: "GENERAL",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "cases", label: "Visa Applications", icon: Briefcase, count: appHook.visasProcessingState.length > 0 ? appHook.visasProcessingState.length : undefined },
        { 
          id: "visa-readiness", 
          label: "Visa Readiness", 
          icon: ShieldCheck, 
          badge: auditHook.comprehensiveAuditMetrics.isUnselected ? undefined : `${auditHook.comprehensiveAuditMetrics.score}%`, 
          badgeColor: auditHook.comprehensiveAuditMetrics.score >= 70
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
            : auditHook.comprehensiveAuditMetrics.score >= 40
            ? "bg-amber-50 text-amber-700 border border-amber-200/60"
            : "bg-rose-50 text-rose-700 border border-rose-200/60"
        },
        { id: "predeparture", label: "Pre-Departure", icon: Luggage, badge: "AI", badgeColor: "bg-emerald-50 text-emerald-700 border border-emerald-200/60" },
      ]
    },
    {
      title: "TOOLS",
      items: [
        { id: "scanned-documents", label: "Document Vault", icon: FileText },
        { id: "consultations", label: "Bookings & Sessions", icon: Calendar },
        { id: "favourite-experts", label: "Saved Service Providers", icon: Bookmark },
        { id: "escrow-milestones", label: "Escrow Vault", icon: Lock, badge: "SAFE", badgeColor: "bg-teal-50 text-teal-700 border border-teal-200/60" },
      ]
    },
    {
      title: "SUPPORT",
      items: [
        { id: "visa-history", label: "Visa History", icon: BookOpen },
        { id: "profile", label: "Settings", icon: User },
      ]
    }
  ];

  const allNavItems = navSections.flatMap(s => s.items);

  return {
    dashboardSearch,
    setDashboardSearch,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    showProfileModal,
    setShowProfileModal,
    firstName,
    lastName,
    phone,
    email,
    passportCountry,
    countryOfCitizenship,
    residentOf,
    selectedGoals,
    selectedDests,
    isProfileIncomplete,
    profilePhoto,
    userDisplayName,
    fullName,
    activeTab,
    setActiveTab,
    selectedPassport,
    setSelectedPassport,
    selectedDestination,
    setSelectedDestination,
    selectedPurpose,
    setSelectedPurpose,
    profileUpdatedToast,
    dashboardToast,
    showToastMsg,
    modalFirstName,
    setModalFirstName,
    modalLastName,
    setModalLastName,
    modalPhone,
    setModalPhone,
    modalPassportCountry,
    setModalPassportCountry,
    modalResidentOf,
    setModalResidentOf,
    countryCode,
    setCountryCode,
    modalGoals,
    setModalGoals,
    modalDestinations,
    setModalDestinations,
    modalCity,
    setModalCity,
    modalState,
    setModalState,
    modalZip,
    setModalZip,
    modalPhoto,
    setModalPhoto,
    handleSaveProfileModal,
    handleLogout,
    fetchAiRequirements,
    handleCreateOrSwitchTripProfile,
    navSections,
    allNavItems,
    // Sub-hooks
    vaultPassword,
    applications: appHook,
    luggage: luggageHook,
    readiness: auditHook,
    documents: docHook
  };
}
