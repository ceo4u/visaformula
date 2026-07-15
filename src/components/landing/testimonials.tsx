'use client'

import { useState } from 'react'

const testimonials = [
  {
    name: 'Priya S.',
    service: 'Canada PR Visa',
    quote: '"VisaFormula connected me with an amazing immigration lawyer who won my visa appeal. Highly recommended platform!"',
    avatar: '/priya.png',
    rating: 5,
  },
  {
    name: 'Rahul M.',
    service: 'UK Student Visa',
    quote: '"Professional, knowledgeable and transparent. My student visa process for the UK was smooth! because of their expert guidance."',
    avatar: '/rahul.png',
    rating: 5,
  },
  {
    name: 'Ayesha K.',
    service: 'USA Visa Appeal',
    quote: '"I found the right lawyer for my deportation case. They saved my future. Thank you VisaFormula!!"',
    avatar: '/ayesha.png',
    rating: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="#f59e0b" className="w-4 h-4">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1))
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1))

  // Show 3 at a time (desktop), cycled
  const visible = [
    testimonials[active % testimonials.length],
    testimonials[(active + 1) % testimonials.length],
    testimonials[(active + 2) % testimonials.length],
  ]

  // Single card shown on mobile
  const mobileCard = testimonials[active % testimonials.length]

  return (
    <section className="w-full py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Trusted by Thousands Worldwide
        </h2>

        <div className="relative flex items-center gap-4">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 bg-white shadow-sm flex items-center justify-center hover:border-blue-400 transition-colors z-10"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Mobile: show 1 card */}
          <div className="flex-1 md:hidden">
            <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={mobileCard.avatar}
                  alt={mobileCard.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                  <p className="text-sm font-bold text-gray-900">{mobileCard.name}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed flex-1">{mobileCard.quote}</p>
              <div>
                <StarRating count={mobileCard.rating} />
                <p className="text-xs text-gray-400 mt-1">{mobileCard.service}</p>
              </div>
            </div>
          </div>

          {/* Desktop: show 3 cards */}
          <div className="hidden md:grid flex-1 grid-cols-3 gap-4">
            {visible.map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs text-gray-600 leading-relaxed flex-1">{t.quote}</p>

                {/* Stars + service */}
                <div>
                  <StarRating count={t.rating} />
                  <p className="text-xs text-gray-400 mt-1">{t.service}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-blue-300 bg-white shadow-sm flex items-center justify-center hover:border-blue-500 transition-colors z-10"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-500">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
