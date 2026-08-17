import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, User, ShieldAlert, CheckCircle, HelpCircle, ArrowRight, Lock, Shield } from "lucide-react";

interface Message {
    sender: "bot" | "user";
    text: string;
    type?: "text" | "choices" | "card";
    choices?: string[];
    selectedChoice?: string;
    cardData?: {
        score: number;
        program: string;
        checklist: { text: string; status: "success" | "warning" | "pending" }[];
        insight: string;
    };
}

export function AIAssistantPortal() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: "bot",
            text: "Hello! I am your TravlTik Digital Diplomat. I can help you evaluate your eligibility for study permits, skilled worker visas, and permanent residency. Which destination country are you planning to relocate to?",
            type: "choices",
            choices: ["???? Canada", "???? United Kingdom", "???? Australia", "???? United States"]
        }
    ]);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = (textToSend: string) => {
        if (!textToSend.trim()) return;

        // Add user message
        const userMsg: Message = { sender: "user", text: textToSend };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Process bot response
        setTimeout(() => {
            let botMsg: Message;
            const normText = textToSend.toLowerCase();

            if (normText.includes("canada")) {
                botMsg = {
                    sender: "bot",
                    text: "Great choice! Canada has several popular immigration and study routes. What is your primary purpose for going to Canada?",
                    type: "choices",
                    choices: ["?? Higher Education (Study Permit)", "?? Overseas Employment (Express Entry)", "?? Family Sponsorship"]
                };
            } else if (normText.includes("education") || normText.includes("study")) {
                botMsg = {
                    sender: "bot",
                    text: "For a Canadian Study Permit, you will need a Letter of Acceptance from a Designated Learning Institution (DLI) and proof of financial support. Let's do a quick eligibility check. What is your highest level of education?",
                    type: "choices",
                    choices: ["High School Diploma", "Bachelor's Degree", "Master's or Ph.D."]
                };
            } else if (normText.includes("bachelor") || normText.includes("master") || normText.includes("diploma")) {
                botMsg = {
                    sender: "bot",
                    text: "Excellent. Have you taken a language competency test (like IELTS or TEF) within the last 2 years?",
                    type: "choices",
                    choices: ["Yes (IELTS 7.0 or higher)", "Yes (IELTS 6.0 - 6.5)", "Not yet registered"]
                };
            } else if (normText.includes("ielts") || normText.includes("yes") || normText.includes("not yet")) {
                botMsg = {
                    sender: "bot",
                    text: "Thank you. Based on your inputs, I have generated an initial eligibility assessment for your Canadian migration pathway. Here is your profile score:",
                    type: "card",
                    cardData: {
                        score: 82,
                        program: "Express Entry (FSW) & Study Permits",
                        checklist: [
                            { text: "ECA Education Assessment (Equivalent)", status: "success" },
                            { text: "Language Proficiency (IELTS 7.0+)", status: "success" },
                            { text: "Proof of Funds (GIC CAD 20,635)", status: "warning" },
                            { text: "Medical & Police Clearances", status: "pending" }
                        ],
                        insight: "Your educational qualifications and test scores give you a strong profile. To guarantee your approval, ensure you open a Canadian GIC account early with the required CAD 20,635 deposit."
                    }
                };
            } else {
                botMsg = {
                    sender: "bot",
                    text: "I understand. I recommend speaking with one of our certified immigration lawyers or academic consultants to get a detailed appraisal of your case. Would you like me to connect you?",
                    type: "choices",
                    choices: ["?? Connect with an Advisor", "?? Start Over"]
                };
            }

            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    const handleChoiceClick = (choice: string, msgIndex: number) => {
        // Mark choice as selected
        setMessages(prev => prev.map((m, idx) => {
            if (idx === msgIndex) {
                return { ...m, selectedChoice: choice };
            }
            return m;
        }));

        handleSend(choice);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-5rem)] bg-[#fff5f5]">
            {/* Header banner */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-950 px-6 py-4 flex justify-between items-center border-b border-purple-950 shadow-sm shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                        <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
                    </div>
                    <div>
                        <h2 className="font-sora font-extrabold text-sm text-white">TravlTik AI Assistant</h2>
                        <p className="text-[10px] text-white/60 font-semibold">Legal Grade Migration Advisor</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold text-white/80">
                    <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-400" /> Secure Chat</span>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                            
                            {/* Speech Bubble */}
                            {msg.text && (
                                <div className={`max-w-xl p-4 rounded-3xl text-xs font-semibold leading-relaxed shadow-sm border ${
                                    msg.sender === "user" 
                                        ? "bg-purple-600 text-white border-transparent" 
                                        : "bg-white text-navy border-yellow-100"
                                }`}>
                                    {msg.text}
                                </div>
                            )}

                            {/* Option Chips */}
                            {msg.type === "choices" && msg.choices && !msg.selectedChoice && (
                                <div className="flex flex-wrap gap-2 mt-3 max-w-xl">
                                    {msg.choices.map(c => (
                                        <button 
                                            key={c}
                                            onClick={() => handleChoiceClick(c, idx)}
                                            className="bg-white border border-yellow-100 text-gray-500 hover:border-purple-500 hover:text-purple-600 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Option Chip selected display */}
                            {msg.selectedChoice && (
                                <span className="text-[9px] text-gray-400 font-bold tracking-wider mt-1 px-1">Selected: {msg.selectedChoice}</span>
                            )}

                            {/* Eligibility Card */}
                            {msg.type === "card" && msg.cardData && (
                                <div className="bg-white w-full max-w-xl rounded-3xl border border-yellow-100 p-6 shadow-md mt-3 space-y-5">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-sora font-extrabold text-navy text-sm">Eligibility Assessment</h3>
                                            <p className="text-[9px] text-[#f59e0b] font-bold mt-0.5">{msg.cardData.program}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-sora font-black text-3xl text-purple-600">{msg.cardData.score}%</span>
                                            <p className="text-[9px] text-gray-400 font-bold">Match Rate</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-yellow-50 h-2 rounded-full overflow-hidden border border-yellow-100">
                                        <div className="bg-purple-600 h-full rounded-full transition-all duration-1000" style={{ width: `${msg.cardData.score}%` }}></div>
                                    </div>

                                    {/* Checklist */}
                                    <div className="space-y-2">
                                        <h4 className="text-[9px] text-gray-400 font-bold tracking-wider">Document Checklist Audit</h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-semibold text-gray-600">
                                            {msg.cardData.checklist.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    {item.status === "success" && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                                                    {item.status === "warning" && <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />}
                                                    {item.status === "pending" && <HelpCircle className="w-4 h-4 text-gray-400 shrink-0" />}
                                                    {item.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Insight text */}
                                    <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 text-[11px] text-gray-500 leading-relaxed font-semibold">
                                        ?? {msg.cardData.insight}
                                    </div>

                                    {/* Action button */}
                                    <div className="flex justify-end pt-2 border-t border-yellow-50">
                                        <button 
                                            onClick={() => handleChoiceClick("?? Connect with an Advisor", idx)}
                                            className="bg-purple-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-purple-700 transition-all flex items-center gap-1 active:scale-95 shadow-sm"
                                        >
                                            Consult Certified Advisor <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Input Bar */}
            <div className="bg-white border-t border-yellow-100 p-4 shrink-0 shadow-lg">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                    <input 
                        type="text" 
                        value={input} 
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSend(input)}
                        placeholder="Ask about specific eligibility criteria, GICs, or visa forms..."
                        className="flex-grow border border-yellow-100 bg-yellow-50/20 px-4 py-3 rounded-2xl text-xs font-semibold outline-none focus:border-purple-500 focus:bg-white transition-all text-navy"
                    />
                    <button 
                        onClick={() => handleSend(input)}
                        className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl flex items-center justify-center transition-all active:scale-[0.96]"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex justify-center mt-3 gap-6 text-[9px] text-gray-400 font-bold tracking-widest leading-none">
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-purple-400" /> Encrypted data</span>
                    <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-purple-400" /> GDPR Compliant</span>
                </div>
            </div>
        </div>
    );
}

