'use client'

import { Lock, Shield, CheckCircle } from 'lucide-react'

export function CTASection() {
  return (
    <section
      className="w-full py-10 px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3a6e 0%, #1d4ed8 60%, #2563eb 100%)' }}
    >
      {/* World map watermark */}
      <div
        className="absolute inset-0 opacity-10 bg-center bg-no-repeat bg-contain pointer-events-none"
        style={{ backgroundImage: "url('/world-map.png')", backgroundSize: '55% auto', backgroundPosition: 'left center' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Stack vertically on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
          {/* Left: text + buttons */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">
              Ready to take the next step?
            </h2>
            <p className="text-blue-200 text-sm mb-6">
              Connect with a verified immigration expert today.
            </p>
            {/* Buttons — full-width stacked on mobile, inline on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button 
                onClick={() => document.getElementById('search-panel')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-5 py-2.5 bg-white text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
              >
                Find an Expert
              </button>
              <button 
                onClick={() => alert('Eligibility Check questionnaire is loading...')}
                className="w-full sm:w-auto px-5 py-2.5 border border-white text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Check Eligibility
              </button>
            </div>
          </div>

          {/* Right: trust badges — wrap on mobile */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 sm:flex-shrink-0">
            {[
              { Icon: Lock, label: 'Secure &\nEncrypted' },
              { Icon: Shield, label: 'Privacy\nProtected' },
              { Icon: CheckCircle, label: '100% Confidential\nConsultations' },
            ].map(({ Icon, label }, i) => (
              <div key={i} className="flex flex-col items-center gap-2 border border-white/30 rounded-xl px-4 sm:px-5 py-3 text-center flex-1 min-w-[90px]">
                <Icon size={20} className="text-white" />
                <span className="text-white text-xs font-medium leading-snug whitespace-pre-line">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
