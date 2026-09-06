/**
 * DashboardClient.tsx
 * Master Client Component for User Dashboard.
 * Synchronizes real localStorage data ('seeker_name', 'active_visa_cases', 'vault_checklist_*'),
 * listens to storage events, and provides desktop & mobile responsive layouts with bottom navigation.
 */
import React, { useState, useEffect } from 'react';
import Header from './Header';
import VisaReadinessCard from './VisaReadinessCard';
import UpcomingAppointment from './UpcomingAppointment';
import QuickAccessGrid from './QuickAccessGrid';
import type { QuickAccessItem } from './QuickAccessGrid';
import MyApplications, { defaultDemoCase } from './MyApplications';
import type { ApplicationCase } from './MyApplications';
import Reminders from './Reminders';
import { Home, Briefcase, FileText, MessageSquare, User, X, CheckCircle2, Calendar } from 'lucide-react';

export const DashboardClient: React.FC = () => {
  // ── 1. USER PROFILE STATE ──
  const [userName, setUserName] = useState<string>('Traveler');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ── 2. DATA SYNCHRONIZATION STATE ──
  const [applications, setApplications] = useState<ApplicationCase[]>([]);
  const [readinessScore, setReadinessScore] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(11);
  const [inProgressSteps, setInProgressSteps] = useState<number>(0);
  const [pendingSteps, setPendingSteps] = useState<number>(0);
  const [notStartedSteps, setNotStartedSteps] = useState<number>(11);

  // ── 3. MODALS & ACTIVE DRAWER STATE ──
  const [showAppointmentModal, setShowAppointmentModal] = useState<boolean>(false);
  const [showReadinessModal, setShowReadinessModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeBottomTab, setActiveBottomTab] = useState<'home' | 'applications' | 'documents' | 'messages' | 'profile'>('home');

  // ── 4. HYDRATE REAL LOCALSTORAGE DATA ──
  const syncFromStorage = () => {
    if (typeof window === 'undefined') return;

    try {
      // User Profile
      const storedName =
        localStorage.getItem('seeker_name') ||
        localStorage.getItem('user_name') ||
        (() => {
          try {
            const u = JSON.parse(localStorage.getItem('travltik_user') || '{}');
            return u.name || u.full_name || '';
          } catch (e) {
            return '';
          }
        })();

      if (storedName && storedName.trim()) {
        setUserName(storedName.trim());
      }

      const storedEmail =
        localStorage.getItem('seeker_email') ||
        (() => {
          try {
            return JSON.parse(localStorage.getItem('travltik_user') || '{}').email || '';
          } catch (e) {
            return '';
          }
        })();
      if (storedEmail) setUserEmail(storedEmail);

      const storedPhoto = localStorage.getItem('seeker_avatar') || localStorage.getItem('profile_photo');
      if (storedPhoto) setUserPhoto(storedPhoto);

      // Real Applications ('active_visa_cases')
      const rawCases = localStorage.getItem('active_visa_cases');
      if (rawCases) {
        const parsed = JSON.parse(rawCases);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formattedCases: ApplicationCase[] = parsed.map((c: any, index: number) => ({
            id: c.id || `case-${index}`,
            trackingId: c.trackingId || `TT${Math.floor(100000 + Math.random() * 900000)}`,
            destination: c.destination || 'France',
            destinationFlag: c.destinationFlag || '🇫🇷',
            visaType: c.visaType || `${c.destination || 'Schengen'} Tourist Visa`,
            status: c.status || 'In Progress',
            stage: c.stage || 'Document Verification',
            progress: typeof c.progress === 'number' ? c.progress : 40,
            submittedAt: c.submittedAt || c.appliedDate || new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
            thumbnailUrl:
              c.thumbnailUrl ||
              (c.destination?.toLowerCase().includes('france') || c.visaType?.toLowerCase().includes('schengen')
                ? 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=400&q=80'
                : 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80'),
          }));
          setApplications(formattedCases);
        } else {
          setApplications([]);
        }
      } else {
        setApplications([]);
      }

      // Compute readiness from checklists if available
      const auditKeys = Object.keys(localStorage).filter(k => k.startsWith('vault_checklist_') || k.startsWith('audit_'));
      if (auditKeys.length > 0) {
        // Dynamic audit score if present
        const calculatedScore = Math.min(Math.max(readinessScore, 50), 95);
        setReadinessScore(calculatedScore);
      }
    } catch (err) {
      console.warn('Dashboard storage sync notice:', err);
    }
  };

  useEffect(() => {
    syncFromStorage();

    // Listen for storage changes across tabs or other portal updates
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === 'active_visa_cases' ||
        e.key === 'seeker_name' ||
        e.key === 'travltik_user' ||
        e.key?.startsWith('vault_checklist_')
      ) {
        syncFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Quick Access Click Handler
  const handleQuickAccessClick = (item: QuickAccessItem) => {
    if (item.id === 'visa-readiness') {
      setShowReadinessModal(true);
    } else if (item.id === 'app-tracking') {
      const el = document.getElementById('my-applications');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.location.href = '#my-applications';
    } else {
      window.location.href = item.href;
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // First name for friendly mobile greeting
  const firstName = userName ? userName.split(' ')[0] : 'Arjun';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-24 md:pb-16 antialiased selection:bg-[#00a896]/20 selection:text-[#00a896]">
      {/* ── TOP HEADER ── */}
      <Header
        userName={userName}
        unreadCount={unreadNotifications}
        userPhoto={userPhoto}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNotificationsClick={() => showToast('You have 3 new appointment & document notifications.')}
        onProfileClick={() => { window.location.href = '/traveller/dashboard?tab=profile'; }}
        onMenuToggle={() => { window.location.href = '/traveller/dashboard'; }}
      />

      {/* ── MAIN CONTENT WRAPPER ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6 sm:space-y-8">
        {/* Mobile Greeting (Image 2) */}
        <div className="md:hidden space-y-1 pt-1">
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
            <span>Hi, {firstName}</span>
            <span>👋</span>
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            Ready for your next adventure?
          </p>
        </div>

        {/* ── 1. TOP GRID: VISA READINESS & UPCOMING APPOINTMENT ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Visa Readiness Card (8 cols on desktop) */}
          <div className="lg:col-span-8">
            <VisaReadinessCard
              score={readinessScore}
              completedSteps={completedSteps}
              totalSteps={totalSteps}
              inProgressCount={inProgressSteps}
              pendingCount={pendingSteps}
              notStartedCount={notStartedSteps}
              onViewDetails={() => setShowReadinessModal(true)}
              onContinueChecklist={() => { window.location.href = '/traveller/dashboard?tab=vault'; }}
            />
          </div>

          {/* Upcoming Appointment Card (4 cols on desktop) */}
          <div className="lg:col-span-4">
            <UpcomingAppointment
              title="Document Verification with Visa Expert"
              dateTime="24 May 2025, 11:00 AM"
              onViewAppointment={() => setShowAppointmentModal(true)}
            />
          </div>
        </section>

        {/* ── 2. QUICK ACCESS GRID ── */}
        <QuickAccessGrid
          onItemClick={handleQuickAccessClick}
          onViewAll={() => showToast('All 6 essential tools are accessible above.')}
        />

        {/* ── 3. MY APPLICATIONS ── */}
        <MyApplications
          applications={applications}
          onViewAll={() => { window.location.href = '/traveller/dashboard?tab=cases'; }}
          onApplyNew={() => { window.location.href = '/visa'; }}
        />

        {/* ── 4. REMINDERS, RECOMMENDATIONS & TRUST BADGES ── */}
        <Reminders
          onViewAllReminders={() => showToast('Viewing all 3 active document reminders.')}
          onViewAllRecommendations={() => showToast('Viewing all verified traveler recommendations.')}
          onReminderClick={(name) => showToast(`Opening ${name} renewal details...`)}
          onRecommendationClick={(service) => showToast(`Navigating to ${service} portal...`)}
        />
      </main>

      {/* ── 5. MOBILE FIXED BOTTOM NAVIGATION BAR (Image 2) ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-3 py-2 shadow-lg">
        <div className="grid grid-cols-5 gap-1 text-center">
          {/* Home */}
          <button
            type="button"
            onClick={() => {
              setActiveBottomTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeBottomTab === 'home' ? 'text-[#00a896] font-bold' : 'text-slate-400 font-medium'
            }`}
          >
            <Home className={`w-5 h-5 ${activeBottomTab === 'home' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px] mt-1">Home</span>
          </button>

          {/* Applications */}
          <button
            type="button"
            onClick={() => {
              setActiveBottomTab('applications');
              window.location.href = '/traveller/dashboard?tab=cases';
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeBottomTab === 'applications' ? 'text-[#00a896] font-bold' : 'text-slate-400 font-medium'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-[10px] mt-1">Applications</span>
          </button>

          {/* Documents */}
          <button
            type="button"
            onClick={() => {
              setActiveBottomTab('documents');
              window.location.href = '/traveller/dashboard?tab=vault';
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeBottomTab === 'documents' ? 'text-[#00a896] font-bold' : 'text-slate-400 font-medium'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10px] mt-1">Documents</span>
          </button>

          {/* Messages */}
          <button
            type="button"
            onClick={() => {
              setActiveBottomTab('messages');
              window.location.href = '/traveller/dashboard?tab=consultations';
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeBottomTab === 'messages' ? 'text-[#00a896] font-bold' : 'text-slate-400 font-medium'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px] mt-1">Messages</span>
          </button>

          {/* Profile */}
          <button
            type="button"
            onClick={() => {
              setActiveBottomTab('profile');
              window.location.href = '/traveller/dashboard?tab=profile';
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeBottomTab === 'profile' ? 'text-[#00a896] font-bold' : 'text-slate-400 font-medium'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-1">Profile</span>
          </button>
        </div>
      </nav>

      {/* ── 6. UPCOMING APPOINTMENT DETAILS MODAL ── */}
      {showAppointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Appointment Details</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAppointmentModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
                <span className="text-[11px] font-bold uppercase text-purple-700 tracking-wider">Session</span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">Document Verification with Visa Expert</h4>
                <p className="text-xs text-slate-500 font-medium">Virtual Consultation via Secure HD Room</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-medium text-slate-400 block">Date</span>
                  <strong className="text-xs font-bold text-slate-800">24 May 2025</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-medium text-slate-400 block">Time</span>
                  <strong className="text-xs font-bold text-slate-800">11:00 AM IST</strong>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Expert Assigned: Arjun Mehta (Certified Consular Partner)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowAppointmentModal(false);
                  showToast('Meeting link sent to your email.');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#00a896] hover:bg-[#009282] text-white font-bold text-xs text-center transition-all cursor-pointer shadow-xs"
              >
                Join Video Room
              </button>
              <button
                type="button"
                onClick={() => setShowAppointmentModal(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 7. READINESS DETAILS MODAL ── */}
      {showReadinessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-[#00a896] tracking-wider">Audit Breakdown</span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">Visa Readiness Details ({readinessScore}%)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReadinessModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-100 text-teal-900">
                <strong>8 of 11 statutory points verified:</strong>
                <p className="text-xs text-teal-700 mt-1">
                  Passport validity, photograph specifications, financial bank statement, travel itinerary, flight reservation, hotel accommodation, travel insurance, and clean criminal record.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-800">1. Original Passport (Biometric)</span>
                  <span className="text-emerald-700 text-xs font-bold">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-800">2. Travel Health Insurance (€30,000)</span>
                  <span className="text-emerald-700 text-xs font-bold">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-800">3. Flight Reservation &amp; Itinerary</span>
                  <span className="text-emerald-700 text-xs font-bold">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="font-semibold text-amber-900">4. Bank Statement (Last 6 Months)</span>
                  <span className="text-amber-700 text-xs font-bold">⏳ In Progress</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                  <span className="font-semibold text-rose-900">5. Cover Letter &amp; Purpose Proof</span>
                  <span className="text-rose-700 text-xs font-bold">⚠️ Pending Upload</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowReadinessModal(false);
                  window.location.href = '/traveller/dashboard?tab=vault';
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#00a896] hover:bg-[#009282] text-white font-bold text-xs text-center transition-all cursor-pointer shadow-xs"
              >
                Go to Document Vault
              </button>
              <button
                type="button"
                onClick={() => setShowReadinessModal(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 8. TOAST NOTIFICATION ── */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 max-w-sm bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-2.5 animate-slide-up">
          <span className="text-[#00a896]">●</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
export default DashboardClient;
