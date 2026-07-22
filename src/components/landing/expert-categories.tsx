'use client'

export function ExpertCategories() {
  const categories = [
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" fill="#eff6ff" />
          <path d="M24 12L40 20L24 28L8 20L24 12Z" fill="#2563eb"/>
          <path d="M33 23.5v9c0 2.5-4 5-9 5s-9-2.5-9-5v-9" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="40" y1="20" x2="40" y2="30" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round"/>
          <circle cx="40" cy="31" r="1.8" fill="#2563eb"/>
        </svg>
      ),
      title: 'Study Visa Consultants',
      description: 'Get assistance with student visas, university applications & SOP filing.',
      count: '12,540 Experts',
      href: '/find-experts?category=student'
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" fill="#fff7ed" />
          <line x1="24" y1="10" x2="24" y2="38" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="14" y1="38" x2="34" y2="38" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="24" y1="10" x2="12" y2="22" stroke="#ea580c" strokeWidth="2" strokeLinecap="round"/>
          <line x1="24" y1="10" x2="36" y2="22" stroke="#ea580c" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 22c0 0 2 5 6.5 5s6.5-5 6.5-5H8z" fill="#f97316"/>
          <path d="M27 22c0 0 2 5 6.5 5s6.5-5 6.5-5H27z" fill="#f97316"/>
        </svg>
      ),
      title: 'Immigration Lawyers',
      description: 'Legal advice, compliance, and official immigration representation.',
      count: '8,230 Lawyers',
      href: '/find-experts?category=lawyer'
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" fill="#fff1f2" />
          <rect x="12" y="16" width="20" height="9" rx="2" transform="rotate(-45 12 16)" fill="#e11d48"/>
          <line x1="28" y1="28" x2="38" y2="38" stroke="#be123c" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="10" y1="38" x2="22" y2="38" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Visa Appeal Lawyers',
      description: 'Expert legal support to appeal visa refusals & administrative reviews.',
      count: '3,120 Lawyers',
      href: '/find-experts?category=appeal'
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" fill="#f0fdf4" />
          <path d="M12 28L36 16L28 36L22 26L12 28Z" fill="#16a34a"/>
          <path d="M22 26L36 16" stroke="#15803d" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Visit Visa Consultants',
      description: 'Tourist, business, and short-term visitor visa filing assistance.',
      count: '6,850 Consultants',
      href: '/find-experts?category=tourist'
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" fill="#f0f9ff" />
          <rect x="10" y="18" width="28" height="20" rx="3" fill="#0284c7" opacity="0.15" stroke="#0284c7" strokeWidth="2.2"/>
          <path d="M18 18v-3a3 3 0 013-3h6a3 3 0 013 3v3" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="10" y1="26" x2="38" y2="26" stroke="#0284c7" strokeWidth="1.8"/>
          <rect x="21" y="24" width="6" height="4" rx="1" fill="#0284c7"/>
        </svg>
      ),
      title: 'Work Visa Specialists',
      description: 'Work permits, employer sponsorships, and job visa application processing.',
      count: '5,980 Specialists',
      href: '/find-experts?category=work'
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" fill="#faf5ff" />
          <path d="M10 22L24 10L38 22" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 20v18h22V20" stroke="#9333ea" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="#9333ea" fillOpacity="0.1"/>
          <rect x="20" y="26" width="8" height="12" rx="1" fill="#9333ea" opacity="0.3"/>
        </svg>
      ),
      title: 'PR & Residency Experts',
      description: 'Permanent residency, Express Entry points, and relocation settlement.',
      count: '4,210 Experts',
      href: '/find-experts?category=pr'
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" fill="#fefce8" />
          <path d="M14 16h20a2 2 0 012 2v14a2 2 0 01-2 2H14a2 2 0 01-2-2V18a2 2 0 012-2z" fill="#ca8a04" opacity="0.15" stroke="#ca8a04" strokeWidth="2.2"/>
          <circle cx="24" cy="25" r="5" stroke="#ca8a04" strokeWidth="2"/>
          <path d="M18 12h12" stroke="#ca8a04" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Tour & Event Operators',
      description: 'Cricket tours, event passes, construction job tours & travel itineraries.',
      count: '2,450 Operators',
      href: '/tours'
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" fill="#ecfdf5" />
          <path d="M14 36V18L24 12L34 18V36H14Z" stroke="#059669" strokeWidth="2.2" fill="#059669" fillOpacity="0.1"/>
          <rect x="18" y="22" width="4" height="4" fill="#059669"/>
          <rect x="26" y="22" width="4" height="4" fill="#059669"/>
          <rect x="18" y="28" width="4" height="4" fill="#059669"/>
          <rect x="26" y="28" width="4" height="4" fill="#059669"/>
        </svg>
      ),
      title: 'Universities & Institutes',
      description: 'Direct university admissions, global campus partnerships & degree programs.',
      count: '1,890 Institutes',
      href: '/universities'
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" fill="#f5f3ff" />
          <rect x="10" y="16" width="28" height="18" rx="3" fill="#7c3aed" opacity="0.15" stroke="#7c3aed" strokeWidth="2.2"/>
          <path d="M10 22h28" stroke="#7c3aed" strokeWidth="2.2"/>
          <circle cx="18" cy="28" r="2" fill="#7c3aed"/>
        </svg>
      ),
      title: 'Financers & Insurance Agents',
      description: 'Education loans, proof of funds, GIC accounts & travel insurance.',
      count: '3,670 Agents',
      href: '/services/travel-insurance'
    },
  ]

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find the Right <span className="text-blue-600">Immigration Expert</span> for Your Needs
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Explore verified professionals and certified agencies across 9 dedicated categories.
          </p>
        </div>

        {/* 3x3 Grid of 9 Perfectly Square Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <a
              key={i}
              href={cat.href}
              className="group aspect-square flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Header Icon + Number Tag */}
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 px-2.5 py-1 rounded-full transition-colors">
                  0{i + 1}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>

              {/* Footer Count & Arrow */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-600">
                  {cat.count}
                </span>
                <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-2">
          <a
            href="/find-experts"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black hover:bg-slate-900 text-white rounded-full text-xs font-extrabold tracking-wider uppercase shadow-md transition-all hover:scale-105"
          >
            <span>Explore All 9 Categories</span>
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  )
}
