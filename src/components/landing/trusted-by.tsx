'use client'

const partners = [
  {
    name: 'ICCRC',
    content: (
      <div className="flex items-center gap-1">
        <span className="text-xs font-bold text-gray-700 tracking-tight">iccrc</span>
        <span className="text-xs font-bold text-gray-500 tracking-tight">CNOC</span>
        <svg viewBox="0 0 16 16" fill="#dc2626" className="w-3 h-3 ml-0.5">
          <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 2a6 6 0 110 12A6 6 0 018 2z"/>
          <path d="M8 4l1 3h3l-2.5 1.8 1 3L8 10l-2.5 1.8 1-3L4 7h3z" fill="#dc2626"/>
        </svg>
      </div>
    ),
  },
  {
    name: 'SCIC',
    content: (
      <div className="flex items-center gap-1">
        <div className="text-red-600 font-bold text-sm">
          <span className="text-red-600">✦</span>
        </div>
        <span className="text-xl font-black text-gray-800 tracking-tight">SC<span className="text-red-500">i</span>C</span>
      </div>
    ),
  },
  {
    name: 'AILA',
    content: (
      <div className="flex items-center gap-1.5">
        <div className="w-7 h-7 rounded-full border-2 border-blue-700 flex items-center justify-center">
          <span className="text-[8px] font-black text-blue-700">AILA</span>
        </div>
        <div className="leading-tight">
          <p className="text-[7px] font-semibold text-gray-600 uppercase tracking-wide">American Immigration</p>
          <p className="text-[7px] font-semibold text-gray-600 uppercase tracking-wide">Lawyers Association</p>
        </div>
      </div>
    ),
  },
  {
    name: 'Law Society of Ontario',
    content: (
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-blue-700">
          <path d="M12 2L3 7v5c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7l-9-5z" fill="#1d4ed8" fillOpacity="0.15" stroke="#1d4ed8" strokeWidth="1.5"/>
          <path d="M8 12l3 3 5-5" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="leading-tight">
          <p className="text-[9px] font-bold text-gray-800">Law Society</p>
          <p className="text-[9px] text-gray-500">of Ontario</p>
        </div>
      </div>
    ),
  },
  {
    name: 'ILPA',
    content: (
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M12 2L3 7v5c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7l-9-5z" fill="#1d4ed8" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="1.5"/>
        </svg>
        <div className="leading-tight">
          <p className="text-[9px] font-black text-blue-700 tracking-widest">ILPA</p>
          <p className="text-[7px] text-gray-400 leading-tight">Immigration Law<br/>Practitioners&apos; Association</p>
        </div>
      </div>
    ),
  },
  {
    name: 'MIA',
    content: (
      <div className="flex items-center gap-1.5">
        <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center">
          <span className="text-[8px] font-black text-white">MIA</span>
        </div>
        <div className="leading-tight">
          <p className="text-[9px] font-bold text-gray-800">MIA</p>
          <p className="text-[7px] text-gray-400">Migration Institute<br/>of Australia</p>
        </div>
      </div>
    ),
  },
]

export function TrustedBy() {
  return (
    <section className="w-full py-8 px-4 bg-gray-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-gray-500 font-medium mb-6">
          Trusted by Government Registered Professionals &amp; Leading Organizations
        </p>

        {/* Mobile: 2x3 grid with See all partners below */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {partners.map((p, i) => (
              <div key={i} className="flex items-center justify-center py-3 px-2">
                {p.content}
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="#" className="text-blue-600 text-xs font-medium hover:underline inline-flex items-center gap-0.5">
              See all partners
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Desktop: horizontal row with inline See all partners */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {partners.map((p, i) => (
            <div key={i} className="flex-1 flex items-center justify-center py-3 px-2">
              {p.content}
            </div>
          ))}

          <a href="#" className="flex-shrink-0 text-blue-600 text-xs font-medium hover:underline whitespace-nowrap flex items-center gap-0.5">
            See all partners
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
