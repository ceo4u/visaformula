import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

export interface ModernDropdownOption {
  value: string;
  label: string;
  flag?: string;
  emoji?: string;
  defaultVisa?: string;
}

export function ModernDashboardSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  allowCustom = false,
  customPlaceholder = "Enter other country name..."
}: {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  options: ModernDropdownOption[];
  placeholder?: string;
  allowCustom?: boolean;
  customPlaceholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customInput, setCustomInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(
    o => o.value.toLowerCase() === (value || "").toLowerCase()
  );

  const displayTitle = selectedOption
    ? `${selectedOption.flag || selectedOption.emoji ? (selectedOption.flag || selectedOption.emoji) + " " : ""}${selectedOption.label}`
    : value || placeholder;

  const filteredOptions = options.filter(o =>
    o.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-1.5 relative text-left" ref={dropdownRef}>
      {label && <label className="text-xs font-bold text-slate-700 block">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-11 px-3.5 rounded-xl border bg-slate-50 hover:bg-white text-xs font-bold flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
          isOpen ? 'border-slate-900 ring-2 ring-slate-900/10 bg-white' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className={`truncate text-left ${value ? 'text-slate-900 font-bold' : 'text-slate-400 font-medium'}`}>
          {displayTitle}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-900' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-[9999] animate-in fade-in zoom-in-95 origin-top">
          {/* Search bar */}
          <div className="relative mb-2">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search..."
              autoFocus
              className="w-full h-8 pl-8 pr-3 text-xs font-semibold bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-slate-900 focus:bg-white transition-all"
            />
          </div>

          <div className="max-h-52 overflow-y-auto space-y-0.5 custom-scrollbar">
            {filteredOptions.length === 0 && !allowCustom && (
              <div className="p-3 text-center text-xs text-slate-400 font-medium">No matches found</div>
            )}

            {filteredOptions.map((opt) => {
              const isSelected = (value || "").toLowerCase() === opt.value.toLowerCase();
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00a896] text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {(opt.flag || opt.emoji) && <span className="text-sm shrink-0">{opt.flag || opt.emoji}</span>}
                    <span className="truncate">{opt.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-2 text-white" />}
                </button>
              );
            })}

            {allowCustom && (
              <div className="pt-2 border-t border-slate-100 mt-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                  Other / Custom Country
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={customInput}
                    onChange={e => setCustomInput(e.target.value)}
                    placeholder={customPlaceholder}
                    className="flex-1 h-8 px-2.5 text-xs font-semibold bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-[#00a896]"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && customInput.trim()) {
                        e.preventDefault();
                        onChange(customInput.trim());
                        setIsOpen(false);
                        setCustomInput("");
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customInput.trim()) {
                        onChange(customInput.trim());
                        setIsOpen(false);
                        setCustomInput("");
                      }
                    }}
                    className="h-8 px-3 rounded-lg bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    Select
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
