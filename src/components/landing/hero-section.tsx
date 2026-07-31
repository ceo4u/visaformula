import { ChevronDown, Search, Globe, MapPin, LayoutGrid, FileText, Pause, Play } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const heroSlides = [
  {
    id: 0,
    titleLine1: 'Move Anywhere.',
    titleLine2: 'Get ',
    highlightText: 'Expert Help.',
    buttonText: 'Visa Experts',
    creditTitle: 'Dubai Marina Skyline',
    creditSub: 'Photo by Oscar K.',
    bgImage: '/hero-bg.jpg',
  },
  {
    id: 1,
    titleLine1: 'Study Worldwide.',
    titleLine2: 'Get ',
    highlightText: 'Admissions.',
    buttonText: 'Universities',
    creditTitle: 'Global Campus',
    creditSub: 'Photo by Alex P.',
    bgImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=3840&auto=format&fit=crop&q=100',
  },
  {
    id: 2,
    titleLine1: 'Work & Relocate.',
    titleLine2: 'Get ',
    highlightText: 'Work Permits.',
    buttonText: 'Work Permits',
    creditTitle: 'Financial Center',
    creditSub: 'Photo by Marcus B.',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=3840&auto=format&fit=crop&q=100',
  },
]

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

const countriesList = [
  'All Countries',
  'USA',
  'Canada',
  'UK',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Singapore',
  'UAE',
  'Other'
]

const locationsList = [
  'All Locations',
  'New York, USA',
  'Toronto, Canada',
  'London, UK',
  'Sydney, Australia',
  'Dubai, UAE',
  'Berlin, Germany',
  'Paris, France',
  'Other Location'
]

const categoriesList = [
  'All Categories',
  'Student Visa',
  'Work Visa',
  'Visitor / Tourist Visa',
  'Permanent Residence',
  'Business Visa',
  'Visa Appeal',
  'Deportation Defence',
  'Citizenship'
]

const popularSearches = [
  'USA Visa',
  'Canada PR',
  'UK Student Visa',
  'Australia Visa',
  'Schengen Visa',
  'Work Visa',
  'Business Visa'
]

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [slideProgress, setSlideProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('Select Country')
  const [location, setLocation] = useState('Select Location')
  const [category, setCategory] = useState('Select Category')

  const [countryOpen, setCountryOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)

  const countryRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const categoryRef = useRef<HTMLDivElement>(null)

  // Auto-advancing story carousel timer
  useEffect(() => {
    if (isPaused) return

    const intervalTime = 50
    const totalDuration = 5000 // 5 seconds per slide segment
    const step = (intervalTime / totalDuration) * 100

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setActiveSlide((current) => (current + 1) % heroSlides.length)
          return 0
        }
        return prev + step
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [isPaused, activeSlide])

  const goToSlide = (index: number) => {
    setActiveSlide(index)
    setSlideProgress(0)
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false)
      }
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false)
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryOpen(false)
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

  const handlePopularSearch = (search: string) => {
    if (search === 'USA Visa') {
      setQuery('USA Visa')
      setCountry('USA')
    } else if (search === 'Canada PR') {
      setCategory('Permanent Residence')
      setCountry('Canada')
    } else if (search === 'UK Student Visa') {
      setCategory('Student Visa')
      setCountry('UK')
    } else if (search === 'Australia Visa') {
      setCategory('Work Visa')
      setCountry('Australia')
    } else if (search === 'Schengen Visa') {
      setCategory('Visitor / Tourist Visa')
      setCountry('France')
    } else if (search === 'Work Visa') {
      setCategory('Work Visa')
    } else if (search === 'Business Visa') {
      setCategory('Business Visa')
    }
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query.trim()) params.set('query', query.trim())
    if (country !== 'Select Country' && country !== 'All Countries') params.set('country', country)
    if (location !== 'Select Location' && location !== 'All Locations') params.set('location', location)
    if (category !== 'Select Category' && category !== 'All Categories') params.set('category', category)
    window.location.href = `/find-experts?${params.toString()}`
  }

  return (
    <section className="w-full relative overflow-visible pb-4 md:pb-6 bg-slate-950">
      {/* Background Images - Auto-switching Story Carousel with Smooth Cross-fade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.bgImage} 
              alt={slide.titleLine1} 
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-slate-950/95"></div>
      </div>

      {/* Top hero area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28 pb-8 relative z-10 min-h-[75vh] md:min-h-[82vh] flex flex-col justify-center">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12 my-auto">
          {/* Left content with Vertical Story Line Control (Yelp Exact Position & Alignment) */}
          <div className="w-full md:w-[52%] md:flex-shrink-0 pl-0 sm:pl-4 lg:pl-6">
            <div className="flex items-start gap-4 sm:gap-6">
              {/* Vertical Segmented Progress Line Bar (Exact Yelp Height & Spacing) */}
              <div className="flex flex-col gap-2.5 shrink-0 pt-2 items-center select-none">
                {heroSlides.map((slide, index) => {
                  const isActive = activeSlide === index
                  const isCompleted = activeSlide > index
                  const heightPercent = isActive ? `${slideProgress}%` : isCompleted ? '100%' : '0%'

                  return (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(index)}
                      className="w-1.5 h-12 sm:h-16 bg-white/25 hover:bg-white/40 rounded-full overflow-hidden relative cursor-pointer transition-all border border-white/10"
                      title={`Go to slide ${index + 1}`}
                    >
                      <div 
                        className="absolute top-0 left-0 w-full bg-white rounded-full transition-all ease-linear"
                        style={{ height: heightPercent }}
                      />
                    </button>
                  )
                })}

                {/* Pause / Play Toggle Icon */}
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="w-5.5 h-5.5 mt-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer border border-white/20"
                  title={isPaused ? "Resume story transition" : "Pause story transition"}
                >
                  {isPaused ? <Play className="w-2.5 h-2.5 fill-current ml-0.5" /> : <Pause className="w-2.5 h-2.5 fill-current" />}
                </button>
              </div>

              {/* Title & Compact Red Pill Button (Exact Yelp Font & Vertical Placement) */}
              <div className="flex-1">
                <div>
                  <h1
                    className="text-[42px] sm:text-[54px] md:text-[64px] font-black text-white leading-[1.03] tracking-tight drop-shadow-lg transition-all duration-300"
                    style={{ fontFamily: 'var(--font-plus-jakarta, inherit)' }}
                  >
                    {heroSlides[activeSlide].titleLine1}
                  </h1>
                  <h1
                    className="text-[42px] sm:text-[54px] md:text-[64px] font-black text-white leading-[1.03] tracking-tight drop-shadow-lg transition-all duration-300"
                    style={{ fontFamily: 'var(--font-plus-jakarta, inherit)' }}
                  >
                    {heroSlides[activeSlide].titleLine2}
                    {heroSlides[activeSlide].highlightText}
                  </h1>
                </div>

                {/* Brand Blue Action Pill Button */}
                <div className="mt-4 sm:mt-5">
                  <button
                    onClick={() => document.getElementById('search-panel')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer border border-white/20"
                  >
                    <Search className="w-4 h-4 stroke-[2.5]" />
                    <span>{heroSlides[activeSlide].buttonText}</span>
                  </button>
                </div>

                {/* Bottom Left Photo Credit */}
                <div className="mt-14 sm:mt-20 md:mt-28 text-xs text-white/85 select-none font-sans leading-tight">
                  <div className="font-bold text-white text-xs sm:text-sm drop-shadow-md">{heroSlides[activeSlide].creditTitle}</div>
                  <div className="text-white/60 text-[11px] sm:text-xs drop-shadow-md">{heroSlides[activeSlide].creditSub}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: HTML-based connected 3x3 Grid Collage of 9 Square Classifieds Posts */}
          <div className="flex w-full md:flex-1 items-center justify-center md:justify-end overflow-visible mt-4 md:mt-0 font-sans">
            <div className="relative w-full max-w-[460px] md:max-w-[560px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
              {/* Classifieds Board Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <h3 className="font-sora font-extrabold text-xs text-[#0c1a2e] uppercase tracking-wider">Latest Offers</h3>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Visa Categories & Offers
                </span>
              </div>

              {/* 3x3 Grid */}
              <div className="p-3 grid grid-cols-3 gap-2.5 bg-slate-50/50">
                {/* 1. Cyprus Universities Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem("auto_open_cyprus", "true");
                      window.location.href = '/universities';
                    }
                  }}
                >
                  <img src="/images/cyprus.jpg" alt="Cyprus Universities" className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Top Bar: Category Pill + Consultant Glass Pill */}
                  <div className="relative z-10 p-2 flex items-center justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider shadow-xs">
                      Student
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] font-medium text-white/90 truncate bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 shadow-xs max-w-[55%]">
                      EuroEdu Consult ✓
                    </span>
                  </div>

                  {/* Bottom Bar: Country + Title */}
                  <div className="relative z-10 p-2.5">
                    <span className="text-[8.5px] font-medium text-cyan-200 block mb-0.5">
                      🇨🇾 Cyprus
                    </span>
                    <h4 className="text-[10.5px] sm:text-[11.5px] font-bold text-white leading-tight block truncate group-hover:text-cyan-300 transition-colors">
                      Cyprus Oct Intake 2026
                    </h4>
                  </div>
                </div>

                {/* 2. Greece Cricket Tour Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem("auto_open_greece_tour", "true");
                      window.location.href = '/tours?category=sports&country=greece';
                    }
                  }}
                >
                  <img src="/images/greece.jpg" alt="Greece Cricket Tours" className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="relative z-10 p-2 flex items-center justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider shadow-xs">
                      Visit
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] font-medium text-white/90 truncate bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 shadow-xs max-w-[55%]">
                      Hellas Sports ✓
                    </span>
                  </div>

                  <div className="relative z-10 p-2.5">
                    <span className="text-[8.5px] font-medium text-emerald-200 block mb-0.5">
                      🇬🇷 Greece
                    </span>
                    <h4 className="text-[10.5px] sm:text-[11.5px] font-bold text-white leading-tight block truncate group-hover:text-emerald-300 transition-colors">
                      Greece Cricket Tour
                    </h4>
                  </div>
                </div>

                {/* 3. Canada PR Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/find-experts?category=pr&country=Canada'; }}
                >
                  <img src="https://images.unsplash.com/photo-1517935703635-27c737826572?w=400&h=400&fit=crop" alt="Canada PR" className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="relative z-10 p-2 flex items-center justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider shadow-xs">
                      PR
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] font-medium text-white/90 truncate bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 shadow-xs max-w-[55%]">
                      Maple Immigrate ✓
                    </span>
                  </div>

                  <div className="relative z-10 p-2.5">
                    <span className="text-[8.5px] font-medium text-red-200 block mb-0.5">
                      🇨🇦 Canada
                    </span>
                    <h4 className="text-[10.5px] sm:text-[11.5px] font-bold text-white leading-tight block truncate group-hover:text-red-300 transition-colors">
                      Express Entry PR 2026
                    </h4>
                  </div>
                </div>

                {/* 4. USA F-1 Student Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=USA'; }}
                >
                  <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=400&fit=crop" alt="USA Campus" className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="relative z-10 p-2 flex items-center justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider shadow-xs">
                      Student
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] font-medium text-white/90 truncate bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 shadow-xs max-w-[55%]">
                      Stateside Ed ✓
                    </span>
                  </div>

                  <div className="relative z-10 p-2.5">
                    <span className="text-[8.5px] font-medium text-blue-200 block mb-0.5">
                      🇺🇸 USA
                    </span>
                    <h4 className="text-[10.5px] sm:text-[11.5px] font-bold text-white leading-tight block truncate group-hover:text-blue-300 transition-colors">
                      USA F-1 Fall Intake
                    </h4>
                  </div>
                </div>

                {/* 5. UK Student & Work Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=UK'; }}
                >
                  <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=400&fit=crop" alt="London UK" className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="relative z-10 p-2 flex items-center justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider shadow-xs">
                      Student
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] font-medium text-white/90 truncate bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 shadow-xs max-w-[55%]">
                      Britannia Visas ✓
                    </span>
                  </div>

                  <div className="relative z-10 p-2.5">
                    <span className="text-[8.5px] font-medium text-amber-200 block mb-0.5">
                      🇬🇧 UK / London
                    </span>
                    <h4 className="text-[10.5px] sm:text-[11.5px] font-bold text-white leading-tight block truncate group-hover:text-amber-300 transition-colors">
                      UK Masters & PSW 2026
                    </h4>
                  </div>
                </div>

                {/* 6. UAE Dubai Work Visa Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=UAE'; }}
                >
                  <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=400&fit=crop" alt="Dubai UAE" className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="relative z-10 p-2 flex items-center justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider shadow-xs">
                      Work
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] font-medium text-white/90 truncate bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 shadow-xs max-w-[55%]">
                      Gulf Horizon ✓
                    </span>
                  </div>

                  <div className="relative z-10 p-2.5">
                    <span className="text-[8.5px] font-medium text-purple-200 block mb-0.5">
                      🇦🇪 UAE / Dubai
                    </span>
                    <h4 className="text-[10.5px] sm:text-[11.5px] font-bold text-white leading-tight block truncate group-hover:text-purple-300 transition-colors">
                      2-Yr Dubai Work Visa
                    </h4>
                  </div>
                </div>

                {/* 7. Japan Work Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=Japan'; }}
                >
                  <img src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&h=400&fit=crop" alt="Japan Work Visa" className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="relative z-10 p-2 flex items-center justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider shadow-xs">
                      Work
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] font-medium text-white/90 truncate bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 shadow-xs max-w-[55%]">
                      Nippon Career ✓
                    </span>
                  </div>

                  <div className="relative z-10 p-2.5">
                    <span className="text-[8.5px] font-medium text-rose-200 block mb-0.5">
                      🇯🇵 Japan
                    </span>
                    <h4 className="text-[10.5px] sm:text-[11.5px] font-bold text-white leading-tight block truncate group-hover:text-rose-300 transition-colors">
                      Japan SSW Work Visa
                    </h4>
                  </div>
                </div>

                {/* 8. Singapore Student Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=Singapore'; }}
                >
                  <img src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=400&fit=crop" alt="Singapore" className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="relative z-10 p-2 flex items-center justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider shadow-xs">
                      Student
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] font-medium text-white/90 truncate bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 shadow-xs max-w-[55%]">
                      AsiaPac Ed ✓
                    </span>
                  </div>

                  <div className="relative z-10 p-2.5">
                    <span className="text-[8.5px] font-medium text-sky-200 block mb-0.5">
                      🇸🇬 Singapore
                    </span>
                    <h4 className="text-[10.5px] sm:text-[11.5px] font-bold text-white leading-tight block truncate group-hover:text-sky-300 transition-colors">
                      Singapore Tech Academy
                    </h4>
                  </div>
                </div>

                {/* 9. Italy & Europe Schengen Post */}
                <div 
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between" 
                  onClick={() => { window.location.href = '/universities?country=Italy'; }}
                >
                  <img src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=400&fit=crop" alt="Italy Schengen" className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="relative z-10 p-2 flex items-center justify-between gap-1">
                    <span className="text-[7.5px] sm:text-[8px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider shadow-xs">
                      Visit
                    </span>
                    <span className="text-[7.5px] sm:text-[8.5px] font-medium text-white/90 truncate bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 shadow-xs max-w-[55%]">
                      Schengen Gateway ✓
                    </span>
                  </div>

                  <div className="relative z-10 p-2.5">
                    <span className="text-[8.5px] font-medium text-teal-200 block mb-0.5">
                      🇮🇹 Italy
                    </span>
                    <h4 className="text-[10.5px] sm:text-[11.5px] font-bold text-white leading-tight block truncate group-hover:text-teal-300 transition-colors">
                      Italy & EU Schengen
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advance Search Card — Matching User Reference Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 relative z-10">
        <div id="search-panel" className="bg-[#0B1527] rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            
            {/* Box 1: What are you looking for? */}
            <div className="bg-white rounded-xl border border-slate-200/90 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 px-3.5 py-2.5 h-[62px] flex items-center gap-3 shadow-2xs relative">
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <label className="text-[11px] font-semibold text-slate-800 leading-none mb-1 block select-none">
                  What are you looking for?
                </label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. USA Student Visa, Consultant"
                  className="w-full text-xs text-slate-700 placeholder:text-slate-400 outline-none bg-transparent font-medium"
                />
              </div>
            </div>

            {/* Box 2: Country */}
            <div 
              ref={countryRef}
              onClick={() => { setCountryOpen(!countryOpen); setLocationOpen(false); setCategoryOpen(false); }}
              className="bg-white rounded-xl border border-slate-200/90 hover:border-teal-500 px-3.5 py-2.5 h-[62px] flex items-center justify-between gap-3 shadow-2xs relative cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex flex-col justify-center min-w-0 select-none">
                  <span className="text-[11px] font-semibold text-slate-800 leading-none mb-1 block">
                    Country
                  </span>
                  <span className={`text-xs font-medium truncate ${country !== 'Select Country' ? 'text-slate-800 font-semibold' : 'text-slate-400'}`}>
                    {country}
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${countryOpen ? 'rotate-180' : ''}`} />

              {countryOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 max-h-60 overflow-y-auto font-sans">
                  {countriesList.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setCountry(c); setCountryOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors font-medium ${
                        country === c ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Box 3: Location */}
            <div 
              ref={locationRef}
              onClick={() => { setLocationOpen(!locationOpen); setCountryOpen(false); setCategoryOpen(false); }}
              className="bg-white rounded-xl border border-slate-200/90 hover:border-teal-500 px-3.5 py-2.5 h-[62px] flex items-center justify-between gap-3 shadow-2xs relative cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col justify-center min-w-0 select-none">
                  <span className="text-[11px] font-semibold text-slate-800 leading-none mb-1 block">
                    Location
                  </span>
                  <span className={`text-xs font-medium truncate ${location !== 'Select Location' ? 'text-slate-800 font-semibold' : 'text-slate-400'}`}>
                    {location}
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${locationOpen ? 'rotate-180' : ''}`} />

              {locationOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 max-h-60 overflow-y-auto font-sans">
                  {locationsList.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setLocation(loc); setLocationOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors font-medium ${
                        location === loc ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Box 4: All Categories */}
            <div 
              ref={categoryRef}
              onClick={() => { setCategoryOpen(!categoryOpen); setCountryOpen(false); setLocationOpen(false); }}
              className="bg-white rounded-xl border border-slate-200/90 hover:border-teal-500 px-3.5 py-2.5 h-[62px] flex items-center justify-between gap-3 shadow-2xs relative cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div className="flex flex-col justify-center min-w-0 select-none">
                  <span className="text-[11px] font-semibold text-slate-800 leading-none mb-1 block">
                    All Categories
                  </span>
                  <span className={`text-xs font-medium truncate ${category !== 'Select Category' ? 'text-slate-800 font-semibold' : 'text-slate-400'}`}>
                    {category}
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${categoryOpen ? 'rotate-180' : ''}`} />

              {categoryOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 max-h-60 overflow-y-auto font-sans">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setCategory(cat); setCategoryOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors font-medium ${
                        category === cat ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Box 5: Search Button */}
            <button 
              onClick={handleSearch}
              className="h-[62px] bg-[#00a896] hover:bg-[#029384] text-white rounded-xl shadow-md flex items-center justify-center gap-2 font-bold text-sm sm:text-base cursor-pointer transition-all active:scale-98 w-full"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
              <span>Search</span>
            </button>
          </div>

          {/* Popular Searches Row (Matching User Reference Image) */}
          <div className="flex items-center gap-2 sm:gap-3 mt-4 pt-1 text-xs overflow-x-auto pb-1 scrollbar-none">
            <span className="text-white font-bold shrink-0">Popular Searches:</span>
            {popularSearches.map((item, idx) => (
              <div key={item} className="flex items-center gap-2 shrink-0">
                {idx > 0 && <span className="text-teal-400/60 font-bold text-[10px] select-none">&gt;</span>}
                <button 
                  type="button"
                  onClick={() => handlePopularSearch(item)}
                  className="text-slate-200 hover:text-cyan-300 font-medium hover:underline transition-colors text-xs whitespace-nowrap cursor-pointer"
                >
                  {item}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
