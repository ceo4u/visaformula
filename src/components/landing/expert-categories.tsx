'use client'

export function ExpertCategories() {
  const categories = [
    {
      icon: (
        <svg className="w-7 h-7 text-[#0f2b5c]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          <circle cx="5" cy="9" r="2" />
          <path d="M5.5 13c-1.3 0-4 .67-4 2v2h3.5v-2c0-.75.29-1.44.75-2z" />
          <circle cx="19" cy="9" r="2" />
          <path d="M18.5 13c.46.56.75 1.25.75 2v2H23v-2c0-1.33-2.7-2-4-2z" />
        </svg>
      ),
      title: 'Visa Consultants',
      description: 'Get help with new visa applications and documentation.',
      count: '12,540 Experts',
      href: '/find-experts?category=visa-consultants'
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#ea580c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="9" y1="21" x2="15" y2="21" />
          <polygon points="5 7 2 14 8 14 5 7" />
          <polygon points="19 7 16 14 22 14 19 7" />
        </svg>
      ),
      title: 'Immigration Lawyers',
      description: 'Legal advice for complex cases and compliance.',
      count: '8,230 Lawyers',
      href: '/find-experts?category=lawyer'
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#78350f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m14 13-7.5 7.5c-.8.8-2 .8-2.8 0s-.8-2 0-2.8L11 10" />
          <path d="m16 16 3-3" />
          <path d="m8 8 3-3" />
          <path d="m9 7 8 8" />
          <path d="m21 11-8-8" />
        </svg>
      ),
      title: 'Visa Appeal Lawyers',
      description: 'Appeal refusals and resolve visa application issues.',
      count: '3,120 Lawyers',
      href: '/find-experts?category=appeal'
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#0f172a]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fillOpacity="0.7" />
        </svg>
      ),
      title: 'Education Counsellors',
      description: 'Study abroad guidance and university admissions.',
      count: '6,850 Counsellors',
      href: '/find-experts?category=education'
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#1e3a8a]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
      ),
      title: 'Work Visa Specialists',
      description: 'Work permits, sponsorships and employment visas.',
      count: '5,980 Specialists',
      href: '/find-experts?category=work'
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#0f172a]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
      title: 'Relocation Experts',
      description: 'Relocation, settlement and post-landing support.',
      count: '4,210 Experts',
      href: '/find-experts?category=relocation'
    },
  ]

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Thin & Elegant Header Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0c1a2e] tracking-tight">
            Find the Right <span className="text-blue-600 font-bold">Immigration Expert</span> for Your Needs
          </h2>
        </div>

        {/* Ultra-Thin & Slender 6-Card Single Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {categories.map((cat, i) => (
            <a
              key={i}
              href={cat.href}
              className="group flex flex-col items-center justify-between text-center p-3 rounded-xl border border-slate-200/60 bg-white hover:border-blue-400 hover:shadow-sm transition-all duration-300 cursor-pointer min-h-[148px]"
            >
              {/* Top Icon */}
              <div className="mb-1 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center h-8">
                {cat.icon}
              </div>

              {/* Title & Description */}
              <div className="flex-1 flex flex-col justify-center my-0.5 space-y-0.5">
                <h3 className="text-xs font-bold text-[#0c1a2e] group-hover:text-blue-600 transition-colors leading-tight">
                  {cat.title}
                </h3>
                <p className="text-[10px] text-slate-500 leading-snug font-normal line-clamp-2">
                  {cat.description}
                </p>
              </div>

              {/* Footer Count */}
              <div className="pt-1 w-full text-center">
                <span className="text-[10.5px] font-bold text-blue-600 block">
                  {cat.count}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center pt-1">
          <a
            href="/find-experts"
            className="inline-flex items-center justify-center px-5 py-1.5 bg-white border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg text-xs font-semibold shadow-2xs transition-all hover:scale-105"
          >
            View All Categories
          </a>
        </div>

      </div>
    </section>
  )
}
