/**
 * Reminders.tsx
 * Bottom section containing:
 * 1. Important Reminders card
 * 2. Recommended for You card
 * 3. Trust & Security footer badge bar
 * Matches the reference design (Desktop & Mobile).
 */
import React from 'react';
import {
  RotateCcw,
  FileText,
  Shield,
  CreditCard,
  ChevronRight,
  ShieldCheck,
  Award,
  Headphones,
} from 'lucide-react';

export interface RemindersProps {
  onViewAllReminders?: () => void;
  onViewAllRecommendations?: () => void;
  onReminderClick?: (title: string) => void;
  onRecommendationClick?: (title: string) => void;
}

export const Reminders: React.FC<RemindersProps> = ({
  onViewAllReminders,
  onViewAllRecommendations,
  onReminderClick,
  onRecommendationClick,
}) => {
  return (
    <div className="space-y-6">
      {/* 2-Column Grid: Reminders & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {/* Left: Important Reminders */}
        <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-7 shadow-xs hover:shadow-sm transition-all space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Important Reminders
            </h3>
            {onViewAllReminders && (
              <button
                type="button"
                onClick={onViewAllReminders}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                View All
              </button>
            )}
          </div>

          <div className="space-y-3.5">
            {/* Reminder 1: Passport */}
            <div
              onClick={() => onReminderClick && onReminderClick('Passport Expiry')}
              className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center shrink-0 shadow-2xs">
                <RotateCcw className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                  Passport expires in 2 years
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  Check expiry date and renew if needed
                </p>
              </div>
            </div>

            {/* Reminder 2: Bank Statement */}
            <div
              onClick={() => onReminderClick && onReminderClick('Bank Statement')}
              className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 shadow-2xs">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                  Bank Statement
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  Upload latest statement
                </p>
              </div>
            </div>

            {/* Reminder 3: Travel Insurance */}
            <div
              onClick={() => onReminderClick && onReminderClick('Travel Insurance')}
              className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0 shadow-2xs">
                <Shield className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                  Travel Insurance
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  Get your travel insurance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recommended for You */}
        <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-7 shadow-xs hover:shadow-sm transition-all space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Recommended for You
            </h3>
            {onViewAllRecommendations && (
              <button
                type="button"
                onClick={onViewAllRecommendations}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                View All
              </button>
            )}
          </div>

          <div className="space-y-3.5">
            {/* Rec 1: Travel Insurance */}
            <div
              onClick={() => onRecommendationClick && onRecommendationClick('Travel Insurance')}
              className="group flex items-center justify-between p-3 rounded-2xl bg-slate-50/60 hover:bg-purple-50/40 border border-slate-100 hover:border-purple-100 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <Shield className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    Travel Insurance
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Compare and buy the best travel insurance
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Rec 2: Forex Card */}
            <div
              onClick={() => onRecommendationClick && onRecommendationClick('Forex Card')}
              className="group flex items-center justify-between p-3 rounded-2xl bg-slate-50/60 hover:bg-emerald-50/40 border border-slate-100 hover:border-emerald-100 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <CreditCard className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Forex Card
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Save on international transactions
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Footer Bar */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Trust 1 */}
          <div className="flex items-center gap-3.5 sm:px-4 pt-2 md:pt-0">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00a896] flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                Secure &amp; Trusted
              </h5>
              <p className="text-[11px] text-slate-400 font-medium">
                Your data is safe with us
              </p>
            </div>
          </div>

          {/* Trust 2 */}
          <div className="flex items-center gap-3.5 sm:px-4 pt-3 md:pt-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
              <Award className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                Expert Guidance
              </h5>
              <p className="text-[11px] text-slate-400 font-medium">
                Connect with verified experts
              </p>
            </div>
          </div>

          {/* Trust 3 */}
          <div className="flex items-center gap-3.5 sm:px-4 pt-3 md:pt-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
              <Headphones className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                24/7 Support
              </h5>
              <p className="text-[11px] text-slate-400 font-medium">
                We're here to help
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reminders;
