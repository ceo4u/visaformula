import React, { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function RegisterStart() {
  const [isVerified, setIsVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'seeker' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const captchaRef = useRef<HCaptcha>(null);

  // 1. CAPTCHA Solved Handler -> Enables Form
  const handleVerification = (token: string) => {
    setCaptchaToken(token);
    setIsVerified(true);
    setErrorMessage('');
  };

  // 2. CAPTCHA Expired Handler -> Disables Form
  const handleExpire = () => {
    setCaptchaToken(null);
    setIsVerified(false);
    setErrorMessage('CAPTCHA expired. Please verify again.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setErrorMessage('Please complete the CAPTCHA first.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        captchaRef.current?.resetCaptcha();
        setIsVerified(false);
        setCaptchaToken(null);
        setErrorMessage(data.error || 'Registration failed.');
        setIsSubmitting(false);
        return;
      }

      // Save user session in localStorage for frontend continuity
      if (typeof window !== "undefined" && data.user) {
        localStorage.setItem("visaformula_user", JSON.stringify(data.user));
      }

      window.location.href = data.redirectUrl || (formData.role === 'expert' ? '/consultant/dashboard' : '/onboarding');
    } catch (err) {
      setErrorMessage('Server connection error. Please try again.');
      setIsSubmitting(false);
    }
  };

  const siteKey = (import.meta.env.PUBLIC_HCAPTCHA_SITE_KEY as string) || "10000000-ffff-ffff-ffff-000000000001";

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border border-slate-200 font-sora">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Create Account</h2>
      <p className="text-xs text-slate-500 text-center mb-6">Complete initial security check to unlock registration inputs</p>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center animate-premium-fade">
          {errorMessage}
        </div>
      )}

      {/* STEP 1: CAPTCHA VERIFICATION AT THE START */}
      <div className="mb-6 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-xs text-slate-700 mb-3 font-bold text-center">Verify you are human to start registration:</p>
        <HCaptcha
          ref={captchaRef}
          sitekey={siteKey}
          onVerify={handleVerification}
          onExpire={handleExpire}
        />
        {!isVerified && (
          <span className="text-[11px] text-amber-700 bg-amber-50 px-3 py-1 rounded-full font-semibold mt-3 border border-amber-200">
            🔒 Form locked until CAPTCHA is solved
          </span>
        )}
      </div>

      {/* STEP 2: REGISTRATION FORM (DISABLED UNTIL VERIFIED) */}
      <form onSubmit={handleSubmit} className={`flex flex-col gap-4 transition-all duration-300 ${!isVerified ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Account Type</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2.5 text-xs font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00a896] outline-none"
            disabled={!isVerified}
          >
            <option value="seeker">Visa Applicant (Seeker)</option>
            <option value="expert">Migration Consultant / Expert</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={!isVerified}
            className="w-full px-4 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00a896] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={!isVerified}
            className="w-full px-4 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00a896] outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!isVerified || isSubmitting}
          className="w-full py-3 mt-2 bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-bold rounded-xl shadow-md transition disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
        >
          {isSubmitting ? 'Verifying & Creating Account...' : 'Complete Registration'}
        </button>
      </form>
    </div>
  );
}
