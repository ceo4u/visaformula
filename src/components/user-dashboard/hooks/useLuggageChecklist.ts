import { useState, useMemo } from "react";
import { normalizeCountryName } from "../utils/countryHelpers";
import { getDefaultLuggageItems } from "../utils/constants";
import type { LuggageItem } from "../types";

export function useLuggageChecklist({
  selectedDestination = "United States",
  selectedPassport = "India",
  selectedPurpose = "Tourism / Vacation",
  showToastMsg
}: {
  selectedDestination?: string;
  selectedPassport?: string;
  selectedPurpose?: string;
  showToastMsg?: (msg: string) => void;
}) {
  const [luggageChecklist, setLuggageChecklist] = useState<Record<string, boolean>>({});
  const [customLuggageItems, setCustomLuggageItems] = useState<LuggageItem[]>([]);
  const [isFetchingPreDepartureAi, setIsFetchingPreDepartureAi] = useState(false);
  const [aiPreDepartureData, setAiPreDepartureData] = useState<any>(null);
  const [newLuggageItemText, setNewLuggageItemText] = useState("");
  const [newLuggageCategory, setNewLuggageCategory] = useState<'cabin' | 'checked' | 'predeparture'>('cabin');
  const [luggageActiveSection, setLuggageActiveSection] = useState<'all' | 'cabin' | 'checked' | 'predeparture'>('all');

  const fetchPreDepartureAi = async (dest?: string) => {
    const targetDest = normalizeCountryName(dest || selectedDestination);
    setIsFetchingPreDepartureAi(true);
    try {
      const res = await fetch('/api/trip-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: targetDest,
          passport_country: selectedPassport || 'India',
          purpose: selectedPurpose || 'tourism',
          departureDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
        })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setAiPreDepartureData(json.data);
          try {
            localStorage.setItem(`ai_predeparture_${targetDest.toLowerCase().replace(/[^a-z0-9]/g, '_')}`, JSON.stringify(json.data));
          } catch(e) {}
          if (showToastMsg) showToastMsg(`Live pre-departure AI directives updated for ${targetDest}!`);
        }
      }
    } catch(err) {
      console.error('Error fetching pre-departure AI details:', err);
    } finally {
      setIsFetchingPreDepartureAi(false);
    }
  };

  const toggleLuggageItem = (itemId: string) => {
    const targetDest = normalizeCountryName(selectedDestination);
    const storageKey = `luggage_checklist_${targetDest}`.replace(/\s+/g, '_').toLowerCase();
    setLuggageChecklist(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch(e) {}
      return next;
    });
  };

  const handleAddCustomLuggageItem = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newLuggageItemText.trim()) return;
    const targetDest = normalizeCountryName(selectedDestination);
    const customKey = `custom_luggage_${targetDest}`.replace(/\s+/g, '_').toLowerCase();
    const newItem: LuggageItem = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      category: newLuggageCategory,
      title: newLuggageItemText.trim()
    };
    const updated = [...customLuggageItems, newItem];
    setCustomLuggageItems(updated);
    try {
      localStorage.setItem(customKey, JSON.stringify(updated));
    } catch(e) {}
    setNewLuggageItemText("");
    if (showToastMsg) showToastMsg(`Added "${newItem.title}" to luggage checklist!`);
  };

  const handleDeleteCustomLuggageItem = (itemId: string) => {
    const targetDest = normalizeCountryName(selectedDestination);
    const customKey = `custom_luggage_${targetDest}`.replace(/\s+/g, '_').toLowerCase();
    const updated = customLuggageItems.filter(i => i.id !== itemId);
    setCustomLuggageItems(updated);
    try {
      localStorage.setItem(customKey, JSON.stringify(updated));
    } catch(e) {}
  };

  const defaultLuggageItems = useMemo(() => {
    const dest = normalizeCountryName(selectedDestination);
    return getDefaultLuggageItems(dest);
  }, [selectedDestination]);

  const luggageProgress = useMemo(() => {
    const allItems = [
      ...defaultLuggageItems.cabin,
      ...defaultLuggageItems.checked,
      ...defaultLuggageItems.predeparture,
      ...customLuggageItems
    ];
    const total = allItems.length;
    const packed = allItems.filter(item => luggageChecklist[item.id]).length;
    const percent = total > 0 ? Math.round((packed / total) * 100) : 0;
    return { packed, total, percent };
  }, [defaultLuggageItems, customLuggageItems, luggageChecklist]);

  return {
    luggageChecklist,
    setLuggageChecklist,
    customLuggageItems,
    setCustomLuggageItems,
    isFetchingPreDepartureAi,
    setIsFetchingPreDepartureAi,
    aiPreDepartureData,
    setAiPreDepartureData,
    newLuggageItemText,
    setNewLuggageItemText,
    newLuggageCategory,
    setNewLuggageCategory,
    luggageActiveSection,
    setLuggageActiveSection,
    fetchPreDepartureAi,
    toggleLuggageItem,
    handleAddCustomLuggageItem,
    handleDeleteCustomLuggageItem,
    defaultLuggageItems,
    luggageProgress
  };
}
