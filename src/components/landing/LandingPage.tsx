import React from 'react';
import { DesktopHomeSection } from './DesktopHomeSection';
import { MobileHomeSection } from './MobileHomeSection';

export default function LandingPage() {
  return (
    <div className="w-full bg-[#f3f4f6] text-black font-sans antialiased selection:bg-[#2563eb]/20 selection:text-[#2563eb]">
      {/* Desktop: shown on lg+ screens */}
      <div className="hidden lg:block">
        <DesktopHomeSection />
      </div>
      {/* Mobile: shown on screens smaller than lg (phones + small tablets) */}
      <MobileHomeSection />
    </div>
  );
}
