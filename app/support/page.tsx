"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    MessageCircle, Phone, Mail, Clock, ChevronDown, Send,
    Search, HelpCircle, FileText, CreditCard, Shield,
    Users, Globe, ArrowRight, CheckCircle, Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
    {
        question: "How do I book a consultation with a lawyer?",
        answer: "Simply use our 'Find Lawyer' page to browse verified experts. Select your preferred lawyer, choose a time slot, and complete the payment. You'll receive a confirmation email with a secure video call link.",
    },
    {
        question: "Is my personal information secure?",
        answer: "Yes. We use bank-grade 256-bit encryption for all data. Your documents are stored in secure servers and only accessible to you and your assigned legal representative.",
    },
    {
        question: "What is your refund policy?",
        answer: "We offer a 100% satisfaction guarantee. If your initial consultation doesn't meet expectations, request a full refund within 48 hours of the scheduled call.",
    },
    {
        question: "How are lawyers verified?",
        answer: "Every lawyer undergoes rigorous background checks including bar association verification, professional liability insurance, and client review analysis.",
    },
    {
        question: "What should I do in a visa emergency?",
        answer: "Use the red 'Emergency Help' button available 24/7. You'll be connected to an emergency response specialist within 15 minutes.",
    },
    {
        question: "Can I track my application status?",
        answer: "Yes! Your dashboard shows real-time updates for all active applications, including document status and next steps.",
    },
];

const supportChannels = [
    { icon: MessageCircle, title: "Live Chat", description: "Instant messaging with support team", availability: "24/7", action: "Start Chat", color: "bg-blue-50 text-blue-600" },
    { icon: Phone, title: "Phone Support", description: "Speak directly with an agent", availability: "8 AM - 8 PM EST", action: "Call Now", number: "+1 (800) 555-VISA", color: "bg-green-50 text-green-600" },
    { icon: Mail, title: "Email Support", description: "Get detailed responses within 24h", availability: "Response within 24h", action: "Send Email", email: "support@visahub.com", color: "bg-purple-50 text-purple-600" },
];

const categories = [
    { icon: FileText, title: "Visa Applications", description: "Document requirements, processing times, eligibility", href: "/visa-finder" },
    { icon: Users, title: "Lawyer Related", description: "Booking, payments, cancellations, reviews", href: "/find-lawyer" },
    { icon: CreditCard, title: "Billing & Payments", description: "Invoices, refunds, payment methods", href: "#" },
    { icon: Shield, title: "Security & Privacy", description: "Data protection, encryption, compliance", href: "#" },
];

export default function SupportPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pt-20 pb-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary/5 via-transparent to-transparent px-6 py-16 md:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shadow-inner">
                                <Headphones className="w-10 h-10 text-primary" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            How can we <span className="text-primary">help</span> you today?
                        </h1>
                        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10">
                            Get instant answers to your questions or connect with our support team.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative shadow-[0_12px_40px_rgba(19,27,46,0.08)] rounded-2xl">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                                <input
                                    type="text"
                                    placeholder="Search for articles, guides or FAQs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-16 pl-16 pr-6 rounded-2xl border-none bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Support Channels */}
            <section className="py-20 px-6 bg-surface-container-low">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Get Support Anytime, Anywhere</h2>
                        <p className="text-on-surface-variant">Choose the channel that works best for you</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {supportChannels.map((channel, idx) => (
                            <motion.div
                                key={channel.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full hover:-translate-y-1 transition-transform duration-300 border-none shadow-md">
                                    <CardContent className="p-8 text-center flex flex-col items-center h-full">
                                        <div className={`w-16 h-16 rounded-2xl ${channel.color} flex items-center justify-center mb-6 shadow-sm`}>
                                            <channel.icon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">{channel.title}</h3>
                                        <p className="text-on-surface-variant mb-6 flex-grow">{channel.description}</p>
                                        <div className="flex items-center justify-center gap-2 text-sm font-bold text-tertiary mb-6 bg-tertiary/10 px-4 py-2 rounded-full">
                                            <Clock className="w-4 h-4" />
                                            <span>{channel.availability}</span>
                                        </div>
                                        {channel.title === "Phone Support" ? (
                                            <Button className="w-full gap-2 font-bold py-6 text-lg rounded-xl shadow-lg shadow-primary/20" asChild>
                                                <a href={`tel:${channel.number}`}>{channel.action}</a>
                                            </Button>
                                        ) : channel.title === "Email Support" ? (
                                            <Button className="w-full gap-2 font-bold py-6 text-lg rounded-xl shadow-lg shadow-primary/20" asChild>
                                                <a href={`mailto:${channel.email}`}>{channel.action}</a>
                                            </Button>
                                        ) : (
                                            <Button className="w-full gap-2 font-bold py-6 text-lg rounded-xl shadow-lg shadow-primary/20">
                                                {channel.action}
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Help Categories */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
                        <p className="text-on-surface-variant">Find answers specific to your needs</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full hover:shadow-xl transition-all cursor-pointer group border-none bg-surface-container-low">
                                    <CardContent className="p-8">
                                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                                            <cat.icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">{cat.title}</h3>
                                        <p className="text-on-surface-variant mb-6 leading-relaxed">{cat.description}</p>
                                        <Button variant="link" className="p-0 text-primary font-bold gap-2 group-hover:gap-3 transition-all">
                                            Learn More <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ & Contact Section */}
            <section className="py-20 px-6 bg-surface-container-low">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

                    {/* FAQ */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-on-surface-variant mb-8">Quick answers to common questions about our platform and services.</p>
                        <div className="space-y-4">
                            {filteredFaqs.map((faq, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className={`border-none shadow-sm transition-all ${openFaq === idx ? "ring-2 ring-primary" : "hover:shadow-md"}`}>
                                        <button
                                            className="w-full p-6 text-left flex justify-between items-center"
                                            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        >
                                            <span className={`font-bold text-lg pr-4 ${openFaq === idx ? "text-primary" : ""}`}>{faq.question}</span>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === idx ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant"}`}>
                                                <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                                            </div>
                                        </button>
                                        {openFaq === idx && (
                                            <div className="px-6 pb-6 pt-2">
                                                <div className="h-px w-full bg-border mb-4" />
                                                <p className="text-on-surface-variant leading-relaxed">{faq.answer}</p>
                                            </div>
                                        )}
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Send us a message</h2>
                        <p className="text-on-surface-variant mb-8">Our support team will get back to you within 24 hours.</p>
                        <Card className="border-none shadow-xl">
                            <CardContent className="p-8">
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-on-surface-variant">Full Name</label>
                                            <input type="text" className="w-full px-4 h-12 rounded-xl border-none bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary font-medium" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-on-surface-variant">Email Address</label>
                                            <input type="email" className="w-full px-4 h-12 rounded-xl border-none bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary font-medium" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-on-surface-variant">Subject</label>
                                        <select className="w-full px-4 h-12 rounded-xl border-none bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary font-medium appearance-none">
                                            <option>Visa Application Query</option>
                                            <option>Technical Support</option>
                                            <option>Billing & Refunds</option>
                                            <option>Legal Consultation</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-on-surface-variant">Message</label>
                                        <textarea rows={5} className="w-full px-4 py-3 rounded-xl border-none bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary font-medium resize-none" placeholder="How can we help you today?"></textarea>
                                    </div>
                                    <Button type="submit" className="w-full gap-2 font-bold text-lg py-6 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                        Send Message <Send className="w-5 h-5" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </section>

            {/* Trust Badge bg-surface-container-low */}
            <section className="py-12 px-6 text-center border-t border-border">
                <div className="flex items-center justify-center gap-8 flex-wrap">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-tertiary" />
                        <span className="font-bold">24/7 Support Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-tertiary" />
                        <span className="font-bold">100% Secure & Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-tertiary" />
                        <span className="font-bold">Verified Legal Experts</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
