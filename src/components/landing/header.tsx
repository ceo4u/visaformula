'use client'

import { ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'

// Top row nav items
const supportingBusinessItems = [
  { title: 'Register as a Consultant', href: '/register-provider' },
  { title: 'Consultant Dashboard', href: '/consultant/dashboard' },
  { title: 'Verification Guidelines', href: '/verification-guidelines' },
  { title: 'Escrow Protected Payments', href: '/escrow' },
  { title: 'Anti-Fraud Policy', href: '/anti-fraud-policy' },
  { title: 'Cricket Tours', href: '/cricket-tours' },
]

const ourServicesItems = [
  { title: 'Find Verified Experts', href: '/find-experts' },
  { title: 'Visa Documentation Filing', href: '/visa-documentation' },
  { title: 'Apply Visa Online', href: '/apply-visa' },
  { title: 'Visa Guides', href: '/visa-guide' },
  { title: 'Success Stories', href: '/success-stories' },
  { title: 'Support / Helpdesk', href: '/support' },
]

const immigrationAssistItems = [
  { title: 'Migration Agents & Lawyers', href: '/emergency' },
  { title: 'Migration Visa', href: '/migration-visa' },
]

// Category (bottom row) nav items
const studentVisaItems = [
  { title: 'Find Consultants', href: '/find-experts?category=student' },
  { title: 'Find Universities', href: '/universities' },
  { title: 'Admissions by Country', href: '/admissions' },
  { title: 'Funding Assistance', href: '/funding' },
  { title: 'Language Coaching & Training', href: '/training' },
]

const jobVisaItems = [
  { title: 'Work Permit Consultants', href: '/find-experts?category=work' },
  { title: 'Find Jobs', href: '/jobs' },
  { title: 'Digital Nomad', href: '/digital-nomad' },
]

const visitVisaItems = [
  { title: 'Tourist Visa Consultants', href: '/find-experts?category=tourist' },
  { title: 'Cricket Tours', href: '/cricket-tours' },
  { title: 'Construction Job Tours', href: '/construction-jobs' },
  { title: 'Apply Online', href: '/apply-visa' },
  { title: 'Visa Guides', href: '/visa-guide' },
]

const migrationVisaItems = [
  { title: 'Skilled Migration', href: '/find-experts?category=pr' },
  { title: 'Residency Visa', href: '/find-experts?category=residency' },
  { title: 'Visa Appeal Experts', href: '/find-experts?category=appeal' },
  { title: 'Find Migration Experts', href: '/find-experts?category=migration' },
]

function DropdownMenu({ label, items, align = 'left' }: {
  label: string
  items: { title: string; href: string }[]
  align?: 'left' | 'right'
}) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-[15px] font-semibold text-[#0c1a2e] hover:text-[#359FC2] transition-colors whitespace-nowrap">
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className={`absolute top-full ${align === 'right' ? 'right-0' : 'left-0'} pt-2 z-50`}>
          <div className="bg-white rounded-xl border border-slate-100 shadow-xl p-2 min-w-[220px]">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] font-semibold text-slate-700 hover:text-[#359FC2] hover:bg-slate-50 transition-all"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenMobileSection(prev => prev === section ? null : section)
  }

  const allMobileSections = [
    { label: 'Supporting Businesses', items: supportingBusinessItems },
    { label: 'Immigration Assistance', items: immigrationAssistItems },
    { label: 'Our Services', items: ourServicesItems },
    { label: 'Student Visa', items: studentVisaItems },
    { label: 'Job Visas', items: jobVisaItems },
    { label: 'Visit Visas', items: visitVisaItems },
    { label: 'Migration Visas', items: migrationVisaItems },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Row */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 xl:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="VisaFormula Logo"
              className="h-18 w-auto object-contain"
            />
          </a>

          {/* Desktop Top Nav */}
          <nav className="hidden xl:flex items-center gap-8">
            <a href="/self-apply" className="text-[15px] font-semibold text-[#0c1a2e] hover:text-[#359FC2] transition-colors whitespace-nowrap">
              Self Apply
            </a>
            <DropdownMenu label="Supporting Businesses" items={supportingBusinessItems} />
            <DropdownMenu label="Immigration Assistance" items={immigrationAssistItems} />
            <DropdownMenu label="Our Services" items={ourServicesItems} align="right" />
            <a href="/support" className="text-[15px] font-semibold text-[#0c1a2e] hover:text-[#359FC2] transition-colors whitespace-nowrap">
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href="/login"
              className="text-[14px] font-bold text-[#0c1a2e] border border-gray-200 hover:border-black px-4 py-2.5 rounded-xl transition-all"
            >
              Log In
            </a>
            <a
              href="/signup"
              className="bg-black hover:bg-slate-900 text-white font-bold text-[14px] px-4 py-2.5 rounded-xl transition-all"
            >
              Sign Up
            </a>
          </div>

          {/* Hamburger (mobile/tablet) */}
          <button
            className="xl:hidden p-2 text-[#0c1a2e] hover:text-[#359FC2]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Bottom Category Row (Desktop) */}
      <div className="hidden xl:block border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 xl:px-8 flex items-center justify-center gap-10 h-12">
          <DropdownMenu label="Student Visa" items={studentVisaItems} />
          <DropdownMenu label="Job Visas" items={jobVisaItems} />
          <DropdownMenu label="Visit Visas" items={visitVisaItems} />
          <DropdownMenu label="Migration Visas" items={migrationVisaItems} align="right" />
          <a
            href="/tools"
            className="text-[15px] font-semibold text-[#0c1a2e] hover:text-[#359FC2] transition-colors whitespace-nowrap"
          >
            Migration Tools & Calculators
          </a>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="p-4 space-y-1">
            <a
              href="/self-apply"
              className="block px-3 py-2.5 text-sm font-semibold text-[#0c1a2e] hover:text-[#359FC2] hover:bg-slate-50 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Self Apply
            </a>
            {allMobileSections.map((section) => (
              <div key={section.label}>
                <button
                  onClick={() => toggleSection(section.label)}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-[#0c1a2e] hover:bg-slate-50 rounded-lg"
                >
                  {section.label}
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${openMobileSection === section.label ? 'rotate-180' : ''}`}
                  />
                </button>
                {openMobileSection === section.label && (
                  <div className="ml-3 mt-1 border-l-2 border-[#359FC2]/20 pl-3 space-y-1">
                    {section.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block px-2 py-2 text-sm font-medium text-slate-600 hover:text-[#359FC2] hover:bg-slate-50 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="/support"
              className="block px-3 py-2.5 text-sm font-semibold text-[#0c1a2e] hover:text-[#359FC2] hover:bg-slate-50 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>

            {/* Auth buttons in mobile */}
            <div className="flex gap-3 px-3 pt-3 border-t border-gray-100 mt-2">
              <a
                href="/login"
                className="flex-1 text-center py-2.5 text-sm font-bold text-[#0c1a2e] border border-gray-200 rounded-xl"
              >
                Log In
              </a>
              <a
                href="/signup"
                className="flex-1 text-center py-2.5 text-sm font-bold text-white bg-black rounded-xl"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
