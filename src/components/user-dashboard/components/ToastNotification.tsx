import React from "react";
import { CheckCircle2 } from "lucide-react";

export function ToastNotification({
  message
}: {
  message: string | null;
}) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200 pointer-events-none">
      <div className="bg-slate-950 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-xs font-bold">{message}</span>
      </div>
    </div>
  );
}
