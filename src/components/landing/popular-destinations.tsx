'use client'

const destinations = [
  {
    flagCode: 'ca',
    country: 'Canada',
    services: ['Visitor Visa', 'Student Visa', 'PR Visa', 'Work Permit'],
    from: 'From $49',
    experts: '2,350 Experts',
  },
  {
    flagCode: 'us',
    country: 'USA',
    services: ['Visitor Visa', 'Student Visa', 'PR Visa', 'Work Permit'],
    from: 'From $59',
    experts: '4,120 Experts',
  },
  {
    flagCode: 'gb',
    country: 'UK',
    services: ['Visitor Visa', 'Student Visa', 'PR Visa', 'Work Permit'],
    from: 'From $45',
    experts: '3,120 Experts',
  },
  {
    flagCode: 'au',
    country: 'Australia',
    services: ['Visitor Visa', 'Student Visa', 'PR Visa', 'Work Permit'],
    from: 'From $55',
    experts: '2,780 Experts',
  },
  {
    flagCode: 'de',
    country: 'Germany',
    services: ['Visitor Visa', 'Student Visa', 'PR Visa', 'Work Permit'],
    from: 'From $45',
    experts: '1,980 Experts',
  },
  {
    flagCode: 'ae',
    country: 'UAE',
    services: ['Visitor Visa', 'Student Visa', 'PR Visa', 'Work Permit'],
    from: 'From $40',
    experts: '1,650 Experts',
  },
]

export function PopularDestinations() {
  return (
    <section className="w-full py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Popular Destinations</h2>
          <a href="#" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-0.5">
            View all countries
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
          </a>
        </div>

        {/* Cards — 2-col grid on mobile, flex row on desktop */}
        <div className="relative">
          <div className="grid grid-cols-2 md:flex md:items-stretch gap-3" style={{ alignItems: 'stretch' }}>
            {destinations.map((dest, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer md:flex-1 md:min-w-0"
                style={{ minHeight: 200 }}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('select-visa-country', { detail: dest.country }));
                  document.getElementById('search-panel')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {/* Flag + Country */}
                <div className="flex items-center gap-2">
                  <img
                    src={`https://flagcdn.com/w80/${dest.flagCode}.png`}
                    srcSet={`https://flagcdn.com/w160/${dest.flagCode}.png 2x`}
                    alt={dest.country}
                    width={48}
                    height={32}
                    className="rounded object-cover flex-shrink-0 shadow-sm border border-gray-100"
                    style={{ width: 48, height: 32 }}
                  />
                  <span className="text-sm font-bold text-gray-900 leading-tight">{dest.country}</span>
                </div>

                {/* Services */}
                <ul className="space-y-1 flex-1">
                  {dest.services.map((s, j) => (
                    <li key={j} className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0 inline-block" />
                      {s}
                    </li>
                  ))}
                </ul>

                {/* From price */}
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5">{dest.from}</p>
                  <p className="text-sm font-bold text-blue-600">{dest.experts}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right chevron button — hidden on mobile */}
          <button className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-blue-200 bg-white shadow-sm items-center justify-center hover:border-blue-400 transition-colors z-10">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-500">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
