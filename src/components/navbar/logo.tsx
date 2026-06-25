import React from 'react';

interface LogoProps {
  theme?: 'light' | 'dark';
}

export function Logo({ theme = 'light' }: LogoProps) {
  const isDark = theme === 'dark';

  return (
    <a 
      href="/" 
      className="flex items-center gap-2 lg:gap-3 group shrink-0" 
      aria-label="VisaFormula"
      title="VisaFormula Global Visa Marketplace"
    >
      {/* Black Rounded Square Icon (Always Black) */}
      <div 
        className="w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] lg:w-[48px] lg:h-[48px] bg-black text-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-300 shrink-0"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      </div>

      {/* Wordmark (Text changes based on theme) */}
      <span 
        className={`font-sans font-extrabold tracking-tight transition-colors duration-300 leading-none text-[28px] sm:text-[32px] lg:text-[36px] ${
          isDark ? 'text-white' : 'text-[#0F172A]'
        }`}
      >
        VisaFormula
      </span>

      {/* Indicator Dot (Changes color based on theme) */}
      <span 
        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full animate-pulse shrink-0 ${
          isDark ? 'bg-white/70' : 'bg-[#808080]'
        }`}
      />
    </a>
  );
}
