import React from "react";
import { KeyRound, ShieldCheck, X, AlertCircle, Eye, EyeOff } from "lucide-react";

export function ChangeVaultPasswordModal({
  show,
  onClose,
  onSubmit,
  vaultOldPasswordInput,
  setVaultOldPasswordInput,
  showVaultOldPassword,
  setShowVaultOldPassword,
  vaultPasswordInput,
  setVaultPasswordInput,
  showVaultPassword,
  setShowVaultPassword,
  vaultPasswordConfirm,
  setVaultPasswordConfirm,
  vaultError,
  isVaultSubmitting
}: {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  vaultOldPasswordInput: string;
  setVaultOldPasswordInput: (val: string) => void;
  showVaultOldPassword: boolean;
  setShowVaultOldPassword: (val: boolean) => void;
  vaultPasswordInput: string;
  setVaultPasswordInput: (val: string) => void;
  showVaultPassword: boolean;
  setShowVaultPassword: (val: boolean) => void;
  vaultPasswordConfirm: string;
  setVaultPasswordConfirm: (val: string) => void;
  vaultError: string | null;
  isVaultSubmitting: boolean;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center shadow-xs">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-950">Change Vault Password</h3>
              <p className="text-xs text-slate-500 font-medium">Update your secret document password</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 pt-4">
          {vaultError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{vaultError}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Current Secret Password</label>
            <div className="relative">
              <input
                type={showVaultOldPassword ? "text" : "password"}
                value={vaultOldPasswordInput}
                onChange={(e) => setVaultOldPasswordInput(e.target.value)}
                placeholder="Enter current password"
                className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowVaultOldPassword(!showVaultOldPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showVaultOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">New Secret Password</label>
            <div className="relative">
              <input
                type={showVaultPassword ? "text" : "password"}
                value={vaultPasswordInput}
                onChange={(e) => setVaultPasswordInput(e.target.value)}
                placeholder="Enter new password (min 4 chars)"
                className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowVaultPassword(!showVaultPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showVaultPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Confirm New Password</label>
            <input
              type={showVaultPassword ? "text" : "password"}
              value={vaultPasswordConfirm}
              onChange={(e) => setVaultPasswordConfirm(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVaultSubmitting}
              className="flex-1 py-2.5 bg-slate-950 hover:bg-black text-white rounded-xl font-black text-xs shadow-md cursor-pointer disabled:opacity-50"
            >
              {isVaultSubmitting ? "Updating..." : "Save New Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ResetVaultPasswordModal({
  show,
  onClose,
  onSubmit,
  vaultAccountPasswordInput,
  setVaultAccountPasswordInput,
  vaultPasswordInput,
  setVaultPasswordInput,
  showVaultPassword,
  setShowVaultPassword,
  vaultPasswordConfirm,
  setVaultPasswordConfirm,
  vaultError,
  isVaultSubmitting
}: {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  vaultAccountPasswordInput: string;
  setVaultAccountPasswordInput: (val: string) => void;
  vaultPasswordInput: string;
  setVaultPasswordInput: (val: string) => void;
  showVaultPassword: boolean;
  setShowVaultPassword: (val: boolean) => void;
  vaultPasswordConfirm: string;
  setVaultPasswordConfirm: (val: string) => void;
  vaultError: string | null;
  isVaultSubmitting: boolean;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-950">Reset Vault Password</h3>
              <p className="text-xs text-slate-500 font-medium">Verify account to restore vault access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 pt-4">
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
            Enter your TravlTik login account password to securely verify your identity and reset your secret Document Vault password.
          </p>

          {vaultError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{vaultError}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Your Account Login Password</label>
            <input
              type="password"
              value={vaultAccountPasswordInput}
              onChange={(e) => setVaultAccountPasswordInput(e.target.value)}
              placeholder="Enter your main account login password"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">New Secret Vault Password</label>
            <div className="relative">
              <input
                type={showVaultPassword ? "text" : "password"}
                value={vaultPasswordInput}
                onChange={(e) => setVaultPasswordInput(e.target.value)}
                placeholder="Enter new secret password (min 4 chars)"
                className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowVaultPassword(!showVaultPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showVaultPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Confirm New Vault Password</label>
            <input
              type={showVaultPassword ? "text" : "password"}
              value={vaultPasswordConfirm}
              onChange={(e) => setVaultPasswordConfirm(e.target.value)}
              placeholder="Re-enter new secret password"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVaultSubmitting}
              className="flex-1 py-2.5 bg-slate-950 hover:bg-black text-white rounded-xl font-black text-xs shadow-md cursor-pointer disabled:opacity-50"
            >
              {isVaultSubmitting ? "Verifying..." : "Verify & Reset Vault"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
