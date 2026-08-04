import React from 'react';
import { HeroSection } from './hero-section';
import { HowItWorks } from './how-it-works';
import { ExpertCategories } from './expert-categories';
import { StatsSection } from './stats-section';
import { PopularDestinations } from './popular-destinations';
import { Testimonials } from './testimonials';
import { TrustedBy } from './trusted-by';
import { CTASection } from './cta-section';

export default function LandingPage() {
  return (
    <div className="w-full bg-white text-black font-sans antialiased selection:bg-[#359FC2]/20 selection:text-[#359FC2]">
      <HeroSection />
      <HowItWorks />
      <ExpertCategories />
      <StatsSection />
      <PopularDestinations />
      <Testimonials />
      <TrustedBy />
      <CTASection />
    </div>
  );
}
