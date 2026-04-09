"use client";

import { motion } from "framer-motion";
import { ChevronRight, Star, School, Briefcase, Map, Building2, Verified, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VisaDropdown } from "@/components/shared/visa-dropdown";
import Link from "next/link";

const categories = [
  { icon: School, title: "Student Visa", description: "Pursue your academic dreams in top-tier global universities.", href: "/find-lawyer" },
  { icon: Briefcase, title: "Work Visa", description: "Expert assistance for skilled worker permits and corporate sponsorship.", href: "/find-lawyer" },
  { icon: Map, title: "Tourist Visa", description: "Seamless travel authorizations for leisure, visiting family, or short-term stays.", href: "/find-lawyer" },
  { icon: Building2, title: "Business Visa", description: "Strategic migration solutions for entrepreneurs and investors.", href: "/find-lawyer" },
];

const experts = [
  { name: "Sarah Chen", title: "US & Canada Specialist", rating: 4.9, reviews: "1.2k", price: 150, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChSUlx7q3P-ETkNBffVugyiwSfsIehxnzPZJxZNdvzc1mNeWjnnav6m27_W4-66qvGPZqoKsgnJerNDkZRhjsYmxtJ79L0j0L3EAepjx97cR7KONQ5e-BSTYtrCCIjgoIHM4EX1EFF0JNEu3QZce5KHS9QOFj9eA1w_F9iIDvOktFO0Q8SjCYe2tgzstC_tCwybq0sCv_AszXDk0ghCnWjb6PtTtmJiWuZnTSnZ2GVkujef7PL4Mu73C6AaJgk8PoWm5XS5r7iIcPu", href: "/find-lawyer/1" },
  { name: "Marcus Holloway", title: "EU & UK Business Specialist", rating: 4.9, reviews: "850", price: 185, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4_fKcUMyIWid-Vp3Xf0nEnJd8oJ3ZTzC03hy0q-dhYm7ocjNAjRcDM-tynBekMCGDR_7kJ_foOr3ulc8EZzED19yzukcb0FWdYDCVOWUN6YEiXNQu5oGQsUOwsaMpsJ2ThAjVld4PTvzxq7Bwd-mwplYcl6F1zUsaTYy6daZTWscDpDrm3-XtkUIhC8zHTXalycWMAZ2U6m8RC3O8z_uf9lg4L6xlX3wFdnuhPDSFllaDTlEkblZ7P1KE0PqA94ppjkoMvb8neAxY", href: "/find-lawyer/2" },
  { name: "Dr. Elena Rodriguez", title: "Permanent Residency Expert", rating: 5.0, reviews: "2k+", price: 210, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG0Uz-SpYNnszLHcXwl5ZQIn_76-C4qptVsEfLoGXaSI9LsDIcdnSLUbnWZ3m-cbTgMsWHQSGFwOPtWgIbAQB65mrY6_bS2nH31s0CAj3X29xqe6EhwAcGJoid0oOGZF2kehISqs06jBHGelmdiDZt0472B1GXZet2VihjYfI7srDs1YGx-kTH5XJsnEHOJ0GSKcIUrdgLJ2cYTRkH5JqgPi2A1fWAAJxPJDHbCTaQrgVOJQoJjP9lYF-3j1TN7QrM1rWt3gSixFeK", href: "/find-lawyer/3" },
];

const avatars = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCPX5DdMioKPF507Mg3uao_AKD7Y3D0cr4Oxpjz4j9Zhvn61dy6OJs_n9QaPUnw16htoJMGcQD5P48-Iiv7vxYN7ldHTnhRhVZcJD6vIDKa8nDLb457YmRDk8yMBA54syMEntEGlBvXj7AArUmykZR1L8yeGJ80eTIHcxGbTpw179ybHlUG-c9pydM6kYBqpeeOuXkS7JQZYR50642AqYN6oq9VYLrzRuhFithlymj6S07GbapH1EGotT-47tHyl3bgeiYhNPV4xWaW",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDDZxmleQxRiDSZVjffvePEDs4y4voorzfZuSjxJkHHZwdEQVt-tUSw3Tn_DDkkQUA-v52HjraDZ8Y44RHi-tJBnHUhci1aS-6g-iwrvojPWdGPYFKTd0Y6XAH9VUtXumTcdVdf5O4ZpLGXsOBny6SX8CL6S-SCPGm1KihzJR4VfyEa_YBQHkUzCkvbJcZhMOa81r_dravL_oDj9c5jjXx4UH_s_KTOeGZK_r2bfUOV2Yghpoc90VqJ6Bsw0mg7ABA9zqpawiZY4zn2",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Wwi95LSKg3RMtydQX6YvCSPeuzcDOj5hWKgtTuZ-0BCIDD7zL1vytIhVJuFSACGkDOb56RRFEUPzkKlf_swkErAH6JMrNJ4LkJOty4wRe3gjGJCZQt51lEZmYONOmaYrGTP3DY7MDhJBtLz8Fsp8L9nQv2DFaZkwd9rGbYqBQJNk8ad6-i3ejo_N__ZRaC-ugppxRT3bQrU3n1ctZsjGtwSKr9U9fOHIg2s2E7FExx-DcCi87GfA5GEYGpqUzvZ7FGpcM6KzFd2C"
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section — Novaire Aesthetic */}
      <section className="relative lg:pt-32 lg:pb-20 pt-24 pb-16 overflow-hidden bg-[#FAFAFA]">
        <div className="grid lg:grid-cols-2 max-w-7xl z-10 mx-auto px-6 relative gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-slate-200/80 backdrop-blur-md rounded-full shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] text-sm font-medium text-slate-600 mb-8">
              <Verified className="w-4 h-4 text-[#5B58F6]" />
              Trusted by 10,000+ applicants
            </div>

            <h1 className="lg:text-8xl text-7xl leading-[1.1] font-light text-slate-900 tracking-tighter font-serif mb-8">
              Apply visa
              <br />
              <span className="italic text-[#5B58F6]">smarter.</span>
            </h1>

            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl font-light tracking-tight">
              Connect with experts and track your visa — all in one place with our Digital Diplomat platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 sm:items-center items-start mb-10">
              <Link
                href="/find-lawyer"
                className="group inline-flex items-center gap-2.5 text-white text-base font-medium tracking-wide bg-slate-900 hover:bg-[#5B58F6] px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_12px_24px_-6px_rgba(91,88,246,0.35)] hover:-translate-y-0.5 active:scale-95"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/support"
                className="group px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 text-base font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow active:scale-95"
              >
                Our services
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                    <img src={src} alt={`User ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-slate-500">Join 10k+ successful migrants</p>
            </div>
          </motion.div>

          {/* Right — Animated Plane Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-full flex items-center"
          >
            <div className="rounded-[2rem] overflow-hidden relative w-full aspect-[6/5] border border-slate-200/60"
              style={{
                boxShadow: "0 30px 60px -15px rgba(15,23,42,0.10), 0 10px 24px -10px rgba(15,23,42,0.08), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.04)",
                background: "linear-gradient(180deg, #1e3a5f 0%, #3b82f6 30%, #93c5fd 55%, #dbeafe 75%, #f0f9ff 100%)"
              }}
            >
              {/* Stars */}
              <div className="absolute top-4 left-[10%] w-1 h-1 rounded-full bg-white/60 animate-pulse" />
              <div className="absolute top-8 left-[25%] w-0.5 h-0.5 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-6 right-[20%] w-1 h-1 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '0.5s' }} />

              {/* Sun glow */}
              <div className="absolute bottom-[30%] right-[15%] w-20 h-20 rounded-full bg-gradient-to-t from-amber-300/80 to-yellow-200/40 blur-xl" />
              <div className="absolute bottom-[32%] right-[17%] w-10 h-10 rounded-full bg-amber-200/90 blur-sm" />

              {/* Cloud 1 — slow drift */}
              <div className="absolute top-[35%] opacity-80" style={{ animation: 'cloudDrift 20s linear infinite' }}>
                <svg width="160" height="60" viewBox="0 0 160 60" fill="none">
                  <ellipse cx="80" cy="40" rx="70" ry="20" fill="white" fillOpacity="0.7" />
                  <ellipse cx="60" cy="30" rx="40" ry="22" fill="white" fillOpacity="0.8" />
                  <ellipse cx="100" cy="28" rx="35" ry="20" fill="white" fillOpacity="0.75" />
                  <ellipse cx="80" cy="22" rx="30" ry="18" fill="white" fillOpacity="0.85" />
                </svg>
              </div>

              {/* Cloud 2 — faster drift */}
              <div className="absolute top-[55%] opacity-60" style={{ animation: 'cloudDrift 14s linear infinite', animationDelay: '-5s' }}>
                <svg width="120" height="50" viewBox="0 0 120 50" fill="none">
                  <ellipse cx="60" cy="35" rx="55" ry="15" fill="white" fillOpacity="0.6" />
                  <ellipse cx="45" cy="25" rx="32" ry="18" fill="white" fillOpacity="0.7" />
                  <ellipse cx="75" cy="22" rx="28" ry="16" fill="white" fillOpacity="0.65" />
                </svg>
              </div>

              {/* Cloud 3 — bottom */}
              <div className="absolute top-[72%] opacity-50" style={{ animation: 'cloudDrift 25s linear infinite', animationDelay: '-12s' }}>
                <svg width="200" height="50" viewBox="0 0 200 50" fill="none">
                  <ellipse cx="100" cy="35" rx="90" ry="15" fill="white" fillOpacity="0.5" />
                  <ellipse cx="70" cy="25" rx="50" ry="18" fill="white" fillOpacity="0.6" />
                  <ellipse cx="130" cy="22" rx="45" ry="16" fill="white" fillOpacity="0.55" />
                </svg>
              </div>

              {/* ✈️ Animated Plane */}
              <div className="absolute" style={{ animation: 'planeFly 6s ease-in-out infinite', top: '30%', left: '25%' }}>
                <svg width="160" height="80" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }}>
                  {/* Fuselage */}
                  <ellipse cx="80" cy="40" rx="65" ry="12" fill="white" />
                  <ellipse cx="80" cy="40" rx="65" ry="12" fill="url(#fuselageGrad)" />
                  {/* Nose */}
                  <path d="M145 40 L158 38 L155 40 L158 42 Z" fill="#e2e8f0" />
                  {/* Window strip */}
                  <rect x="40" y="36" width="70" height="3" rx="1.5" fill="#5B58F6" fillOpacity="0.3" />
                  {/* Windows */}
                  {[45, 52, 59, 66, 73, 80, 87, 94, 101].map((x, i) => (
                    <circle key={i} cx={x} cy="37.5" r="1.8" fill="#5B58F6" fillOpacity="0.6" />
                  ))}
                  {/* Cockpit window */}
                  <path d="M140 36 Q148 37 148 40 Q148 43 140 44 Z" fill="#93c5fd" fillOpacity="0.8" />
                  {/* Left wing */}
                  <path d="M60 42 L40 70 L95 48 Z" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5" />
                  <path d="M60 42 L40 70 L95 48 Z" fill="url(#wingGrad)" />
                  {/* Right wing */}
                  <path d="M60 38 L40 10 L95 32 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5" />
                  {/* Tail */}
                  <path d="M20 40 L10 20 L30 35 Z" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5" />
                  <path d="M20 40 L15 55 L30 45 Z" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5" />
                  {/* Engine */}
                  <ellipse cx="72" cy="52" rx="8" ry="4" fill="#cbd5e1" />
                  <ellipse cx="72" cy="28" rx="8" ry="4" fill="#cbd5e1" />
                  <defs>
                    <linearGradient id="fuselageGrad" x1="15" y1="28" x2="145" y2="52">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                    <linearGradient id="wingGrad" x1="40" y1="70" x2="95" y2="42">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="100%" stopColor="#f8fafc" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Contrails */}
                <div className="absolute top-[42%] -left-12 w-16 h-[2px] rounded-full bg-white/30" style={{ animation: 'contrailFade 2s ease-out infinite' }} />
                <div className="absolute top-[50%] -left-16 w-20 h-[1.5px] rounded-full bg-white/20" style={{ animation: 'contrailFade 2.5s ease-out infinite', animationDelay: '0.3s' }} />
              </div>

              {/* CSS Animations */}
              <style>{`
                @keyframes planeFly {
                  0%, 100% { transform: translateY(0px) translateX(0px) rotate(-2deg); }
                  25% { transform: translateY(-12px) translateX(8px) rotate(-1deg); }
                  50% { transform: translateY(-6px) translateX(15px) rotate(-3deg); }
                  75% { transform: translateY(-15px) translateX(5px) rotate(-1.5deg); }
                }
                @keyframes cloudDrift {
                  0% { transform: translateX(-200px); }
                  100% { transform: translateX(calc(100vw + 200px)); }
                }
                @keyframes contrailFade {
                  0% { opacity: 0.4; width: 60px; }
                  100% { opacity: 0; width: 100px; }
                }
              `}</style>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6 border-t border-slate-200/60" style={{ backgroundColor: '#e2e8f0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-slate-800 mb-6 font-serif">
              Choose your <span className="italic text-[#5B58F6]">pathway</span>
            </h2>
            <p className="text-xl text-slate-500 font-light leading-relaxed">
              From student permits to business visas, we provide end-to-end solutions for every migration journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}>
                <Link href={cat.href}>
                  <div className="group bg-white rounded-[2rem] border border-slate-200/80 p-8 h-full cursor-pointer transition-all duration-500 hover:-translate-y-1"
                    style={{
                      boxShadow: "inset 0 2px 4px rgba(255,255,255,1), inset 0 -1px 2px rgba(0,0,0,0.02), 0 20px 40px -10px rgba(99, 102, 241, 0.06), 0 10px 20px -5px rgba(0,0,0,0.03)"
                    }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#5B58F6]/10 text-[#5B58F6] group-hover:bg-[#5B58F6] group-hover:text-white transition-colors duration-300"
                      style={{
                        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.04)"
                      }}
                    >
                      <cat.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-medium text-slate-900 mb-3 tracking-tight font-serif">{cat.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">{cat.description}</p>
                    <span className="inline-flex items-center gap-2 text-[#5B58F6] text-sm font-medium group-hover:gap-3 transition-all">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Consultants Section */}
      <section className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-slate-900 font-serif leading-tight">
                Top rated <span className="italic text-[#5B58F6]">experts</span>
              </h2>
              <p className="text-slate-500 text-lg mt-4 font-light">Verified legal professionals with 99% success rates.</p>
            </div>
            <Link
              href="/find-lawyer"
              className="inline-flex items-center gap-2 text-[#5B58F6] text-sm font-medium hover:gap-3 transition-all"
            >
              View All Experts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experts.map((expert, idx) => (
              <motion.div key={expert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}>
                <div className="bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden h-full flex flex-col group transition-all duration-500 hover:-translate-y-1"
                  style={{
                    boxShadow: "inset 0 2px 4px rgba(255,255,255,1), inset 0 -1px 2px rgba(0,0,0,0.02), 0 20px 40px -10px rgba(99, 102, 241, 0.06), 0 10px 20px -5px rgba(0,0,0,0.03)"
                  }}
                >
                  <div className="relative h-64 mx-5 mt-5 rounded-[1.5rem] overflow-hidden">
                    <img src={expert.image} alt={expert.name} className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105" />
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium shadow-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {expert.rating} ({expert.reviews})
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-medium text-slate-900 tracking-tight font-serif">{expert.name}</h3>
                    <p className="text-slate-500 text-sm mt-1 mb-4">{expert.title}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/60">
                      <span className="text-xl font-medium text-slate-900 tracking-tight">${expert.price}<span className="text-xs font-normal text-slate-400 ml-1">/consultation</span></span>
                      <Link
                        href={`/find-lawyer/${idx + 1}`}
                        className="inline-flex items-center gap-2 bg-[#5B58F6] hover:bg-[#4845d9] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] relative overflow-hidden p-12 md:p-20 text-center md:text-left border border-slate-200/60"
          style={{
            background: "linear-gradient(135deg, #f8fafc 0%, #f5f3ff 100%)",
            boxShadow: "0 20px 40px -10px rgba(99,102,241,0.08), inset 0 2px 4px rgba(255,255,255,0.8)"
          }}
        >
          <div className="absolute -top-1/2 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(91,88,246,0.06)_0,transparent_50%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-6 font-serif leading-tight">
                Need urgent visa <span className="italic text-[#5B58F6]">help?</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-xl font-light leading-relaxed">
                Our emergency response team is available 24/7 to handle visa rejections, expiration issues, and legal appeals.
              </p>
            </div>
            <Link
              href="/emergency"
              className="group inline-flex items-center gap-3 bg-slate-900 hover:bg-[#5B58F6] text-white text-base font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_12px_24px_-6px_rgba(91,88,246,0.35)] hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
            >
              Talk to Expert Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
