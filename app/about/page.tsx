"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Users, Award, Clock, Lock, ChevronRight, Star, TrendingUp, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const stats = [
    { value: "500+", label: "Verified Legal Experts", icon: Users },
    { value: "10,000+", label: "Successful Applications", icon: Briefcase },
    { value: "98%", label: "Satisfaction Rate", icon: Star },
    { value: "24/7", label: "Emergency Support", icon: Clock },
];

const values = [
    {
        title: "Transparency First",
        description: "No hidden fees, no surprises. Every cost is disclosed upfront with complete clarity.",
        icon: Shield,
    },
    {
        title: "Global Accessibility",
        description: "Bridging borders with technology. We make expert immigration help available worldwide.",
        icon: Globe,
    },
    {
        title: "Data Sovereignty",
        description: "Your documents belong to you. Bank-grade encryption and GDPR compliance always.",
        icon: Lock,
    },
];

const team = [
    { name: "Elena Vance", role: "CEO & Co-Founder", bio: "Former immigration attorney with 15+ years experience at the UN.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPX5DdMioKPF507Mg3uao_AKD7Y3D0cr4Oxpjz4j9Zhvn61dy6OJs_n9QaPUnw16htoJMGcQD5P48-Iiv7vxYN7ldHTnhRhVZcJD6vIDKa8nDLb457YmRDk8yMBA54syMEntEGlBvXj7AArUmykZR1L8yeGJ80eTIHcxGbTpw179ybHlUG-c9pydM6kYBqpeeOuXkS7JQZYR50642AqYN6oq9VYLrzRuhFithlymj6S07GbapH1EGotT-47tHyl3bgeiYhNPV4xWaW" },
    { name: "Marcus Chen", role: "CTO", bio: "Previously led AI scalability at major Silicon Valley firms.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDZxmleQxRiDSZVjffvePEDs4y4voorzfZuSjxJkHHZwdEQVt-tUSw3Tn_DDkkQUA-v52HjraDZ8Y44RHi-tJBnHUhci1aS-6g-iwrvojPWdGPYFKTd0Y6XAH9VUtXumTcdVdf5O4ZpLGXsOBny6SX8CL6S-SCPGm1KihzJR4VfyEa_YBQHkUzCkvbJcZhMOa81r_dravL_oDj9c5jjXx4UH_s_KTOeGZK_r2bfUOV2Yghpoc90VqJ6Bsw0mg7ABA9zqpawiZY4zn2" },
    { name: "Sarah Jenkins", role: "Head of Compliance", bio: "Expert in international data law and migration policy.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB7StQIgDELHfmuRNxiQeCkHYZx7ple7wsHDY9OhBwedBPYJvR5o1NjYsGY6ieZIeUdeOvJ9vrP66vCBc2SXB8JEQ39JkO-uuUK6jDFdQXCzIX0kDCLim96rVMSG_gq07B0PVroVE882SaSdbXOtxvVj_gFZk3ktghXMcJmnlEGK5wketRYODF8I2LuQgLFV0PFkZyuX2zOyYh2CSvfZN3NfC-K6dnDNNXF6D5WFqmdFHX1qEjrCmgQYnKObGR9y2vqa5K_q3csenE" },
    { name: "David Okafor", role: "Legal Director", bio: "Managing a network of 500+ global partners.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Wwi95LSKg3RMtydQX6YvCSPeuzcDOj5hWKgtTuZ-0BCIDD7zL1vytIhVJuFSACGkDOb56RRFEUPzkKlf_swkErAH6JMrNJ4LkJOty4wRe3gjGJCZQt51lEZmYONOmaYrGTP3DY7MDhJBtLz8Fsp8L9nQv2DFaZkwd9rGbYqBQJNk8ad6-i3ejo_N__ZRaC-ugppxRT3bQrU3n1ctZsjGtwSKr9U9fOHIg2s2E7FExx-DcCi87GfA5GEYGpqUzvZ7FGpcM6KzFd2C" },
];

export default function AboutPage() {
    return (
        <div className="pt-20 pb-20">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/5 via-transparent to-transparent px-6 py-16 md:py-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            Making Immigration <span className="text-primary">Simple</span> for Everyone
                        </h1>
                        <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
                            VisaHub was founded to solve the #1 problem in global migration: the overwhelming complexity
                            of legal paperwork and the difficulty of finding trusted experts.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-6 bg-surface-container-low">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <stat.icon className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <div className="text-3xl md:text-4xl font-black text-primary">{stat.value}</div>
                                <div className="text-sm font-medium text-on-surface-variant mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <span className="text-sm font-bold text-primary uppercase tracking-wider">Our Mission</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
                                We believe borders shouldn't be barriers to human potential
                            </h2>
                            <p className="text-on-surface-variant leading-relaxed mb-6">
                                Every year, millions of dreams are delayed or denied due to confusing paperwork,
                                lack of expert access, and outdated systems. We're changing that.
                            </p>
                            <p className="text-on-surface-variant leading-relaxed">
                                VisaHub combines AI-powered eligibility checking with a curated network of top-tier
                                immigration lawyers. Our platform handles everything from document verification to
                                application tracking—so you can focus on your future.
                            </p>
                            <Button className="mt-8 gap-2" asChild>
                                <Link href="/visa-finder">Check Your Eligibility <ChevronRight className="w-4 h-4" /></Link>
                            </Button>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI7rJqGAw2NqULAym8wLwkhfK-zyUcc8o-QOctmGCkLZhavt11WfeEaW-77RElvAsFo6DK4mIBk3K0q-JU6o3CPgdx46tkxjaGvnBPtEPA5t08jhKDr43GioTQ6ahCUoaeJwwEqZnRCUze1K-Tfp63_G59LXl6yGjlAyGMM93x4qJFuvqBwhfJdjZ4vz71RQ4T5LIS4Dl91-dH5uvvL2O8RShO9f9DuEhaDTSzWYUCoE2zVdJuKC6lO9oGwjyIDcLhVD30RcjaVBuv" alt="Legal team collaborating" className="object-cover w-full h-[500px]" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-6 bg-surface-container-low">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-on-surface-variant">The principles that guide everything we do at VisaHub.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full hover:shadow-xl transition-all border-none">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                                            <value.icon className="w-7 h-7 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                        <p className="text-on-surface-variant text-sm leading-relaxed">{value.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Architects</h2>
                        <p className="text-on-surface-variant">The legal and technical minds building the future of migration.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, idx) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="overflow-hidden hover:shadow-xl transition-all border-none shadow-md">
                                    <div className="aspect-square bg-muted overflow-hidden">
                                        <img src={member.image} alt={member.name} className="object-cover w-full h-full" />
                                    </div>
                                    <CardContent className="p-5 text-center">
                                        <h3 className="font-bold text-lg">{member.name}</h3>
                                        <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                                        <p className="text-xs text-on-surface-variant">{member.bio}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6">
                <div className="max-w-7xl mx-auto rounded-3xl bg-primary relative overflow-hidden p-12 md:p-20 text-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to start your journey?</h2>
                        <p className="text-primary-fixed text-lg mb-8 max-w-xl mx-auto">
                            Join thousands of successful migrants who found their path with VisaHub.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-primary-fixed" asChild>
                                <Link href="/visa-finder">Check Eligibility</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                                <Link href="/find-lawyer">Find an Expert</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
