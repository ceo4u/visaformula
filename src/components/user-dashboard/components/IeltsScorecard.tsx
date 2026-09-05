import React from "react";
import type { IeltsScore } from "../types";

export function IeltsScorecard({
  ieltsScore,
  hasIeltsScore,
  overallBand,
  handleUpdateIelts
}: {
  ieltsScore: IeltsScore;
  hasIeltsScore: boolean;
  overallBand: string;
  handleUpdateIelts: (score: IeltsScore) => void;
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4 text-left">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-950">IELTS Scorecard</h3>
        <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
          Overall: {hasIeltsScore ? overallBand : 'N/A'}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-1">
        {(['L', 'R', 'W', 'S'] as const).map((k, i) => (
          <div key={k} className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100 text-center">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">{['Listening', 'Reading', 'Writing', 'Speaking'][i]}</span>
            <input
              type="number"
              step="0.5"
              min="0"
              max="9"
              value={ieltsScore[k] || 0}
              onChange={e => handleUpdateIelts({ ...ieltsScore, [k]: parseFloat(e.target.value) || 0 })}
              className="w-full text-center text-2xl font-black text-slate-950 bg-transparent outline-none mt-1"
            />
          </div>
        ))}
      </div>
      <a href="/training/ielts" className="w-full bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white py-3.5 rounded-2xl text-xs font-bold text-center block shadow-sm transition-all mt-4">
        Practice IELTS Tests →
      </a>
    </div>
  );
}
