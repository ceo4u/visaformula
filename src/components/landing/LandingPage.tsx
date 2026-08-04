import React from 'react';
import { DesktopHomeSection } from './DesktopHomeSection';
import { MobileNativeAppUI } from './MobileNativeAppUI';

export default function LandingPage() {
  return (
    <div className="w-full bg-white text-black font-sans antialiased selection:bg-[#00a896]/20 selection:text-[#00a896]">
      {/* Dedicated Mobile Native App UI (Visible on screens < md) */}
      <div className="block md:hidden">
        <MobileNativeAppUI />
      </div>

      {/* Dedicated Desktop Home Section (Visible on screens >= md) */}
      <div className="hidden md:block">
        <DesktopHomeSection />
      </div>
    </div>
  );
}
