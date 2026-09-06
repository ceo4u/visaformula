/**
 * UpcomingAppointment.tsx
 * Card displaying upcoming consultation or visa expert verification appointment.
 * Matches the reference design (Desktop & Mobile).
 */
import React from 'react';
import { Calendar } from 'lucide-react';

export interface UpcomingAppointmentProps {
  hasAppointment?: boolean;
  title?: string;
  expertName?: string;
  dateTime?: string;
  onViewAppointment?: () => void;
}

export const UpcomingAppointment: React.FC<UpcomingAppointmentProps> = ({
  hasAppointment = false,
  title = "No Upcoming Appointments",
  dateTime,
  onViewAppointment,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-7 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between h-full text-center">
      <div>
        <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-5 text-left">
          Upcoming Appointment
        </h3>

        <div className="flex flex-col items-center text-center space-y-3 py-2">
          {/* Soft Purple/Emerald Calendar Icon Container */}
          <div className={`w-14 h-14 rounded-2xl ${hasAppointment ? 'bg-purple-50 text-purple-600 border border-purple-100/80' : 'bg-slate-50 text-slate-400 border border-slate-200/80'} flex items-center justify-center shadow-2xs`}>
            <Calendar className="w-7 h-7 stroke-[2.2]" />
          </div>

          <div className="space-y-1 max-w-xs">
            <h4 className="text-sm font-bold text-slate-800 leading-snug">
              {hasAppointment ? title : "No Consultations Scheduled"}
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              {hasAppointment ? (dateTime || 'Scheduled') : "Book a 1-on-1 session with a certified visa expert for profile guidance."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onViewAppointment}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs text-center transition-all cursor-pointer shadow-2xs ${
            hasAppointment
              ? 'border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              : 'bg-[#00a896] hover:bg-[#009282] text-white border border-[#00a896]'
          }`}
        >
          {hasAppointment ? 'View Appointment' : 'Book 1-on-1 Session'}
        </button>
      </div>
    </div>
  );
};
export default UpcomingAppointment;
