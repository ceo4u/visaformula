import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

export function ReadinessSelect({
  value,
  onChange,
  options,
  label,
  placeholder = "Select an option"
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  label?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasValue = value && value.trim() !== "";

  return (
    <div className="relative space-y-1.5" ref={ref}>
      {label && <label className="block text-xs font-bold text-slate-800 tracking-tight">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-10 px-3.5 rounded-xl border bg-white text-xs font-semibold flex items-center justify-between transition-all cursor-pointer shadow-2xs hover:shadow-xs ${
          open ? "border-indigo-600 ring-2 ring-indigo-500/20" : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <span className={`truncate text-left ${hasValue ? "text-slate-900 font-bold" : "text-slate-400 font-normal"}`}>
          {hasValue ? value : placeholder}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-indigo-600" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden py-1 max-h-56 overflow-y-auto">
          {options.map((opt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                value === opt ? "bg-indigo-50 text-indigo-900 font-bold" : "text-slate-700 hover:bg-slate-50 font-medium"
              }`}
            >
              <span className="truncate">{opt}</span>
              {value === opt && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
