import { useState } from "react";
import { Phone } from "lucide-react";

const emergencyTypes = [
    { id: "overstay", label: "Visa Overstay", desc: "Currently in-country beyond visa validity" },
    { id: "denial", label: "Visa Denial / Rejection", desc: "Just received a rejection letter" },
    { id: "deportation", label: "Deportation / Removal Order", desc: "Received a removal or deportation notice" },
    { id: "detention", label: "Immigration Detention", desc: "Detained by immigration authorities" },
    { id: "asylum", label: "Asylum / Refugee Claim", desc: "Need urgent asylum or refugee protection" },
    { id: "other", label: "Other Emergency", desc: "Any other urgent immigration situation" },
];

export function CrisisSelector() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="bg-white rounded-3xl border border-yellow-100 shadow-sm p-8">
            <div className="mb-6">
                <span className="text-[10px] font-black text-amber-600 tracking-widest block mb-1">Status Restoration</span>
                <h2 className="font-sora font-bold text-navy text-xl">What is your current immigration situation?</h2>
                <p className="text-xs text-gray-400 mt-1">Select the option below so our emergency coordinators can matching-assign you to the right attorney immediately.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {emergencyTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => { setSelectedType(type.id); setShowForm(true); }}
                        className={`p-4 rounded-2xl border-2 text-left transition-all outline-none ${selectedType === type.id
                                ? "border-amber-400 bg-yellow-50/50"
                                : "border-yellow-100 hover:border-yellow-200 hover:bg-yellow-50/10"
                            }`}
                    >
                        <div className="font-bold text-navy text-sm mb-0.5">{type.label}</div>
                        <div className="text-xs text-gray-400 leading-normal">{type.desc}</div>
                    </button>
                ))}
            </div>

            {showForm && (
                <div className="mt-8 space-y-4 animate-fade-up">
                    <hr className="border-yellow-50" />
                    <h4 className="font-sora font-bold text-navy text-sm">Brief Situation Description & Contact</h4>
                    <textarea
                        placeholder="Describe your case briefly... (e.g. 'My visa expired 1 week ago, I received an inquiry email')"
                        rows={3}
                        className="w-full p-4 bg-slate-50/50 border border-yellow-100 rounded-2xl text-xs outline-none focus:border-amber-400 resize-none font-medium text-gray-700"
                    />
                    <input
                        type="tel"
                        placeholder="Your WhatsApp number (for urgent legal callback within 15 mins)"
                        className="w-full p-4 bg-slate-50/50 border border-yellow-100 rounded-2xl text-xs outline-none focus:border-amber-400 font-medium text-gray-700"
                    />
                    <button className="w-full bg-gradient-to-r from-amber-500 to-rose-600 text-white py-4 rounded-2xl font-bold text-xs tracking-wider hover:shadow-lg transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" /> Connect with Attorney Now
                    </button>
                    <p className="text-[10px] text-gray-400 text-center">Your privacy is legally protected. Case details are encrypted under Client-Attorney privilege guidelines.</p>
                </div>
            )}
        </div>
    );
}

