'use client'

export function ExpertCategories() {
  const categories = [
    {
      icon: (
        // Two people / visa consultants
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
          <circle cx="18" cy="16" r="7" fill="#1d4ed8" opacity="0.15"/>
          <path d="M18 10a6 6 0 100 12A6 6 0 0018 10z" fill="#1d4ed8"/>
          <path d="M6 38c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="33" cy="15" r="5" fill="#1d4ed8" opacity="0.6"/>
          <path d="M29 38c0-5 2.5-9 6-10.5" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Visa Consultants',
      description: 'Get help with new visa applications and documentation.',
      count: '12,540 Experts',
    },
    {
      icon: (
        // Balance scales – orange
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
          <line x1="24" y1="8" x2="24" y2="40" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="12" y1="40" x2="36" y2="40" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="24" y1="8" x2="10" y2="22" stroke="#c2410c" strokeWidth="2" strokeLinecap="round"/>
          <line x1="24" y1="8" x2="38" y2="22" stroke="#c2410c" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 22c0 0 2 6 8 6s8-6 8-6H6z" fill="#f97316" opacity="0.85"/>
          <path d="M26 22c0 0 2 6 8 6s8-6 8-6H26z" fill="#f97316" opacity="0.85"/>
        </svg>
      ),
      title: 'Immigration Lawyers',
      description: 'Legal advice for complex cases and compliance.',
      count: '8,230 Lawyers',
    },
    {
      icon: (
        // Gavel – orange
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
          <rect x="10" y="18" width="22" height="10" rx="3" transform="rotate(-45 10 18)" fill="#f97316"/>
          <rect x="8" y="16" width="14" height="6" rx="2" transform="rotate(-45 8 16)" fill="#c2410c"/>
          <line x1="30" y1="30" x2="40" y2="40" stroke="#c2410c" strokeWidth="4" strokeLinecap="round"/>
          <line x1="8" y1="38" x2="20" y2="38" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Visa Appeal Lawyers',
      description: 'Appeal refusals and resolve visa application issues.',
      count: '3,120 Lawyers',
    },
    {
      icon: (
        // Graduation cap – blue
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
          <path d="M24 10L44 20L24 30L4 20L24 10Z" fill="#1d4ed8"/>
          <path d="M34 24v10c0 3-4.477 6-10 6S14 37 14 34V24" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="44" y1="20" x2="44" y2="32" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="44" cy="33" r="2" fill="#1d4ed8"/>
        </svg>
      ),
      title: 'Education Counsellors',
      description: 'Study abroad guidance and university admissions.',
      count: '6,850 Counsellors',
    },
    {
      icon: (
        // Briefcase – blue
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
          <rect x="6" y="18" width="36" height="24" rx="3" fill="#1d4ed8" opacity="0.15" stroke="#1d4ed8" strokeWidth="2.5"/>
          <path d="M16 18v-4a4 4 0 014-4h8a4 4 0 014 4v4" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="6" y1="28" x2="42" y2="28" stroke="#1d4ed8" strokeWidth="2"/>
          <rect x="20" y="25" width="8" height="6" rx="1" fill="#1d4ed8"/>
        </svg>
      ),
      title: 'Work Visa Specialists',
      description: 'Work permits, sponsorships and employment visas.',
      count: '5,980 Specialists',
    },
    {
      icon: (
        // House – blue
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
          <path d="M6 22L24 8L42 22" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 19v21h10V28h8v12h10V19" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#1d4ed8" fillOpacity="0.1"/>
          <rect x="20" y="28" width="8" height="12" rx="1" fill="#1d4ed8" opacity="0.3"/>
        </svg>
      ),
      title: 'Relocation Experts',
      description: 'Relocation, settlement and post-landing support.',
      count: '4,210 Experts',
    },
  ]

  return (
    <section className="w-full py-14 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Find the Right{' '}
            <span className="text-blue-600">Immigration Expert</span>{' '}
            for Your Needs
          </h2>
        </div>

        {/* Cards grid — 2-col on mobile, 3-col on tablet, 6-col on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex flex-col p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer bg-white"
            >
              <div className="mb-3">{cat.icon}</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">{cat.title}</h3>
              <p className="text-xs text-gray-500 leading-snug mb-3 flex-1">{cat.description}</p>
              <p className="text-xs font-semibold text-blue-600">{cat.count}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-8">
          <button className="px-7 py-2.5 border border-blue-600 text-blue-600 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  )
}
