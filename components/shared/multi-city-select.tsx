"use client";
import { useState } from "react";
import { X, MapPin } from "lucide-react";

const popularCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad", "New York", "London", "Toronto", "Sydney"];

export function MultiCitySelect({ selected, onChange }: { selected: string[]; onChange: (cities: string[]) => void }) {
    const [input, setInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filtered = popularCities.filter(c => c.toLowerCase().includes(input.toLowerCase()) && !selected.includes(c));

    const addCity = (city: string) => {
        onChange([...selected, city]);
        setInput("");
        setShowSuggestions(false);
    };

    const removeCity = (city: string) => {
        onChange(selected.filter(c => c !== city));
    };

    return (
        <div className="relative">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Cities (select multiple)</label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-sky-50/50 border border-sky-100 rounded-xl min-h-[48px] items-center">
                {selected.map(city => (
                    <span key={city} className="inline-flex items-center gap-1 bg-[#0ea5e9] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        <MapPin className="w-3 h-3" />{city}
                        <button onClick={() => removeCity(city)} className="hover:bg-white/20 rounded-full p-0.5"><X className="w-3 h-3" /></button>
                    </span>
                ))}
                <input
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder={selected.length ? "Add more..." : "Type a city..."}
                    className="flex-1 min-w-[120px] bg-transparent outline-none text-sm py-1 px-2"
                />
            </div>
            {showSuggestions && filtered.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-sky-100 rounded-xl shadow-lg z-50 max-h-48 overflow-auto">
                    {filtered.map(city => (
                        <button key={city} onClick={() => addCity(city)} className="w-full text-left px-4 py-2.5 text-sm hover:bg-sky-50 transition-colors flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />{city}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
