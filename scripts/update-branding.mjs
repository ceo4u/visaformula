// scripts/update-branding.mjs
import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/pages/about.astro',
  'src/pages/agents.astro',
  'src/pages/emergency.astro',
  'src/pages/forgot-password.astro',
  'src/pages/list-practice.astro',
  'src/pages/login.astro',
  'src/pages/privacy.astro',
  'src/pages/register.astro',
  'src/pages/reset-password.astro',
  'src/pages/services.astro',
  'src/pages/signup/expert.astro',
  'src/pages/signup/index.astro',
  'src/pages/signup/seeker.astro',
  'src/pages/success-stories.astro',
  'src/pages/support.astro',
  'src/pages/terms.astro',
  'src/pages/tours.astro',
  'src/pages/training.astro',
  'src/pages/vfs-booking.astro',
  'src/pages/consultant/dashboard.astro',
  'src/pages/ads/[id].astro',
  'src/pages/classifieds/[id].astro',
  'src/pages/visa-guide/[country]/[type].astro',
  'src/components/interactive/AIAssistantPortal.tsx',
  'src/components/interactive/AgentsPortal.tsx',
  'src/components/interactive/ApplyVisaPortal.tsx',
  'src/components/interactive/AuthModalPortal.tsx',
  'src/components/interactive/ConsultantDashboard.tsx',
  'src/components/interactive/EscrowPortal.tsx',
  'src/components/interactive/ExhibitionsPortal.tsx',
  'src/components/interactive/ExpertSignupPortal.tsx',
  'src/components/interactive/FindExpertsPortal.tsx',
  'src/components/interactive/ForgotPasswordPortal.tsx',
  'src/components/interactive/LoginPortal.tsx',
  'src/components/interactive/MagicSearch.tsx',
  'src/components/interactive/PaymentPortal.tsx',
  'src/components/interactive/ResetPasswordPortal.tsx',
  'src/components/interactive/SignupFlowPortal.tsx',
  'src/components/interactive/SupportPortal.tsx',
  'src/components/interactive/ToursPortal.tsx',
  'src/components/interactive/UniversityFairsPortal.tsx',
  'src/components/interactive/UserDashboard.tsx',
  'src/components/interactive/VFSBookingPortal.tsx',
  'src/components/interactive/VisaDocumentationPortal.tsx',
  'src/components/landing/LandingPage.tsx',
  'src/components/landing/MobileNativeAppUI.tsx',
  'src/components/landing/how-it-works.tsx',
  'src/components/landing/testimonials.tsx',
  'src/components/readiness/VisaReadinessEngine.tsx',
  'src/components/shared/talk-to-us.tsx',
  'src/components/layout/Header.astro',
  'src/emails/PasswordResetEmail.ts',
  'src/emails/VerificationEmail.ts',
  'src/pages/api/experts.ts',
  'src/pages/api/readiness.ts',
  'src/pages/api/support/ticket.ts',
  'src/utils/trackAdClick.ts',
  'components/layout/footer.tsx',
  'components/layout/header.tsx',
  'components/shared/talk-to-us.tsx'
];

let updatedCount = 0;

for (const relPath of filesToUpdate) {
  const fullPath = path.resolve(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf8');
  let original = content;

  // Replace branding variants
  content = content.replace(/VisaFormula Hub/g, 'TravlTik');
  content = content.replace(/VisaFormula/g, 'TravlTik');
  content = content.replace(/visaformula\.com/g, 'travltik.com');
  content = content.replace(/1800-VISAFORMULA/g, '1800-TRAVLTIK');
  content = content.replace(/VISAFORMULA/g, 'TRAVLTIK');

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    updatedCount++;
    console.log(`Updated branding in: ${relPath}`);
  }
}

console.log(`\nSuccessfully updated branding to TravlTik in ${updatedCount} files!`);
