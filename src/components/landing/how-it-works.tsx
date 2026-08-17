'use client'

const steps = [
  {
    number: '1',
    title: 'Search & Compare',
    description: 'Find and compare verified experts based on your needs.',
    bgColor: '#1e3a5f',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <circle cx="15" cy="15" r="8" stroke="white" strokeWidth="2.5"/>
        <line x1="21" y1="21" x2="30" y2="30" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
        <line x1="11" y1="15" x2="19" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="15" y1="11" x2="15" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Connect Securely',
    description: 'Chat, call or book a consultation with your preferred expert.',
    bgColor: '#0891b2',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M5 8h18a2 2 0 012 2v10a2 2 0 01-2 2H10l-5 4V10a2 2 0 012-2z" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="11" cy="14" r="1.5" fill="white"/>
        <circle cx="16" cy="14" r="1.5" fill="white"/>
        <circle cx="21" cy="14" r="1.5" fill="white"/>
        <path d="M14 22v3a2 2 0 002 2h12l4 3V25a2 2 0 00-2-2H14z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Get Expert Guidance',
    description: 'Share documents and get personalized legal or visa advice.',
    bgColor: '#16a34a',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <rect x="6" y="3" width="20" height="26" rx="2" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
        <line x1="10" y1="10" x2="22" y2="10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="10" y1="15" x2="22" y2="15" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="10" y1="20" x2="16" y2="20" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="27" cy="27" r="7" fill="#16a34a" stroke="white" strokeWidth="1.5"/>
        <path d="M23.5 27l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '4',
    title: 'Take Action',
    description: "Follow the expert's guidance and submit with confidence.",
    bgColor: '#1d4ed8',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <rect x="5" y="4" width="22" height="28" rx="2" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2"/>
        <path d="M10 12l2.5 2.5L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="20" y1="11.5" x2="25" y2="11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 19l2.5 2.5L18 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="20" y1="18.5" x2="25" y2="18.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 26l2.5 2.5L18 23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="20" y1="25.5" x2="25" y2="25.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '5',
    title: 'Achieve Your Goal',
    description: 'Track progress and achieve your immigration goals.',
    bgColor: '#16a34a',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <circle cx="18" cy="18" r="13" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2.2"/>
        <path d="M11 18l5 5 9-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export function HowItWorks() {
  return (
    <section className="w-full pt-6 pb-6 sm:pt-8 sm:pb-8 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl md:text-[26px] font-bold text-gray-900">
            How <span className="text-blue-600">TravlTik</span> Works
          </h2>
        </div>

        {/* Steps — 2-column grid on mobile, horizontal row on desktop */}
        <div className="grid grid-cols-2 md:flex md:flex-row md:items-start md:justify-between gap-x-4 gap-y-6 md:gap-0">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`flex flex-col gap-1 md:flex-row md:items-start ${
                i === 4 ? 'col-span-2 items-center text-center mt-2 md:mt-0 md:items-start md:text-left' : 'items-start'
              }`}
            >
              {/* Step content */}
              <div className={`flex flex-col md:max-w-[140px] ${
                i === 4 ? 'items-center text-center md:items-start md:text-left' : 'items-start'
              }`}>
                {/* Icon circle with number badge */}
                <div className="relative mb-3 flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: step.bgColor }}
                  >
                    {step.icon}
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#1e3a5f] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow — hidden on mobile, shown on desktop between steps */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex flex-shrink-0 mx-3 mt-5 text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
