"use client";

import { motion } from "framer-motion";
import { Search, Star, Shield, TrendingUp, ChevronRight, Smartphone, Play, Gavel, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const experts = [
  { name: "Marcus Thorne, JD", role: "Immigration Attorney · $$$", rating: 4.5, reviews: 142, location: "New York, NY", distance: "0.8 mi", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face" },
  { name: "Elena Rodriguez", role: "Work Visa Specialist · $$", rating: 5.0, reviews: 89, location: "Brooklyn, NY", distance: "2.1 mi", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face" },
  { name: "Beacon Global Services", role: "Full Service Agency · $$$", rating: 4.0, reviews: 210, location: "Queens, NY", distance: "4.5 mi", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop&crop=face" },
  { name: "Chen Wei Law Group", role: "PR & Green Card · $$$$", rating: 5.0, reviews: 34, location: "Jersey City, NJ", distance: "6.2 mi", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" },
];

const emergencyExperts = [
  { name: "Swift Visa Appeals", desc: "Specializes in last-minute rejection appeals.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200&h=200&fit=crop" },
  { name: "24/7 Detention Legal", desc: "Round-the-clock emergency legal assistance.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop" },
  { name: "Metro Passport Express", desc: "Same-day document processing & courier.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&h=200&fit=crop" },
];

function StarRating({ rating, size = "text-lg" }: { rating: number; size?: string }) {
  return (
    <div className="flex text-primary">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${size === "text-lg" ? "w-[18px] h-[18px]" : "w-4 h-4"}`}
          fill={i <= Math.floor(rating) ? "currentColor" : i - 0.5 <= rating ? "url(#half)" : "none"}
          stroke="currentColor"
          strokeWidth={i <= rating ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="text-on-surface">
      {/* HERO SECTION */}
      <section className="relative h-[480px] w-full flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&h=800&fit=crop"
            alt="City skyline"
          />
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto mt-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight font-heading drop-shadow-lg"
          >
            Navigate your immigration <br />journey with confidence.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/90 text-lg md:text-xl font-medium mb-10 drop-shadow max-w-2xl mx-auto"
          >
            Connect with verified legal professionals and simplify your path forward.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row w-full max-w-[600px] h-14 mx-auto bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl p-1"
          >
            <input
              className="flex-1 border-none px-6 focus:ring-0 text-base bg-transparent text-on-surface placeholder:text-on-surface-variant font-medium"
              placeholder="What do you need help with?"
              type="text"
            />
            <button className="bg-primary text-white font-bold px-8 rounded-xl hover:bg-primary/80 transition-all flex items-center justify-center shadow-sm">
              Search
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-6 text-white font-medium text-sm"
          >
            <Link href="/find-lawyer" className="flex items-center gap-2 hover:text-primary-container transition-colors drop-shadow"><Gavel className="w-4 h-4" /> Lawyers</Link>
            <Link href="/find-lawyer" className="flex items-center gap-2 hover:text-primary-container transition-colors drop-shadow"><span>🎓</span> Study</Link>
            <Link href="/find-lawyer" className="flex items-center gap-2 hover:text-primary-container transition-colors drop-shadow"><span>💼</span> Work</Link>
          </motion.div>
        </div>
      </section>

      {/* CATEGORY BROWSE */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-sm font-black tracking-[0.2em] text-neutral-500 mb-6 uppercase font-heading">Browse Visa Services</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {["🎓 Study Visa", "💼 Work Visa", "🌍 Tourist Visa", "🏠 PR / Green Card", "⚖️ Lawyers", "📄 Document Help", "🆘 Emergency", "🗓️ Biometrics"].map((cat) => (
            <button key={cat} className="flex items-center gap-2 bg-white border border-neutral-200 px-5 py-2.5 rounded-full shadow-editorial hover:shadow-editorial-lg transition-all whitespace-nowrap text-on-surface font-bold text-sm">
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* EXPERTS GRID */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-on-surface font-heading">Top rated experts near you</h2>
          <Link href="/find-lawyer" className="text-secondary font-bold hover:underline text-sm">See all experts</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map((expert, idx) => (
            <motion.div
              key={expert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/lawyer/${idx + 1}`} className="block">
                <div className="bg-surface-container-lowest rounded-xl shadow-editorial hover:shadow-editorial-lg transition-all overflow-hidden flex flex-col group">
                  <div className="h-48 overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={expert.image} alt={expert.name} />
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="text-lg font-bold mb-1 font-heading">{expert.name}</h3>
                    <div className="flex items-center gap-1 mb-1">
                      <StarRating rating={expert.rating} size="text-sm" />
                      <span className="text-sm text-neutral-500">({expert.reviews})</span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4">{expert.role}</p>
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400">
                      <span>{expert.location}</span>
                      <span>{expert.distance}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EMERGENCY ROW */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-black text-on-surface font-heading mb-8">Emergency ready</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emergencyExperts.map((e) => (
            <div key={e.name} className="bg-surface-container flex items-center p-4 rounded-xl hover:bg-surface-container-high transition-colors">
              <div className="w-20 h-20 rounded-lg mr-4 flex-shrink-0 overflow-hidden">
                <img className="w-full h-full object-cover rounded-lg" src={e.image} alt={e.name} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm">{e.name}</h3>
                  <span className="bg-tertiary text-white text-[10px] font-black uppercase px-2 py-0.5 rounded leading-tight">Open now</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-y border-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { icon: Shield, title: "KYC Verified", desc: "Every expert undergoes a rigorous 5-step background and license check." },
            { icon: TrendingUp, title: "100% Success Focus", desc: "We prioritize experts with a proven track record of successful outcomes." },
            { icon: Shield, title: "VisaHub Shield", desc: "Your payments are protected until your consultation is completed and reviewed." },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-black mb-2 font-heading">{item.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* APP DOWNLOAD CTA */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="bg-primary rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative shadow-xl">
          <div className="flex-1 text-white relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight font-heading">Expert Advice, <br />In Your Pocket.</h2>
            <p className="text-lg opacity-90 mb-10 max-w-md">Download the VisaHub app to chat with experts, track your visa status, and get real-time emergency support.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 border border-neutral-800 hover:bg-neutral-900 transition-colors">
                <Smartphone className="w-7 h-7" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold opacity-60">Download on the</div>
                  <div className="text-lg font-bold leading-tight">App Store</div>
                </div>
              </button>
              <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 border border-neutral-800 hover:bg-neutral-900 transition-colors">
                <Play className="w-7 h-7" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold opacity-60">Get it on</div>
                  <div className="text-lg font-bold leading-tight">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          {/* Decorative */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        </div>
      </section>
    </div>
  );
}
