import React, { useState } from 'react';

export default function RegisterStart() {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'seeker' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Registration failed.');
        setIsSubmitting(false);
        return;
      }

      // Save user session in localStorage for frontend continuity
      if (typeof window !== "undefined") {
        if (data.user) {
          localStorage.setItem("travltik_user", JSON.stringify(data.user));
        }
        if (formData.role === "expert") {
          localStorage.setItem("expert_isLoggedIn", "true");
          localStorage.setItem("expert_email", formData.email);
        } else {
          localStorage.setItem("seeker_email", formData.email);
        }
      }

      window.location.href = data.redirectUrl || (formData.role === 'expert' ? '/signup/expert' : '/onboarding');
    } catch (err) {
      setErrorMessage('Server connection error. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border border-slate-200 font-sans">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Create Account</h2>
      <p className="text-xs text-slate-500 text-center mb-6">Enter your details to get started with TravlTik</p>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center animate-premium-fade">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Account Type</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2.5 text-xs font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none cursor-pointer"
          >
            <option value="seeker">Traveller</option>
            <option value="expert">Service Provider</option>
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
            className="w-full px-4 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
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
            className="w-full px-4 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition disabled:bg-gray-300 cursor-pointer flex items-center justify-center gap-2 active:scale-98"
        >
          {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
        </button>
      </form>
    </div>
  );
}
