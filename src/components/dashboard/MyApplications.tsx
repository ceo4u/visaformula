/**
 * MyApplications.tsx
 * Active Visa Applications tracker card with landmark image, status badge, and 5-stage stepper.
 * Syncs with localStorage 'active_visa_cases' and supports empty states.
 * Matches the reference design (Desktop & Mobile).
 */
import React from 'react';
import { Check, Clock, CreditCard, Calendar, AlertCircle, ArrowRight } from 'lucide-react';

export interface ApplicationCase {
  id: string;
  trackingId: string;
  destination: string;
  destinationFlag?: string;
  visaType: string;
  status: string;
  stage?: string;
  progress?: number;
  submittedAt?: string;
  appliedDate?: string;
  thumbnailUrl?: string;
}

export const defaultDemoCase: ApplicationCase = {
  id: 'case-schengen-france',
  trackingId: 'TT784512',
  destination: 'France',
  destinationFlag: '🇫🇷',
  visaType: 'Schengen Tourist Visa (France)',
  status: 'In Progress',
  stage: 'Document Verification',
  progress: 40,
  submittedAt: '10 May 2025',
  thumbnailUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=400&q=80',
};

export interface MyApplicationsProps {
  applications?: ApplicationCase[];
  onViewAll?: () => void;
  onSelectApplication?: (app: ApplicationCase) => void;
  onApplyNew?: () => void;
}

const STAGES = [
  { id: 1, title: 'Application Submitted', mobileTitle: 'Submitted' },
  { id: 2, title: 'Document Verification', mobileTitle: 'Verification' },
  { id: 3, title: 'Payment Completed', mobileTitle: 'Payment' },
  { id: 4, title: 'Appointment Scheduled', mobileTitle: 'Appointment' },
  { id: 5, title: 'Decision Pending', mobileTitle: 'Decision' },
];

export const MyApplications: React.FC<MyApplicationsProps> = ({
  applications = [defaultDemoCase],
  onViewAll,
  onSelectApplication,
  onApplyNew,
}) => {
  const hasApps = applications && applications.length > 0;
  const activeApp = hasApps ? applications[0] : null;

  // Determine current active step (default to step 2 for in-progress demo)
  const currentStep = 2; // Step 1 and 2 completed, step 3 next

  return (
    <section id="my-applications" className="space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          My Applications
        </h3>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            View All
          </button>
        )}
      </div>

      {!hasApps || !activeApp ? (
        // Empty State
        <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-8 text-center space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00a896] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h4 className="text-sm font-bold text-slate-800">No active applications</h4>
            <p className="text-xs text-slate-400">
              You haven't submitted any visa applications yet. Start your journey with our expert assistance.
            </p>
          </div>
          <button
            type="button"
            onClick={onApplyNew || (() => { window.location.href = '/visa'; })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00a896] hover:bg-[#009282] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <span>Explore Visas &amp; Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        // Active Application Card
        <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-7 shadow-xs hover:shadow-sm transition-all space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Left: Thumbnail and Details */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-2xs">
                <img
                  src={activeApp.thumbnailUrl || "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=400&q=80"}
                  alt={activeApp.destination || "Destination Landmark"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to Eiffel tower or travel placeholder
                    (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80";
                  }}
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {activeApp.visaType || `${activeApp.destination} Visa`}
                  </h4>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                    {activeApp.status || 'In Progress'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap">
                  <span>Application ID: <strong className="text-slate-700">{activeApp.trackingId}</strong></span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400">Applied on: {activeApp.submittedAt || activeApp.appliedDate || '10 May 2025'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Tracker */}
          <div className="pt-2">
            <div className="relative">
              {/* Steps Progress Line */}
              <div className="hidden sm:block absolute top-4 left-[10%] right-[10%] h-0.5 bg-slate-200 -z-0">
                <div
                  className="h-full bg-[#00a896] transition-all duration-700"
                  style={{ width: `${((currentStep - 1) / (STAGES.length - 1)) * 100}%` }}
                />
              </div>

              {/* Step Circles Grid */}
              <div className="grid grid-cols-5 gap-1 sm:gap-2 relative z-10">
                {STAGES.map((st, idx) => {
                  const stepNum = idx + 1;
                  const isCompleted = stepNum <= currentStep;
                  const isCurrent = stepNum === currentStep + 1;

                  return (
                    <div key={st.id} className="flex flex-col items-center text-center space-y-2">
                      {/* Step Circle */}
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-2xs ${
                          isCompleted
                            ? 'bg-[#00a896] text-white'
                            : isCurrent
                            ? 'border-2 border-[#00a896] bg-white text-[#00a896]'
                            : 'border-2 border-slate-200 bg-white text-slate-400'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : stepNum === 3 ? (
                          <CreditCard className="w-3.5 h-3.5" />
                        ) : stepNum === 4 ? (
                          <Calendar className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                      </div>

                      {/* Step Title */}
                      <span
                        className={`text-[10px] sm:text-xs font-semibold leading-tight max-w-[80px] sm:max-w-none ${
                          isCompleted
                            ? 'text-slate-900 font-bold'
                            : isCurrent
                            ? 'text-[#00a896] font-bold'
                            : 'text-slate-400'
                        }`}
                      >
                        <span className="sm:hidden">{st.mobileTitle}</span>
                        <span className="hidden sm:inline">{st.title}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default MyApplications;
