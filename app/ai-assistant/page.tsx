"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Lock, Shield, CheckCircle, AlertTriangle, Circle, ArrowRight } from "lucide-react";

type Message = {
    type: "ai" | "user" | "choices" | "card";
    content?: string;
    time?: string;
    choices?: string[];
    selectedChoice?: string;
};

const initialMessages: Message[] = [
    {
        type: "ai",
        content: "Hi there. I can help you figure out your options for moving, studying, or working abroad.\n\nWhich country are you hoping to move to?",
        time: "VisaHub Guide • 10:02 AM",
    },
    { type: "user", content: "Canada", time: "You • 10:03 AM" },
    {
        type: "ai",
        content: "Canada is a great choice. What's your main goal for moving there?",
    },
    {
        type: "choices",
        choices: ["Higher Education", "Permanent Residency", "Work Permit", "Investment"],
        selectedChoice: "Permanent Residency",
    },
    {
        type: "ai",
        content: "Understood. To calculate your Express Entry score, I need a few more details. What is your highest level of education and your most recent IELTS score?",
    },
    {
        type: "user",
        content: "Master's Degree, IELTS Overall 7.5 (L:8.0, R:7.5, W:7.0, S:7.5). Budget is around $30,000.",
    },
    { type: "card" },
];

export default function AiAssistantPage() {
    const [input, setInput] = useState("");

    return (
        <div className="bg-surface min-h-screen">
            <main className="max-w-4xl mx-auto px-4 pt-8 pb-32">
                <div className="space-y-8 flex flex-col">
                    {initialMessages.map((msg, idx) => {
                        if (msg.type === "ai") {
                            return (
                                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="flex flex-col items-start max-w-[85%]">
                                    <div className="bg-surface-container-lowest shadow-editorial border border-surface-container-highest p-5 rounded-xl rounded-tl-none">
                                        <p className="text-sm text-on-surface leading-relaxed whitespace-pre-line">{msg.content}</p>
                                    </div>
                                    {msg.time && <span className="text-[11px] font-bold text-on-surface-variant mt-2 uppercase tracking-wider px-1">{msg.time}</span>}
                                </motion.div>
                            );
                        }
                        if (msg.type === "user") {
                            return (
                                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="flex flex-col items-end self-end max-w-[85%]">
                                    <div className="bg-primary text-white p-5 rounded-xl rounded-tr-none shadow-editorial">
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                    </div>
                                    {msg.time && <span className="text-[11px] font-bold text-on-surface-variant mt-2 uppercase tracking-wider px-1">{msg.time}</span>}
                                </motion.div>
                            );
                        }
                        if (msg.type === "choices") {
                            return (
                                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="flex flex-wrap gap-2 mt-2">
                                    {msg.choices?.map((c) => (
                                        <button
                                            key={c}
                                            className={`px-4 py-2 text-sm font-bold rounded-lg shadow-editorial transition-colors ${c === msg.selectedChoice
                                                ? "bg-primary text-white"
                                                : "bg-white border border-surface-container-highest text-on-surface hover:border-primary hover:text-primary"}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </motion.div>
                            );
                        }
                        if (msg.type === "card") {
                            return (
                                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col items-start w-full">
                                    <div className="bg-surface-container-lowest shadow-editorial w-full max-w-2xl rounded-xl p-8 border-l-4 border-primary">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-xl font-black text-on-surface uppercase tracking-tight font-heading">Eligibility Analysis</h3>
                                                <p className="text-xs text-on-surface-variant font-bold uppercase mt-1">Federal Skilled Worker Program (FSW)</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-4xl font-black text-primary">78%</span>
                                                <p className="text-[10px] font-bold text-on-surface-variant uppercase">Match Score</p>
                                            </div>
                                        </div>

                                        <div className="w-full bg-surface-container-highest h-2 rounded-full mb-8 overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.2, delay: 0.5 }} className="bg-primary h-full rounded-full" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="text-[10px] font-black text-on-surface uppercase tracking-widest mb-4">Document Checklist</h4>
                                                <ul className="space-y-3">
                                                    <li className="flex items-center gap-2 text-xs font-medium text-tertiary">
                                                        <CheckCircle className="w-4 h-4" /> ECA Education Assessment
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-tertiary">
                                                        <CheckCircle className="w-4 h-4" /> Language Proficiency (IELTS)
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-red-500">
                                                        <AlertTriangle className="w-4 h-4" /> Proof of Funds (Partial)
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                                                        <Circle className="w-4 h-4" /> Police Clearance Certificate
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="bg-surface-container-low p-4 rounded-lg">
                                                <h4 className="text-[10px] font-black text-on-surface uppercase tracking-widest mb-2">AI Insights</h4>
                                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                                    Your Master&apos;s degree gives you a significant advantage. However, your <span className="text-red-500 font-bold">Proof of Funds</span> ($30,000) is slightly below the recommended threshold for a family of three.
                                                </p>
                                                <button className="mt-4 text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-1 hover:underline">
                                                    View Full Breakdown
                                                    <ArrowRight className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-bold text-on-surface-variant mt-2 uppercase tracking-wider px-1">VisaHub Guide • Just now</span>
                                </motion.div>
                            );
                        }
                        return null;
                    })}
                </div>
            </main>

            {/* Input Area */}
            <footer className="fixed bottom-0 left-0 w-full bg-surface-container-low border-t border-surface-container-highest px-4 py-4 z-50">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 bg-white shadow-editorial rounded-lg p-2 border border-surface-container-highest">
                        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <input
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-on-surface font-medium placeholder:text-on-surface-variant"
                            placeholder="Ask about specific provinces or visa subclasses..."
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex justify-center mt-3 gap-6 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> End-to-end Encrypted</span>
                        <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Legal Grade AI</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
