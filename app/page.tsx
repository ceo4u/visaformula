"use client";

import { motion } from "framer-motion";
import { ChevronRight, Star, School, Briefcase, Map, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VisaDropdown } from "@/components/shared/visa-dropdown";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { icon: School, title: "Student Visa", description: "Pursue your academic dreams in top-tier global universities.", color: "bg-blue-50 text-blue-600", href: "/visa-finder?type=Student" },
  { icon: Briefcase, title: "Work Visa", description: "Expert assistance for skilled worker permits and corporate sponsorship.", color: "bg-blue-50 text-blue-600", href: "/visa-finder?type=Work" },
  { icon: Map, title: "Tourist Visa", description: "Seamless travel authorizations for leisure, visiting family, or short-term stays.", color: "bg-blue-50 text-blue-600", href: "/visa-finder?type=Tourist" },
  { icon: Building2, title: "Business Visa", description: "Strategic migration solutions for entrepreneurs and investors.", color: "bg-blue-50 text-blue-600", href: "/visa-finder?type=Business" },
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
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-fixed/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-fixed text-on-secondary-fixed rounded-full text-sm font-medium">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              Trusted by 10,000+ applicants
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Apply Visa <span className="text-primary">Smarter.</span><br />Faster. Safer.
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
              Check eligibility, connect experts, and track your visa — all in one place with our Digital Diplomat platform.
            </p>
            <VisaDropdown />
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-muted overflow-hidden">
                    {/* Using standard img to avoid Next.js external image host configuration errors */}
                    <img src={src} alt={`User ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-on-surface-variant">Join 10k+ successful migrants</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative h-full flex items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative w-full aspect-[6/5]">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI7rJqGAw2NqULAym8wLwkhfK-zyUcc8o-QOctmGCkLZhavt11WfeEaW-77RElvAsFo6DK4mIBk3K0q-JU6o3CPgdx46tkxjaGvnBPtEPA5t08jhKDr43GioTQ6ahCUoaeJwwEqZnRCUze1K-Tfp63_G59LXl6yGjlAyGMM93x4qJFuvqBwhfJdjZ4vz71RQ4T5LIS4Dl91-dH5uvvL2O8RShO9f9DuEhaDTSzWYUCoE2zVdJuKC6lO9oGwjyIDcLhVD30RcjaVBuv" alt="Flight wing" className="object-cover w-full h-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Choose Your Pathway</h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}>
                <Link href={cat.href}>
                  <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full border-none">
                    <CardContent className="p-6 flex flex-col items-start h-full">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${cat.color} group-hover:bg-primary group-hover:text-white transition-colors`}>
                        <cat.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">{cat.description}</p>
                      <Button variant="link" className="mt-auto p-0 text-primary font-bold gap-1 group-hover:gap-2 transition-all">
                        Explore <ChevronRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Consultants Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Top Rated Immigration Experts</h2>
              <p className="text-on-surface-variant mt-2">Verified legal professionals with 99% success rates.</p>
            </div>
            <Button variant="ghost" className="text-primary font-bold gap-2" asChild>
              <Link href="/find-lawyer">View All Experts <ChevronRight className="w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experts.map((expert, idx) => (
              <motion.div key={expert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}>
                <Card className="overflow-hidden hover:shadow-xl transition-all h-full flex flex-col border-none bg-surface-container-lowest shadow-[0_12px_40px_rgba(19,27,46,0.06)]">
                  <div className="relative h-64 mx-6 mt-6 rounded-2xl overflow-hidden">
                    <img src={expert.image} alt={expert.name} className="object-cover w-full h-full" />
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {expert.rating} ({expert.reviews} reviews)
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold">{expert.name}</h3>
                    <p className="text-on-surface-variant text-sm mb-4">{expert.title}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t">
                      <span className="text-lg font-black">${expert.price}<span className="text-xs font-normal text-on-surface-variant">/consultation</span></span>
                      <Button asChild>
                        <Link href={`/find-lawyer/${idx + 1}`}>Book Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-primary relative overflow-hidden p-12 md:p-20 text-center md:text-left">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Need urgent visa help?</h2>
              <p className="text-primary-fixed text-xl max-w-xl">Our emergency response team is available 24/7 to handle visa rejections, expiration issues, and legal appeals.</p>
            </div>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-primary-fixed shadow-2xl py-8 px-10 rounded-2xl text-lg font-black" asChild>
              <Link href="/emergency">Talk to Expert Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
