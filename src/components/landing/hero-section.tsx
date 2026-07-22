'use client'

import { ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const visaTypes = [
  { 
    label: 'Visitor Visa', 
    color: 'text-[#2563eb]', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="4" width="18" height="14" rx="2" fill="currentColor" fillOpacity="0.1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 18v3M9 8h6M9 12h6" />
      </svg>
    )
  },
  { 
    label: 'Student Visa', 
    color: 'text-[#16a34a]', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7M5 12v6c0 1.5 3 2.5 7 2.5s7-1.5 7-2.5v-6" />
      </svg>
    )
  },
  { 
    label: 'Work Visa', 
    color: 'text-[#ea580c]', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="6" width="18" height="14" rx="2" fill="currentColor" fillOpacity="0.1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M3 10h18M10 14h4" />
      </svg>
    )
  },
  { 
    label: 'Permanent Residence', 
    color: 'text-[#7c3aed]', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2M5 21H3m14 0h-4M7 21h4m1-17v13m-2-9H9m6 4h-2M9 12h2m4 0h-2" />
      </svg>
    )
  },
  { 
    label: 'Citizenship', 
    color: 'text-[#ca8a04]', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M8 12h8" />
      </svg>
    )
  },
  { 
    label: 'Visa Appeal', 
    color: 'text-[#dc2626]', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  { 
    label: 'Deportation Defence', 
    color: 'text-[#2563eb]', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.1" />
      </svg>
    )
  },
  { 
    label: 'Business Immigration', 
    color: 'text-[#059669]', 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M9 9h2m-2 4h2m4-4h2m-2 4h2m-8 4h8" />
      </svg>
    )
  },
]

const servicesList = [
  'Visitor Visa',
  'Student Visa',
  'Work Visa',
  'Permanent Residence',
  'Citizenship',
  'Visa Appeal',
  'Deportation Defence',
  'Business Immigration'
]

const countriesList = [
  'Canada',
  'USA',
  'UK',
  'Australia',
  'France',
  'Japan'
]

const popularSearches = ['Canada PR', 'USA Visa Appeal', 'UK Student Visa', 'Australia Work Visa', 'Canada Visitor Visa']

export function HeroSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [service, setService] = useState('Select a service')
  const [country, setCountry] = useState('Select country')
  const [city, setCity] = useState('')

  const [serviceOpen, setServiceOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)

  const serviceRef = useRef<HTMLDivElement>(null)
  const countryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target as Node)) {
        setServiceOpen(false)
      }
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)

    const handleExternalCountrySelect = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail) {
        setCountry(customEvent.detail)
      }
    }
    window.addEventListener('select-visa-country', handleExternalCountrySelect)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      window.removeEventListener('select-visa-country', handleExternalCountrySelect)
    }
  }, [])

  const handleTabClick = (index: number, label: string) => {
    setActiveTab(index)
    setService(label)
  }

  const handlePopularSearch = (search: string) => {
    if (search === 'Canada PR') {
      setService('Permanent Residence')
      setCountry('Canada')
    } else if (search === 'USA Visa Appeal') {
      setService('Visa Appeal')
      setCountry('USA')
    } else if (search === 'UK Student Visa') {
      setService('Student Visa')
      setCountry('UK')
    } else if (search === 'Australia Work Visa') {
      setService('Work Visa')
      setCountry('Australia')
    } else if (search === 'Canada Visitor Visa') {
      setService('Visitor Visa')
      setCountry('Canada')
    }
  }

  const handleSearch = () => {
    const serviceParam = service !== 'Select a service' ? encodeURIComponent(service) : ''
    const countryParam = country !== 'Select country' ? encodeURIComponent(country) : ''
    const cityParam = city ? encodeURIComponent(city) : ''
    const params = new URLSearchParams()
    if (serviceParam) params.set('query', serviceParam)
    if (countryParam) params.set('country', countryParam)
    if (cityParam) params.set('location', cityParam)
    window.location.href = `/find-experts?${params.toString()}`
  }

  return (
    <section className="w-full bg-white pb-16 md:pb-24 overflow-visible">
      {/* Top hero area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left content */}
          <div className="w-full md:w-[40%] md:flex-shrink-0 space-y-6 pb-6">
            <div className="space-y-1">
              <h1
                className="text-[32px] sm:text-[44px] md:text-[54px] font-extrabold text-[#0f1f3d] leading-[1.08]"
                style={{ fontFamily: 'var(--font-plus-jakarta, inherit)' }}
              >
                Move Anywhere.
              </h1>
              <h1
                className="text-[32px] sm:text-[44px] md:text-[54px] font-extrabold text-[#0f1f3d] leading-[1.08]"
                style={{ fontFamily: 'var(--font-plus-jakarta, inherit)' }}
              >
                Get <span className="text-blue-600">Expert Help</span> Anywhere.
              </h1>
            </div>

            <p className="text-gray-500 text-[15px] sm:text-[16px] leading-relaxed max-w-[420px]">
              AI-powered guidance connecting you with verified immigration lawyers, visa experts and relocation professionals across 150+ countries.
            </p>

            {/* Feature badges */}
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap pt-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-gray-800">Verified</p>
                  <p className="text-xs text-gray-500">Professionals</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-green-600">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-gray-800">Secure &amp; Private</p>
                  <p className="text-xs text-gray-500">Consultations</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-500">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-gray-800">Transparent</p>
                  <p className="text-xs text-gray-500">Pricing</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-600">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-gray-800">Thousands of</p>
                  <p className="text-xs text-gray-500">Success Stories</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: HTML-based connected 3x3 Grid Collage of 9 Square Classifieds Posts */}
          <div className="flex w-full md:flex-1 items-center justify-center md:justify-end overflow-visible mt-4 md:mt-0 font-sans">
            <div className="relative w-full max-w-[460px] md:max-w-[560px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Classifieds Board Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <h3 className="font-sora font-extrabold text-xs text-[#0c1a2e] uppercase tracking-wider">Latest Offers</h3>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Verified Classifieds
                </span>
              </div>

              {/* 3x3 Grid */}
              <div className="p-2.5 grid grid-cols-3 gap-2 bg-slate-100/50">
                {/* 1. Cyprus Universities Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem("auto_open_cyprus", "true");
                      window.location.href = '/universities';
                    }
                  }}
                >
                  <img src="/images/cyprus.jpg" alt="Cyprus Universities" className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
                  
                  {/* Top Row: Category + Consultant */}
                  <div className="relative z-10 p-1.5 flex items-start justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8.5px] font-extrabold bg-cyan-500 text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-xs">
                      Student Visa
                    </span>
                    <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/15 max-w-[60%]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                      <span className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-100 truncate">EuroEdu Consult ✓</span>
                    </div>
                  </div>

                  {/* Bottom Content: Destination Country & Ad Title */}
                  <div className="relative z-10 p-2">
                    <span className="inline-block text-[8px] font-bold bg-white/20 backdrop-blur-xs text-cyan-200 px-1.5 py-0.5 rounded mb-1">
                      🇨🇾 Cyprus
                    </span>
                    <h4 className="text-[10px] sm:text-[11.5px] font-extrabold text-white leading-tight font-sans block truncate group-hover:text-cyan-300 transition-colors">
                      Cyprus Oct Intake 2026
                    </h4>
                  </div>
                </div>

                {/* 2. Greece Cricket Tour Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem("auto_open_greece_tour", "true");
                      window.location.href = '/tours?category=sports&country=greece';
                    }
                  }}
                >
                  <img src="/images/greece.jpg" alt="Greece Cricket Tours" className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
                  
                  <div className="relative z-10 p-1.5 flex items-start justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8.5px] font-extrabold bg-emerald-600 text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-xs">
                      Visit Visa
                    </span>
                    <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/15 max-w-[60%]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                      <span className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-100 truncate">Olympus Sports ✓</span>
                    </div>
                  </div>

                  <div className="relative z-10 p-2">
                    <span className="inline-block text-[8px] font-bold bg-white/20 backdrop-blur-xs text-emerald-200 px-1.5 py-0.5 rounded mb-1">
                      🇬🇷 Greece
                    </span>
                    <h4 className="text-[10px] sm:text-[11.5px] font-extrabold text-white leading-tight font-sans block truncate group-hover:text-emerald-300 transition-colors">
                      Greece Cricket Tour Package
                    </h4>
                  </div>
                </div>

                {/* 3. UK Universities Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=UK'; }}
                >
                  <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=400&fit=crop" alt="UK Universities" className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
                  
                  <div className="relative z-10 p-1.5 flex items-start justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8.5px] font-extrabold bg-indigo-600 text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-xs">
                      Student Visa
                    </span>
                    <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/15 max-w-[60%]">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                      <span className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-100 truncate">Britannic Consult ✓</span>
                    </div>
                  </div>

                  <div className="relative z-10 p-2">
                    <span className="inline-block text-[8px] font-bold bg-white/20 backdrop-blur-xs text-indigo-200 px-1.5 py-0.5 rounded mb-1">
                      🇬🇧 United Kingdom
                    </span>
                    <h4 className="text-[10px] sm:text-[11.5px] font-extrabold text-white leading-tight font-sans block truncate group-hover:text-indigo-300 transition-colors">
                      UK Masters Admissions
                    </h4>
                  </div>
                </div>

                {/* 4. Canada Work & Study Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=Canada'; }}
                >
                  <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=400&fit=crop" alt="Canada Pathways" className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
                  
                  <div className="relative z-10 p-1.5 flex items-start justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8.5px] font-extrabold bg-red-600 text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-xs">
                      PR & Residency
                    </span>
                    <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/15 max-w-[60%]">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
                      <span className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-100 truncate">MapleLeaf Agency ✓</span>
                    </div>
                  </div>

                  <div className="relative z-10 p-2">
                    <span className="inline-block text-[8px] font-bold bg-white/20 backdrop-blur-xs text-red-200 px-1.5 py-0.5 rounded mb-1">
                      🇨🇦 Canada
                    </span>
                    <h4 className="text-[10px] sm:text-[11.5px] font-extrabold text-white leading-tight font-sans block truncate group-hover:text-red-300 transition-colors">
                      Express Entry & PGWP
                    </h4>
                  </div>
                </div>

                {/* 5. Australia PR Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=Australia'; }}
                >
                  <img src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=400&fit=crop" alt="Australia PR" className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
                  
                  <div className="relative z-10 p-1.5 flex items-start justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8.5px] font-extrabold bg-amber-600 text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-xs">
                      PR & Residency
                    </span>
                    <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/15 max-w-[60%]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                      <span className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-100 truncate">Pacific Migration ✓</span>
                    </div>
                  </div>

                  <div className="relative z-10 p-2">
                    <span className="inline-block text-[8px] font-bold bg-white/20 backdrop-blur-xs text-amber-200 px-1.5 py-0.5 rounded mb-1">
                      🇦🇺 Australia
                    </span>
                    <h4 className="text-[10px] sm:text-[11.5px] font-extrabold text-white leading-tight font-sans block truncate group-hover:text-amber-300 transition-colors">
                      Subclass 189 Skill PR
                    </h4>
                  </div>
                </div>

                {/* 6. Dubai / UAE Work Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=UAE'; }}
                >
                  <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=400&fit=crop" alt="Dubai UAE" className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
                  
                  <div className="relative z-10 p-1.5 flex items-start justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8.5px] font-extrabold bg-purple-600 text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-xs">
                      Work Visa
                    </span>
                    <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/15 max-w-[60%]">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"></span>
                      <span className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-100 truncate">Gulf Horizon ✓</span>
                    </div>
                  </div>

                  <div className="relative z-10 p-2">
                    <span className="inline-block text-[8px] font-bold bg-white/20 backdrop-blur-xs text-purple-200 px-1.5 py-0.5 rounded mb-1">
                      🇦🇪 UAE / Dubai
                    </span>
                    <h4 className="text-[10px] sm:text-[11.5px] font-extrabold text-white leading-tight font-sans block truncate group-hover:text-purple-300 transition-colors">
                      2-Yr Dubai Work Visa
                    </h4>
                  </div>
                </div>

                {/* 7. Japan Work Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=Japan'; }}
                >
                  <img src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&h=400&fit=crop" alt="Japan Work Visa" className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
                  
                  <div className="relative z-10 p-1.5 flex items-start justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8.5px] font-extrabold bg-rose-600 text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-xs">
                      Work Visa
                    </span>
                    <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/15 max-w-[60%]">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
                      <span className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-100 truncate">Nippon Career ✓</span>
                    </div>
                  </div>

                  <div className="relative z-10 p-2">
                    <span className="inline-block text-[8px] font-bold bg-white/20 backdrop-blur-xs text-rose-200 px-1.5 py-0.5 rounded mb-1">
                      🇯🇵 Japan
                    </span>
                    <h4 className="text-[10px] sm:text-[11.5px] font-extrabold text-white leading-tight font-sans block truncate group-hover:text-rose-300 transition-colors">
                      Japan SSW Work Visa
                    </h4>
                  </div>
                </div>

                {/* 8. Singapore Student Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=Singapore'; }}
                >
                  <img src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=400&fit=crop" alt="Singapore" className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
                  
                  <div className="relative z-10 p-1.5 flex items-start justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8.5px] font-extrabold bg-blue-600 text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-xs">
                      Student Visa
                    </span>
                    <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/15 max-w-[60%]">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                      <span className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-100 truncate">AsiaPac Ed ✓</span>
                    </div>
                  </div>

                  <div className="relative z-10 p-2">
                    <span className="inline-block text-[8px] font-bold bg-white/20 backdrop-blur-xs text-blue-200 px-1.5 py-0.5 rounded mb-1">
                      🇸🇬 Singapore
                    </span>
                    <h4 className="text-[10px] sm:text-[11.5px] font-extrabold text-white leading-tight font-sans block truncate group-hover:text-blue-300 transition-colors">
                      Singapore Tech Academy
                    </h4>
                  </div>
                </div>

                {/* 9. Italy & Europe Schengen Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=Italy'; }}
                >
                  <img src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=400&fit=crop" alt="Italy Schengen" className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
                  
                  <div className="relative z-10 p-1.5 flex items-start justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8.5px] font-extrabold bg-teal-600 text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 shadow-xs">
                      Visit Visa
                    </span>
                    <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/15 max-w-[60%]">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0"></span>
                      <span className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-100 truncate">Schengen Gateway ✓</span>
                    </div>
                  </div>

                  <div className="relative z-10 p-2">
                    <span className="inline-block text-[8px] font-bold bg-white/20 backdrop-blur-xs text-teal-200 px-1.5 py-0.5 rounded mb-1">
                      🇮🇹 Italy
                    </span>
                    <h4 className="text-[10px] sm:text-[11.5px] font-extrabold text-white leading-tight font-sans block truncate group-hover:text-teal-300 transition-colors">
                      Italy & EU Schengen
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark search card — flush with hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
            <div id="search-panel" className="bg-[#0f1f3d] rounded-2xl px-4 sm:px-7 py-6 shadow-2xl">
          <h2 className="text-white text-base font-semibold mb-4">What do you need help with?</h2>

          {/* Visa type tabs — 2-col grid on mobile, even horizontal flex on desktop */}
          <div className="bg-white rounded-xl px-2 py-3 mb-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:items-stretch lg:justify-between gap-y-2 lg:gap-y-0 w-full">
              {visaTypes.map((type, i) => (
                <div key={i} className="flex items-center lg:flex-1 justify-center">
                  <button
                    onClick={() => {
                      if (type.label === 'Visitor Visa') {
                        window.location.href = '/tours';
                      } else if (type.label === 'Student Visa') {
                        window.location.href = '/universities';
                      } else if (type.label === 'Work Visa') {
                        window.location.href = '/jobs';
                      } else {
                        handleTabClick(i, type.label);
                      }
                    }}
                    className={`flex flex-col items-center gap-1.5 px-2 py-2 rounded-lg w-full transition-all cursor-pointer ${
                      activeTab === i ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'
                    }`}
                  >
                    <span className={`${type.color} flex items-center justify-center`}>
                      {type.icon}
                    </span>
                    <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">
                      {type.label}
                    </span>
                  </button>
                  {i < visaTypes.length - 1 && (
                    <div className="hidden lg:block w-px h-8 bg-gray-100 self-center flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Search filters — stack on mobile */}
          <div className="flex flex-col md:flex-row items-stretch gap-4">
            {/* Filter 1 */}
            <div ref={serviceRef} className="flex-1 bg-white rounded-xl border border-gray-200 px-4 py-2 flex flex-col justify-center relative">
              <label className="text-[11px] text-gray-800 font-bold mb-0.5">I want help with</label>
              <div 
                className="relative cursor-pointer flex items-center justify-between"
                onClick={() => setServiceOpen(!serviceOpen)}
              >
                <span className="text-sm text-gray-700 font-medium select-none py-0.5">
                  {service}
                </span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${serviceOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Custom Service Dropdown */}
              {serviceOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 py-1.5 z-50 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => { setService('Select a service'); setServiceOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Select a service
                  </button>
                  {servicesList.map((item) => (
                    <button
                      key={item}
                      onClick={() => { setService(item); setServiceOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors font-medium ${
                        service === item ? 'bg-blue-50/70 text-blue-600' : 'text-gray-700 hover:bg-blue-50/40 hover:text-blue-600'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 2 */}
            <div ref={countryRef} className="flex-1 bg-white rounded-xl border border-gray-200 px-4 py-2 flex flex-col justify-center relative">
              <label className="text-[11px] text-gray-800 font-bold mb-0.5">Country</label>
              <div 
                className="relative cursor-pointer flex items-center justify-between"
                onClick={() => setCountryOpen(!countryOpen)}
              >
                <span className="text-sm text-gray-700 font-medium select-none py-0.5">
                  {country}
                </span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${countryOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Custom Country Dropdown */}
              {countryOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 py-1.5 z-50 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => { setCountry('Select country'); setCountryOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Select country
                  </button>
                  {countriesList.map((item) => (
                    <button
                      key={item}
                      onClick={() => { setCountry(item); setCountryOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors font-medium ${
                        country === item ? 'bg-blue-50/70 text-blue-600' : 'text-gray-700 hover:bg-blue-50/40 hover:text-blue-600'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 3 */}
            <div className="flex-1 bg-white rounded-xl border border-gray-200 px-4 py-2 flex flex-col justify-center">
              <label className="text-[11px] text-gray-800 font-bold mb-0.5">
                City or Region <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city or region"
                className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none py-0.5"
              />
            </div>

            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-8 py-3.5 rounded-xl transition-colors flex-shrink-0 whitespace-nowrap flex items-center justify-center shadow-sm w-full md:w-auto"
            >
              Search Experts
            </button>
          </div>

          {/* Popular searches — wraps on mobile */}
          <div className="flex items-center gap-2 sm:gap-3 mt-5 flex-wrap">
            <span className="text-gray-400 text-xs font-semibold">Popular Searches:</span>
            {popularSearches.map((s, i) => (
              <button
                key={i}
                onClick={() => handlePopularSearch(s)}
                className="text-xs text-gray-300 bg-[#162744] hover:bg-[#1f355c] px-3.5 py-1.5 rounded-full hover:text-white transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
