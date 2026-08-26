'use client'

import { ChevronDown, Menu, X, MessageSquare } from 'lucide-react'
import { useState } from 'react'

// Dropdown item data
const findConsultantsItems = [
  { title: 'Student Visa Consultants', href: '/find-experts?category=student' },
  { title: 'Work Permit Consultants', href: '/find-experts?category=work' },
  { title: 'Tourist Visa Consultants', href: '/find-experts?category=tourist' },
  { title: 'PR & Migration Experts', href: '/find-experts?category=pr' },
  { title: 'All Verified Lawyers & Agents', href: '/find-experts' },
]

const visaServicesItems = [
  { title: 'Relocation Assistance (Housing & SIM)', href: '/classifieds' },
  { title: 'Visa Documentation Filing', href: '/services/visa-documentation' },
  { title: 'Apply Visa Online', href: '/services/apply-visa' },
  { title: 'IELTS & Language Prep', href: '/services/ielts-prep' },
  { title: 'Financial Proof & Loans', href: '/services/financial-proof' },
  { title: 'VFS & Embassy Booking', href: '/vfs-booking' },
]

const latestNewsItems = [
  { title: 'Canada Study Visa Updates 2026', href: '/visa-guide/canada/student' },
  { title: 'UK Skilled Worker Visa Rules', href: '/visa-guide/uk/work' },
  { title: 'Australia Express PR Guidelines', href: '/visa-guide/australia/pr' },
  { title: 'Latest Immigration News', href: '/visa-guide' },
]

const aiToolsItems = [
  { title: 'Travel Readiness Checker', href: '/readiness' },
  { title: 'Document Checklist AI', href: '/services/visa-documentation' },
  { title: 'Visa Cost Calculator', href: '/migration-tools' },
  { title: 'AI Assistant', href: '/ai-assistant' },
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
      <button className="flex items-center gap-1 text-[14px] font-bold text-slate-800 hover:text-[#00a896] transition-colors whitespace-nowrap py-2 cursor-pointer">
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 text-slate-500 ${open ? 'rotate-180 text-[#00a896]' : ''}`} />
      </button>
      {open && (
        <div className={`absolute top-full ${align === 'right' ? 'right-0' : 'left-0'} pt-1 z-50`}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-2 min-w-[230px] animate-fade-up">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#00a896] hover:bg-teal-50/70 transition-all"
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

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">

        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <img
            src="/logo.png?v=3"
            alt="TravlTik Logo"
            className="h-12 sm:h-14 lg:h-16 max-h-[62px] sm:max-h-[70px] w-auto object-contain"
          />
        </a>

        {/* Desktop Central Nav Items */}
        <nav className="hidden lg:flex items-center gap-7">
          <DropdownMenu label="Find Experts" items={findConsultantsItems} />
          
          <a href="/services/apply-visa" className="text-[14px] font-bold text-slate-800 hover:text-[#00a896] transition-colors whitespace-nowrap py-2">
            Self Apply
          </a>

          <DropdownMenu label="Visa Services" items={visaServicesItems} />
          <DropdownMenu label="Latest News & offers" items={latestNewsItems} />
          <DropdownMenu label="AI Tools" items={aiToolsItems} align="right" />
        </nav>

        {/* Right Actions (Contact, Log In, Sign Up) */}
        <div className="hidden lg:flex items-center gap-4">
          <a 
            href="/support" 
            className="flex items-center gap-1.5 text-[14px] font-bold text-slate-800 hover:text-[#00a896] transition-colors"
          >
            <MessageSquare size={16} className="text-slate-700" />
            <span>Contact</span>
          </a>

          <a
            href="/login"
            className="text-[13px] font-bold text-[#3b0764] border border-[#3b0764]/40 hover:bg-purple-50 hover:border-[#3b0764] px-4 py-2 rounded-xl transition-all shadow-2xs"
          >
            Log in
          </a>

          <a
            href="/signup"
            className="bg-[#3b0764] hover:bg-[#2d054e] text-white font-bold text-[13px] px-5 py-2.5 rounded-xl transition-all shadow-md shadow-purple-900/20 active:scale-95"
          >
            Sign Up
          </a>
        </div>

        {/* Hamburger (Mobile / Tablet) */}
        <button
          className="lg:hidden p-2 text-slate-800 hover:text-[#3b0764] cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="p-4 space-y-2 text-xs font-bold">
            <a href="/find-experts" className="block px-3 py-2.5 text-slate-800 hover:text-[#3b0764] rounded-lg">Find Experts</a>
            <a href="/services/apply-visa" className="block px-3 py-2.5 text-slate-800 hover:text-[#3b0764] rounded-lg">Self Apply</a>
            <a href="/services/visa-documentation" className="block px-3 py-2.5 text-slate-800 hover:text-[#3b0764] rounded-lg">Visa Services</a>
            <a href="/visa-guide" className="block px-3 py-2.5 text-slate-800 hover:text-[#3b0764] rounded-lg">Latest News & offers</a>
            <a href="/migration-tools" className="block px-3 py-2.5 text-slate-800 hover:text-[#3b0764] rounded-lg">AI Tools</a>
            <a href="/support" className="block px-3 py-2.5 text-slate-800 hover:text-[#3b0764] rounded-lg">Contact</a>

            <div className="flex gap-3 px-1 pt-3 border-t border-slate-100 mt-2">
              <a href="/login" className="flex-1 text-center py-2.5 text-xs font-bold text-[#3b0764] border border-[#3b0764] rounded-xl">Log in</a>
              <a href="/signup" className="flex-1 text-center py-2.5 text-xs font-bold text-white bg-[#3b0764] hover:bg-[#2d054e] rounded-xl shadow-sm">Sign Up</a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
