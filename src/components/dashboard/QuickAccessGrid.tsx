/**
 * QuickAccessGrid.tsx
 * 6-item Quick Access grid featuring color-coded icon badges and descriptive subtexts.
 * Matches the reference design (Desktop & Mobile).
 */
import React from 'react';
import {
  ShieldCheck,
  Users,
  Award,
  ClipboardList,
  Clock,
  Compass,
} from 'lucide-react';

export interface QuickAccessItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  href: string;
}

export const defaultQuickAccessItems: QuickAccessItem[] = [
  {
    id: 'visa-readiness',
    title: 'Visa Readiness',
    subtitle: 'Check your progress',
    icon: ShieldCheck,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    iconBorder: 'border-emerald-100',
    href: '/traveller/dashboard?tab=readiness',
  },
  {
    id: 'find-consultants',
    title: 'Find Consultants',
    subtitle: 'Connect with experts',
    icon: Users,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    iconBorder: 'border-blue-100',
    href: '/find-experts',
  },
  {
    id: 'visa-info',
    title: 'Visa Information',
    subtitle: 'By country',
    icon: Award,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    iconBorder: 'border-purple-100',
    href: '/visa',
  },
  {
    id: 'doc-checklist',
    title: 'Document Checklist',
    subtitle: 'Know what you need',
    icon: ClipboardList,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    iconBorder: 'border-amber-100',
    href: '/traveller/dashboard?tab=vault',
  },
  {
    id: 'app-tracking',
    title: 'Application Tracking',
    subtitle: 'Track your application',
    icon: Clock,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    iconBorder: 'border-rose-100',
    href: '#my-applications',
  },
  {
    id: 'travel-planner',
    title: 'Travel Planner',
    subtitle: 'Plan your trip',
    icon: Compass,
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    iconBorder: 'border-cyan-100',
    href: '/traveller/dashboard?tab=luggage',
  },
];

export interface QuickAccessGridProps {
  items?: QuickAccessItem[];
  onItemClick?: (item: QuickAccessItem) => void;
  onViewAll?: () => void;
}

export const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({
  items = defaultQuickAccessItems,
  onItemClick,
  onViewAll,
}) => {
  return (
    <section className="space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Quick Access
        </h3>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="md:hidden text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            View All
          </button>
        )}
      </div>

      {/* Grid Container (6 cards on desktop, 3x2 on tablet, 2x3 on mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {items.map((item) => {
          const IconComp = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                if (onItemClick) {
                  e.preventDefault();
                  onItemClick(item);
                }
              }}
              className="group bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 text-center flex flex-col items-center justify-center space-y-2.5 shadow-2xs hover:shadow-md hover:border-slate-200 transition-all cursor-pointer"
            >
              {/* Icon Container */}
              <div
                className={`w-12 h-12 rounded-2xl ${item.iconBg} ${item.iconColor} border ${item.iconBorder} flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs`}
              >
                <IconComp className="w-6 h-6 stroke-[2.2]" />
              </div>

              {/* Text Info */}
              <div className="space-y-0.5 w-full">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#00a896] transition-colors truncate">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 truncate">
                  {item.subtitle}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
export default QuickAccessGrid;
