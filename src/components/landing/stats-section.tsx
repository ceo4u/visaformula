'use client'


const stats = [
  { number: '150+',      label: 'Countries',       blue: true },
  { number: '25,000+',   label: 'Verified Experts', blue: true },
  { number: '500,000+',  label: 'Happy Clients',    blue: true },
  { number: '98%',       label: 'Success Rate',     blue: false },
  { number: '4.8/5',     label: 'Average Rating',   blue: false, star: true },
]

export function StatsSection() {
  return (
    <section className="w-full py-10 px-4 bg-[#eef4fb]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6">

          {/* Globe / world map image — hidden on mobile */}
          <div className="hidden md:block flex-shrink-0 w-28 h-28 relative opacity-80">
            <img
              src="/world-map.png"
              alt="Global reach"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Stats — 2-col grid on mobile, 5-col on desktop (no dividers on mobile) */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 md:divide-x md:divide-gray-300">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`flex flex-col items-center justify-center px-4 py-2 text-center ${
                  i === 4 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className={`text-2xl md:text-3xl font-extrabold leading-tight ${stat.blue ? 'text-blue-600' : 'text-gray-900'}`}>
                  {stat.number}
                </div>
                <p className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</p>
                {stat.star && (
                  <div className="mt-1">
                    <svg viewBox="0 0 20 20" fill="#f59e0b" className="w-5 h-5 inline-block">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
