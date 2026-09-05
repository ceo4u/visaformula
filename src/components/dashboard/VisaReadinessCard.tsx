/**
 * VisaReadinessCard.tsx
 * Visa Readiness metric card with circular progress donut, steps breakdown, and action buttons.
 * Matches the reference design (Desktop & Mobile).
 */
import React from 'react';

export interface VisaReadinessCardProps {
  score?: number; // e.g. 72
  completedSteps?: number; // e.g. 8
  totalSteps?: number; // e.g. 11
  inProgressCount?: number; // e.g. 2
  pendingCount?: number; // e.g. 1
  notStartedCount?: number; // e.g. 0
  onViewDetails?: () => void;
  onContinueChecklist?: () => void;
}

export const VisaReadinessCard: React.FC<VisaReadinessCardProps> = ({
  score = 72,
  completedSteps = 8,
  totalSteps = 11,
  inProgressCount = 2,
  pendingCount = 1,
  notStartedCount = 0,
  onViewDetails,
  onContinueChecklist,
}) => {
  // SVG Donut calculation
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-7 shadow-xs hover:shadow-sm transition-shadow">
      {/* Top Tag */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <span className="text-[11px] sm:text-xs font-black uppercase text-slate-800 tracking-wider">
          VISA READINESS
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-8">
        {/* Left: Circular Progress Ring */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
            {/* Background Track */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="#E2E8F0"
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="#00a896"
              strokeWidth="11"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
              {score}%
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              Ready
            </span>
          </div>
        </div>

        {/* Right: Progress Headline & Metrics */}
        <div className="flex-1 w-full space-y-4 sm:space-y-5 text-center md:text-left">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Good progress!{' '}
              <span className="text-[#00a896] font-bold">
                {completedSteps} of {totalSteps} steps completed.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Keep going, you're almost there!
            </p>
          </div>

          {/* Horizontal Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 sm:h-2.5 overflow-hidden">
            <div
              className="bg-[#00a896] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(Math.max(score, 5), 100)}%` }}
            />
          </div>

          {/* 4 Metrics Columns */}
          <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-50">
            <div>
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {completedSteps}
              </div>
              <div className="text-[10px] sm:text-xs font-medium text-slate-400 mt-0.5">
                Completed
              </div>
            </div>

            <div>
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {inProgressCount}
              </div>
              <div className="text-[10px] sm:text-xs font-medium text-slate-400 mt-0.5">
                In Progress
              </div>
            </div>

            <div>
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {pendingCount}
              </div>
              <div className="text-[10px] sm:text-xs font-medium text-slate-400 mt-0.5">
                Pending
              </div>
            </div>

            <div>
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {notStartedCount}
              </div>
              <div className="text-[10px] sm:text-xs font-medium text-slate-400 mt-0.5">
                Not Started
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 pt-5 border-t border-slate-100">
        <button
          type="button"
          onClick={onViewDetails}
          className="w-full sm:w-auto flex-1 px-5 py-2.5 rounded-xl border border-teal-200 text-teal-800 bg-white hover:bg-teal-50/60 font-bold text-xs sm:text-sm text-center transition-all cursor-pointer shadow-2xs"
        >
          View Details
        </button>
        <button
          type="button"
          onClick={onContinueChecklist}
          className="w-full sm:w-auto flex-1 px-6 py-2.5 rounded-xl bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white font-bold text-xs sm:text-sm text-center transition-all cursor-pointer shadow-xs"
        >
          Continue Checklist
        </button>
      </div>
    </div>
  );
};
export default VisaReadinessCard;
