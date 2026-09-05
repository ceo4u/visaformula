import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Phone, Mail, ArrowLeft, Send, Bot, User, ChevronRight, Calendar, Globe, GraduationCap, Ticket, Briefcase, MessageCircle } from "lucide-react";

type Msg = { role: "ai" | "user"; text: string; quickReplies?: string[] };

const aiResponses: Record<string, string> = {
  "Apply for a tourist visa": "Great choice! 🌍 We handle tourist visas for 120+ countries. The most popular right now are UAE (₹2,499), Thailand (₹1,499), and Singapore (₹3,999). Which country are you planning to visit?",
  "Student visa for Canada": "Canada is one of our top destinations! 🎓 For a Canadian study permit you'll need:\n• Acceptance letter from a DLI\n• Proof of funds (₹10L+)\n• IELTS 6.0+ (or equivalent)\nWould you like me to connect you with our Canada specialist?",
  "Event visa for FIFA / concert": "Exciting! 🎭 For FIFA World Cup 2026 (USA/Canada/Mexico), you'll need a B-2 Tourist Visa. Processing takes 2–4 weeks so apply ASAP. Our package includes visa + itinerary support for ₹12,999. Interested?",
  "Work permit help": "Work permits require employer sponsorship in most countries. 💼 Tell me which country you're targeting and I can match you with our work permit specialist. We cover H-1B (USA), LMIA (Canada), UK Skilled Worker, and more.",
  "Talk to a human expert": "Connecting you with a live expert now! 👨‍💼 Average wait time: 2–3 minutes. In the meantime, can you briefly describe what visa you need?",
  "UAE Tourist Visa": "UAE e-Visa is one of our fastest! ⚡\n• Processing: 24–48 hours\n• Validity: 30 days\n• Fee: ₹2,499\n• Express (6–12hr): +₹1,500\n\nReady to apply? Visit /apply-visa or I can walk you through it here.",
  "UK Visa": "UK e-Visa requires:\n🇬🇧 Processing: 3–5 working days\n📄 Bank statements (6 months)\n✈️ Itinerary & hotel bookings\n💰 Fee: ₹9,999\n\nShall I book a consultation with our UK specialist?",
};

const defaultReplies = ["Tell me more", "Connect me with an expert", "How long does it take?", "What documents do I need?"];

function getAIResponse(msg: string): { text: string; quickReplies?: string[] } {
  const lower = msg.toLowerCase();
  if (lower.includes("uae") || lower.includes("dubai")) return { text: aiResponses["UAE Tourist Visa"], quickReplies: ["Apply for UAE visa", "Express processing?", "Talk to a human expert"] };
  if (lower.includes("uk") || lower.includes("britain")) return { text: aiResponses["UK Visa"], quickReplies: ["Book consultation", "Download checklist", "Talk to a human expert"] };
  if (lower.includes("canada") && lower.includes("student")) return { text: aiResponses["Student visa for Canada"], quickReplies: ["Book consultation", "Download checklist", "Talk to a human expert"] };
  if (lower.includes("tourist") || lower.includes("travel")) return { text: aiResponses["Apply for a tourist visa"], quickReplies: ["UAE", "Thailand", "Singapore", "Talk to a human expert"] };
  if (lower.includes("work") || lower.includes("h1") || lower.includes("permit")) return { text: aiResponses["Work permit help"], quickReplies: ["USA H-1B", "Canada LMIA", "UK Skilled Worker", "Talk to a human expert"] };
  if (lower.includes("fifa") || lower.includes("concert") || lower.includes("event")) return { text: aiResponses["Event visa for FIFA / concert"], quickReplies: ["Apply now ₹12,999", "Talk to a human expert"] };
  if (lower.includes("human") || lower.includes("expert") || lower.includes("talk")) return { text: aiResponses["Talk to a human expert"], quickReplies: ["Tell me your visa need first"] };
  return { text: "Thanks! 💬 A TravlTik expert will join this chat within 2–3 minutes to help you. Meanwhile, can you tell me more about which country and visa type you need?", quickReplies: defaultReplies };
}

export function TalkToUs() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"options" | "chat" | "call">("options");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi! 👋 I'm the TravlTik AI assistant. How can I help you today?", quickReplies: ["Apply for a tourist visa", "Student visa for Canada", "Event visa for FIFA / concert", "Work permit help", "Talk to a human expert"] }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing]);

  const sendMsg = (text: string) => {
    setMsgs(prev => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const res = getAIResponse(text);
      setTyping(false);
      setMsgs(prev => [...prev, { role: "ai", text: res.text, quickReplies: res.quickReplies }]);
    }, 900);
  };

  const whatsappUrl = "https://wa.me/917661989366?text=Hi%20TravlTik%20Team%2C%20I%20need%20assistance%20with%20my%20visa%20application.";

  const options = [
    { icon: MessageCircle, bg: "bg-emerald-50 border border-emerald-200", iconColor: "text-emerald-600", title: "WhatsApp Chat", sub: "Direct chat on WhatsApp · +91 766 1989 366", action: () => window.open(whatsappUrl, "_blank") },
    { icon: Globe, bg: "bg-slate-50 border border-slate-100", iconColor: "text-black", title: "Visa Assistance", sub: "Apply for any visa online", action: () => { setView("chat"); } },
    { icon: GraduationCap, bg: "bg-slate-50 border border-slate-100", iconColor: "text-black", title: "Student Visa Help", sub: "Canada · UK · Australia · Germany", action: () => { setView("chat"); setTimeout(() => sendMsg("Student visa for Canada"), 200); } },
    { icon: Ticket, bg: "bg-slate-50 border border-slate-100", iconColor: "text-black", title: "Event Visa", sub: "FIFA · Concerts · Exhibitions", action: () => { setView("chat"); setTimeout(() => sendMsg("Event visa for FIFA / concert"), 200); } },
    { icon: Briefcase, bg: "bg-slate-50 border border-slate-100", iconColor: "text-black", title: "Work Permit", sub: "H-1B · LMIA · UK Skilled Worker", action: () => { setView("chat"); setTimeout(() => sendMsg("Work permit help"), 200); } },
    { icon: Phone, bg: "bg-slate-50 border border-slate-100", iconColor: "text-black", title: "Call Us", sub: "+91 766 1989 366 · 9AM–8PM", action: () => setView("call") },
    { icon: Mail, bg: "bg-slate-50 border border-slate-100", iconColor: "text-black", title: "Email Support", sub: "support@travltik.com", action: () => setView("call") },
  ];

  return (
    <>
      {/* Modal */}
      {open && (
        <div className="fixed bottom-[144px] md:bottom-24 right-4 md:right-6 w-[320px] sm:w-[370px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-50 flex flex-col font-sans" style={{ maxHeight: "560px" }}>
          
          {/* Options View */}
          {view === "options" && (
            <>
              <div className="bg-gradient-to-r from-[#481268] via-[#5b1983] to-[#340a4d] p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-white shrink-0"><MessageSquare className="w-5 h-5 text-white" /></div>
                <div className="flex-1">
                  <div className="font-sans font-bold text-white text-sm">Talk to TravlTik</div>
                  <div className="flex items-center gap-1.5 text-purple-200 text-xs"><span className="w-2 h-2 bg-[#00e5a3] rounded-full animate-pulse" />8 experts online now</div>
                </div>
                <button onClick={() => setOpen(false)} className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center text-white hover:bg-white/25 transition-all"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-3 overflow-y-auto flex-1">
                <div className="text-xs font-bold text-gray-400 tracking-wider mb-2 px-1">How can we help?</div>
                {options.map((opt, i) => {
                  const IconComponent = opt.icon;
                  return (
                    <button key={i} onClick={opt.action} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-purple-50/50 border border-transparent hover:border-purple-100 transition-all text-left mb-1.5 cursor-pointer">
                      <div className={`w-10 h-10 ${opt.bg} rounded-xl flex items-center justify-center shrink-0`}>
                        <IconComponent className={`w-5 h-5 ${opt.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-black text-sm">{opt.title}</div>
                        <div className="text-xs text-gray-400 truncate">{opt.sub}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Chat View */}
          {view === "chat" && (
            <>
              <div className="bg-gradient-to-r from-[#481268] via-[#5b1983] to-[#340a4d] p-4 flex items-center gap-3">
                <button onClick={() => setView("options")} className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center text-white hover:bg-white/25 transition-all"><ArrowLeft className="w-4 h-4" /></button>
                <div className="w-8 h-8 bg-[#00e5a3] rounded-xl flex items-center justify-center text-[#481268] shrink-0 font-bold"><Bot className="w-4 h-4 text-[#481268]" /></div>
                <div className="flex-1">
                  <div className="font-sans font-bold text-white text-xs">TravlTik Assistant</div>
                  <div className="text-teal-300 text-[10px] flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#00e5a3] rounded-full animate-pulse" />Online · Instant</div>
                </div>
                <button onClick={() => setOpen(false)} className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center text-white hover:bg-white/25 transition-all"><X className="w-4 h-4" /></button>
              </div>

              <div ref={bodyRef} className="p-3.5 overflow-y-auto flex-1 flex flex-col gap-3 bg-slate-50">
                {msgs.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${m.role === "user" ? "bg-[#481268] text-white font-medium rounded-br-none" : "bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-none"}`}>
                      {m.text.split("\n").map((line, j) => (
                        <p key={j} className={j > 0 ? "mt-1" : ""}>{line}</p>
                      ))}
                    </div>
                    {m.quickReplies && m.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                        {m.quickReplies.map((qr, k) => (
                          <button key={k} onClick={() => sendMsg(qr)} className="bg-white hover:bg-[#481268] hover:text-white text-slate-700 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs transition-all text-left">
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {typing && (
                  <div className="flex items-start">
                    <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 rounded-bl-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && input.trim() && sendMsg(input.trim())}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#481268] font-medium"
                />
                <button
                  onClick={() => input.trim() && sendMsg(input.trim())}
                  disabled={!input.trim()}
                  className="w-8 h-8 bg-[#481268] hover:bg-[#5b1983] disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* Call View */}
          {view === "call" && (
            <>
              <div className="bg-gradient-to-r from-[#481268] via-[#5b1983] to-[#340a4d] p-4 flex items-center gap-3">
                <button onClick={() => setView("options")} className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center text-white hover:bg-white/25 transition-all"><ArrowLeft className="w-4 h-4" /></button>
                <div className="flex-1">
                  <div className="font-sans font-bold text-white text-sm">Direct Contact</div>
                  <div className="text-purple-200 text-xs">Reach out directly</div>
                </div>
                <button onClick={() => setOpen(false)} className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center text-white hover:bg-white/25 transition-all"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-4 space-y-3">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl p-4 flex items-center justify-between transition-all shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><MessageCircle className="w-5 h-5 text-white" /></div>
                    <div>
                      <div className="font-bold text-sm">WhatsApp Direct</div>
                      <div className="text-emerald-100 text-xs font-medium">+91 766 1989 366 · Instant Reply</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white" />
                </a>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center"><Phone className="w-5 h-5 text-[#481268]" /></div>
                  <div><div className="font-bold text-black text-sm">Phone Support</div><div className="text-black font-extrabold text-sm">+91 766 1989 366</div><div className="text-xs text-gray-400">Mon–Sat · 9AM–8PM IST</div></div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center"><Mail className="w-5 h-5 text-[#481268]" /></div>
                  <div><div className="font-bold text-black text-sm">Email Support</div><div className="text-black font-extrabold text-sm">support@travltik.com</div><div className="text-xs text-gray-400">Response within 2–4 hours</div></div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB Button - TravlTik iOS App Icon Style Floating Chat Button (Sleek Black) */}
      <button
        onClick={() => { setOpen(!open); setView("options"); }}
        aria-label="Talk to Us"
        className="fixed bottom-[88px] md:bottom-6 right-3.5 md:right-6 z-50 w-11 h-11 md:w-14 md:h-14 rounded-2xl md:rounded-[22px] bg-slate-900 hover:bg-black text-white shadow-[0_10px_25px_-4px_rgba(0,0,0,0.5),0_4px_10px_-2px_rgba(0,0,0,0.2),inset_0_1.5px_0_rgba(255,255,255,0.25)] hover:shadow-[0_14px_30px_-4px_rgba(0,0,0,0.65),0_6px_12px_-2px_rgba(0,0,0,0.25),inset_0_2px_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95 active:translate-y-0 flex items-center justify-center border border-white/20 cursor-pointer group backdrop-blur-sm"
      >
        <span className="relative flex items-center justify-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          {open ? (
            <X className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform stroke-[2.4]" />
          ) : (
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform stroke-[2.4]" />
          )}
          {!open && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-emerald-400 rounded-full border-2 border-black shadow-sm animate-pulse" />
          )}
        </span>
      </button>
    </>
  );
}

export default TalkToUs;
