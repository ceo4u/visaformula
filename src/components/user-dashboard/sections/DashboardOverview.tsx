/**
 * DashboardOverview.tsx
 * Primary Overview Section of User Dashboard matching the reference design.
 * Features:
 * 1. Visa Readiness Card (72% circular progress ring) + Upcoming Appointment
 * 2. Quick Access 6-card grid
 * 3. My Applications 5-stage stepper tracker
 * 4. Important Reminders, Recommended for You & Trust Badges
 * 5. IELTS scorecard & vault readiness preview
 */
import React from "react";
import { VisaReadinessCard } from "../../dashboard/VisaReadinessCard";
import { UpcomingAppointment } from "../../dashboard/UpcomingAppointment";
import { QuickAccessGrid } from "../../dashboard/QuickAccessGrid";
import type { QuickAccessItem } from "../../dashboard/QuickAccessGrid";
import { MyApplications, defaultDemoCase } from "../../dashboard/MyApplications";
import type { ApplicationCase } from "../../dashboard/MyApplications";
import { Reminders } from "../../dashboard/Reminders";
import { IeltsScorecard } from "../components/IeltsScorecard";
import type { IeltsScore } from "../types";

export function DashboardOverview({
  userDisplayName,
  comprehensiveAuditMetrics,
  visasProcessingState,
  luggageProgress,
  documents,
  hasIeltsScore,
  overallBand,
  ieltsScore,
  handleUpdateIelts,
  hasVaultPassword,
  isVaultUnlocked,
  setActiveTab,
  setSelectedApplicationId
}: {
  userDisplayName: string;
  comprehensiveAuditMetrics: { score: number; isUnselected: boolean };
  visasProcessingState: any[];
  luggageProgress: { packed: number; total: number; percent: number };
  documents: any[];
  hasIeltsScore: boolean;
  overallBand: string;
  ieltsScore: IeltsScore;
  handleUpdateIelts: (score: IeltsScore) => void;
  hasVaultPassword: boolean | null;
  isVaultUnlocked: boolean;
  setActiveTab: (tab: string) => void;
  setSelectedApplicationId: (id: string | null) => void;
}) {
  // Format applications for MyApplications component
  const formattedApps: ApplicationCase[] = (visasProcessingState && visasProcessingState.length > 0)
    ? visasProcessingState.map((v: any, idx: number) => ({
        id: v.id || `case-${idx}`,
        trackingId: v.trackingId || `TT${Math.floor(100000 + Math.random() * 900000)}`,
        destination: v.destination || 'France',
        destinationFlag: v.destinationFlag || '🇫🇷',
        visaType: v.visaType || `${v.destination || 'Schengen'} Tourist Visa`,
        status: v.status || 'In Progress',
        stage: v.stage || 'Document Verification',
        progress: typeof v.progress === 'number' ? v.progress : 40,
        submittedAt: v.submittedAt || v.appliedDate || '10 May 2025',
        thumbnailUrl:
          v.thumbnailUrl ||
          (v.destination?.toLowerCase().includes('france') || v.visaType?.toLowerCase().includes('schengen')
            ? 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=400&q=80'
            : 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80')
      }))
    : [defaultDemoCase];

  // Quick Access navigation router
  const handleQuickAccessClick = (item: QuickAccessItem) => {
    if (item.id === 'visa-readiness') {
      setActiveTab('readiness');
    } else if (item.id === 'doc-checklist') {
      setActiveTab('vault');
    } else if (item.id === 'app-tracking') {
      setActiveTab('cases');
    } else if (item.id === 'travel-planner') {
      setActiveTab('luggage');
    } else if (item.href) {
      window.location.href = item.href;
    }
  };

  const calculatedScore = comprehensiveAuditMetrics?.score ? comprehensiveAuditMetrics.score : 72;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-up">
      {/* ── 1. TOP GRID: VISA READINESS & UPCOMING APPOINTMENT (Image 1) ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Visa Readiness Card (8 cols) */}
        <div className="lg:col-span-8">
          <VisaReadinessCard
            score={calculatedScore}
            completedSteps={8}
            totalSteps={11}
            inProgressCount={2}
            pendingCount={1}
            notStartedCount={0}
            onViewDetails={() => setActiveTab('readiness')}
            onContinueChecklist={() => setActiveTab('vault')}
          />
        </div>

        {/* Upcoming Appointment Card (4 cols) */}
        <div className="lg:col-span-4">
          <UpcomingAppointment
            title="Document Verification with Visa Expert"
            dateTime="24 May 2025, 11:00 AM"
            onViewAppointment={() => setActiveTab('consultations')}
          />
        </div>
      </section>

      {/* ── 2. QUICK ACCESS GRID (Image 1) ── */}
      <QuickAccessGrid onItemClick={handleQuickAccessClick} />

      {/* ── 3. MY APPLICATIONS (Image 1) ── */}
      <MyApplications
        applications={formattedApps}
        onViewAll={() => setActiveTab('cases')}
        onApplyNew={() => { window.location.href = '/visa'; }}
      />

      {/* ── 4. IMPORTANT REMINDERS, RECOMMENDED & TRUST BADGES (Image 1) ── */}
      <Reminders
        onViewAllReminders={() => setActiveTab('vault')}
        onViewAllRecommendations={() => setActiveTab('consultations')}
        onReminderClick={() => setActiveTab('vault')}
        onRecommendationClick={() => setActiveTab('consultations')}
      />

      {/* Optional IELTS band preview if user has test scores */}
      {hasIeltsScore && (
        <div className="max-w-md">
          <IeltsScorecard
            ieltsScore={ieltsScore}
            hasIeltsScore={hasIeltsScore}
            overallBand={overallBand}
            handleUpdateIelts={handleUpdateIelts}
          />
        </div>
      )}
    </div>
  );
}
export default DashboardOverview;
