import React from "react";
import { Settings, Save, Upload, KeyRound, X } from "lucide-react";

interface ProfileSettingsProps {
    modalFirstName: string;
    setModalFirstName: (v: string) => void;
    modalLastName: string;
    setModalLastName: (v: string) => void;
    modalPhone: string;
    setModalPhone: (v: string) => void;
    modalPhoto: string;
    setModalPhoto: (v: string) => void;
    modalPassportCountry: string;
    setModalPassportCountry: (v: string) => void;
    modalResidentOf: string;
    setModalResidentOf: (v: string) => void;
    modalDestinations: string;
    setModalDestinations: (v: string) => void;
    handleSaveProfileModal: (e?: React.FormEvent) => Promise<void> | void;
    userDisplayName: string;
    email: string;
    showProfileModal: boolean;
    setShowProfileModal: (v: boolean) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
    modalFirstName,
    setModalFirstName,
    modalLastName,
    setModalLastName,
    modalPhone,
    setModalPhone,
    modalPhoto,
    setModalPhoto,
    modalPassportCountry,
    setModalPassportCountry,
    modalResidentOf,
    setModalResidentOf,
    modalDestinations,
    setModalDestinations,
    handleSaveProfileModal,
    userDisplayName,
    email,
    showProfileModal,
    setShowProfileModal
}) => {
    return (
        <div className="space-y-6 animate-fade-up">
            {/* Card 1: Profile & Personal Details Form */}
            <form onSubmit={handleSaveProfileModal} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-[#00a896]" /> Personal &amp; Visa Profile Settings
                        </h2>
                        <p className="text-xs font-medium text-slate-500 mt-1">
                            Manage your personal information, citizenship details, and travel preferences
                        </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <button 
                            type="submit" 
                            className="bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                        >
                            <Save className="w-3.5 h-3.5" /> Save Details
                        </button>
                    </div>
                </div>

                {/* Profile Photo Upload */}
                <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative shrink-0">
                        {modalPhoto && !modalPhoto.includes("unsplash.com") ? (
                            <img src={modalPhoto} alt="Profile" className="w-20 h-20 rounded-2xl object-cover border-2 border-[#00a896]/30 shadow-sm" />
                        ) : (
                            <div className="w-20 h-20 rounded-2xl bg-[#00a896] text-white text-2xl font-black flex items-center justify-center border-2 border-[#00a896]/20 shadow-sm">
                                {(modalFirstName || userDisplayName || "U").charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 space-y-1.5 text-center sm:text-left">
                        <label className="text-xs font-bold text-slate-900 block">Profile Photo</label>
                        <p className="text-[11px] text-slate-500 font-medium">Upload a clear passport-style photo or portrait (JPG, PNG, or WebP). Square format recommended.</p>
                        <div className="pt-1 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                            <input 
                                type="file" 
                                id="settings-photo-input" 
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            if (typeof reader.result === "string") {
                                                setModalPhoto(reader.result);
                                            }
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="hidden" 
                            />
                            <label 
                                htmlFor="settings-photo-input" 
                                className="px-3.5 py-1.5 bg-white border border-slate-300 hover:border-[#00a896] text-slate-700 hover:text-[#00a896] text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                            >
                                <Upload className="w-3.5 h-3.5" /> Choose Photo
                            </label>
                            {modalPhoto && (
                                <button 
                                    type="button" 
                                    onClick={() => setModalPhoto("")} 
                                    className="px-3 py-1.5 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-transparent"
                                >
                                    Remove Photo
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Personal Info Grid */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-400 tracking-wider uppercase">Identity &amp; Contact</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">First Name</label>
                            <input 
                                type="text" 
                                value={modalFirstName} 
                                onChange={(e) => setModalFirstName(e.target.value)} 
                                placeholder="e.g. Zynara"
                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#00a896] transition-all" 
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Last Name</label>
                            <input 
                                type="text" 
                                value={modalLastName} 
                                onChange={(e) => setModalLastName(e.target.value)} 
                                placeholder="e.g. Shop"
                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#00a896] transition-all" 
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Phone Number</label>
                            <input 
                                type="text" 
                                value={modalPhone} 
                                onChange={(e) => setModalPhone(e.target.value)} 
                                placeholder="e.g. +91 98765 43210"
                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#00a896] transition-all" 
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Account Email</label>
                            <div className="w-full px-3.5 py-2.5 bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 flex items-center justify-between">
                                <span className="truncate">{email || (typeof window !== "undefined" ? localStorage.getItem("seeker_email") : "") || "Not set"}</span>
                                <span className="text-[10px] font-bold bg-teal-50 text-[#00a896] px-2 py-0.5 rounded-full border border-teal-200/80 shrink-0">Verified</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Immigration & Preference Grid */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                    <h3 className="text-xs font-black text-slate-400 tracking-wider uppercase">Immigration &amp; Residence Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Passport Citizenship</label>
                            <input 
                                type="text" 
                                value={modalPassportCountry} 
                                onChange={(e) => setModalPassportCountry(e.target.value)} 
                                placeholder="e.g. India"
                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#00a896] transition-all" 
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Current Country of Residence</label>
                            <input 
                                type="text" 
                                value={modalResidentOf} 
                                onChange={(e) => setModalResidentOf(e.target.value)} 
                                placeholder="e.g. United Arab Emirates"
                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#00a896] transition-all" 
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Target Destinations</label>
                            <input 
                                type="text" 
                                value={modalDestinations} 
                                onChange={(e) => setModalDestinations(e.target.value)} 
                                placeholder="e.g. Canada, United Kingdom, USA, Greece"
                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-[#00a896] transition-all" 
                            />
                            <p className="text-[11px] text-slate-400 mt-1 font-medium">Separate country names with commas. Used by AI to tailor your document checklists and immigration alerts.</p>
                        </div>
                    </div>
                </div>

                {/* Form Footer Submit Button */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button 
                        type="submit" 
                        className="bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                    >
                        <Save className="w-4 h-4" /> Save Details
                    </button>
                </div>
            </form>

            {/* Card 2: Account Password & Security */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#00a896]/10 text-[#00a896] border border-[#00a896]/20 flex items-center justify-center font-bold shrink-0">
                        <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">Account Password &amp; Security</h4>
                        <p className="text-slate-500 text-xs font-medium mt-0.5">Need to reset your password or update credentials?</p>
                    </div>
                </div>
                <a
                    href={`/forgot-password?email=${encodeURIComponent(email || (typeof window !== "undefined" ? localStorage.getItem("seeker_email") : "") || '')}`}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl font-bold text-xs transition-all text-center shrink-0 border border-slate-200/80 flex items-center gap-1.5"
                >
                    <KeyRound className="w-3.5 h-3.5 text-[#00a896]" /> Forgot / Change Password →
                </a>
            </div>

            {/* Edit Profile Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowProfileModal(false)} />
                    <div className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 sm:p-8 space-y-5 animate-fade-up max-h-[90vh] overflow-y-auto no-scrollbar">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                                <Settings className="w-4 h-4 text-[#00a896]" /> Edit Traveller Profile Details
                            </h3>
                            <button onClick={() => setShowProfileModal(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSaveProfileModal} className="space-y-4 text-xs">
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1.5 block">Profile Photo</label>
                                <div className="flex items-center gap-3">
                                    {modalPhoto && !modalPhoto.includes("unsplash.com") ? (
                                        <img src={modalPhoto} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-[#00a896]/30 shrink-0" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-[#00a896] text-white text-lg font-black flex items-center justify-center border border-[#00a896]/30 shrink-0 shadow-2xs">
                                            {(modalFirstName || userDisplayName || "U").charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    if (typeof reader.result === "string") {
                                                        setModalPhoto(reader.result);
                                                    }
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-[#00a896] cursor-pointer" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">First Name</label>
                                    <input 
                                        type="text" 
                                        value={modalFirstName} 
                                        onChange={(e) => setModalFirstName(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Last Name</label>
                                    <input 
                                        type="text" 
                                        value={modalLastName} 
                                        onChange={(e) => setModalLastName(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Phone Number</label>
                                    <input 
                                        type="text" 
                                        value={modalPhone} 
                                        onChange={(e) => setModalPhone(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Current Residence</label>
                                    <input 
                                        type="text" 
                                        value={modalResidentOf} 
                                        onChange={(e) => setModalResidentOf(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Passport Citizenship</label>
                                    <input 
                                        type="text" 
                                        value={modalPassportCountry} 
                                        onChange={(e) => setModalPassportCountry(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Target Destinations</label>
                                    <input 
                                        type="text" 
                                        value={modalDestinations} 
                                        onChange={(e) => setModalDestinations(e.target.value)} 
                                        placeholder="Canada, UK, USA"
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-3">
                                <button type="button" onClick={() => setShowProfileModal(false)} className="flex-1 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-[#00a896] hover:bg-[#009282] active:bg-[#007f71] text-white rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer">Save Details</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ProfileSettings;
