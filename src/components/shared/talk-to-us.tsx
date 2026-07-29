import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Phone, Mail, ArrowLeft, Send, Bot, User, ChevronRight, Calendar, Globe, GraduationCap, Ticket, Briefcase } from "lucide-react";

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
  return { text: "Thanks! 💬 A VisaFormula expert will join this chat within 2–3 minutes to help you. Meanwhile, can you tell me more about which country and visa type you need?", quickReplies: defaultReplies };
}

export function TalkToUs() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"options" | "chat" | "call">("options");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi! 👋 I'm the VisaFormula AI assistant. How can I help you today?", quickReplies: ["Apply for a tourist visa", "Student visa for Canada", "Event visa for FIFA / concert", "Work permit help", "Talk to a human expert"] }
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

  const options = [
    { icon: Globe, bg: "bg-slate-50 border border-slate-100", iconColor: "text-black", title: "Visa Assistance", sub: "Apply for any visa online", action: () => { setView("chat"); } },
    { icon: GraduationCap, bg: "bg-slate-50 border border-slate-100", iconColor: "text-black", title: "Student Visa Help", sub: "Canada · UK · Australia · Germany", action: () => { setView("chat"); setTimeout(() => sendMsg("Student visa for Canada"), 200); } },
    { icon: Ticket, bg: "bg-slate-50 border border-slate-100", iconColor: "text-black", title: "Event Visa", sub: "FIFA · Concerts · Exhibitions", action: () => { setView("chat"); setTimeout(() => sendMsg("Event visa for FIFA / concert"), 200); } },
    { icon: Briefcase, bg: "bg-slate-50 border border-slate-100", iconColor: "text-black", title: "Work Permit", sub: "H-1B · LMIA · UK Skilled Worker", action: () => { setView("chat"); setTimeout(() => sendMsg("Work permit help"), 200); } },
    { icon: Phone, bg: "bg-slate-50 border border-slate-100", iconColor: "text-black", title: "Call Us", sub: "+91 766 1989 366 · 9AM–8PM", action: () => setView("call") },
    { icon: Mail, bg: "bg-slate-50 border border-slate-100", iconColor: "text-black", title: "Email Support", sub: "support@visaformula.com", action: () => setView("call") },
  ];

  return (
    <>
      {/* Modal */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[340px] sm:w-[370px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-50 flex flex-col font-sans" style={{ maxHeight: "560px" }}>
          
          {/* Options View */}
          {view === "options" && (
            <>
              <div className="bg-black p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white shrink-0"><MessageSquare className="w-5 h-5 text-white" /></div>
                <div className="flex-1">
                  <div className="font-sora font-bold text-white text-sm">Talk to VisaFormula</div>
                  <div className="flex items-center gap-1.5 text-slate-300 text-xs"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />8 experts online now</div>
                </div>
                <button onClick={() => setOpen(false)} className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-white hover:bg-slate-700 transition-all"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-3 overflow-y-auto flex-1">
                <div className="text-xs font-bold text-gray-400 tracking-wider mb-2 px-1">How can we help?</div>
                {options.map((opt, i) => {
                  const IconComponent = opt.icon;
                  return (
                    <button key={i} onClick={opt.action} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-150 transition-all text-left mb-1.5">
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
              <div className="bg-black p-4 flex items-center gap-3">
                <button onClick={() => setView("options")} className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-white hover:bg-slate-700 transition-all"><ArrowLeft className="w-4 h-4" /></button>
                <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">VisaFormula AI + Expert</div>
                  <div className="flex items-center gap-1.5 text-slate-300 text-xs"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />Expert joining in ~2 min</div>
                </div>
                <button onClick={() => setOpen(false)} className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-white hover:bg-slate-700 transition-all"><X className="w-4 h-4" /></button>
              </div>

              <div ref={bodyRef} className="flex-grow p-3 overflow-y-auto bg-slate-50 flex flex-col gap-2" style={{ maxHeight: "350px" }}>
                {msgs.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[85%] px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${m.role === "user" ? "bg-black text-white rounded-2xl rounded-br-sm" : "bg-white border border-slate-200 text-black rounded-2xl rounded-bl-sm shadow-sm"}`}>
                      {m.text}
                    </div>
                    {m.quickReplies && m.role === "ai" && i === msgs.length - 1 && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5 max-w-full">
                        {m.quickReplies.map((qr, qi) => (
                          <button key={qi} onClick={() => sendMsg(qr)} className="text-[11px] font-bold px-2.5 py-1.5 bg-white border border-slate-300 text-slate-800 rounded-xl hover:bg-slate-100 transition-all">{qr}</button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {typing && (
                  <div className="flex items-start gap-2">
                    <div className="bg-white border border-slate-250 rounded-2xl rounded-bl-sm px-3.5 py-2.5 shadow-sm flex items-center gap-1">
                      {[0, 1, 2].map(i => <span key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-2.5 border-t border-slate-200 bg-white flex gap-2">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && input.trim()) sendMsg(input.trim()); }} placeholder="Type your question…" className="flex-1 px-3 py-2 border border-slate-200 rounded-full text-xs outline-none focus:border-black bg-slate-50 font-medium text-black" />
                <button onClick={() => { if (input.trim()) sendMsg(input.trim()); }} className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white shrink-0 hover:bg-slate-900 transition-all"><Send className="w-3.5 h-3.5" /></button>
              </div>
            </>
          )}

          {/* Call / Email View */}
          {view === "call" && (
            <>
              <div className="bg-black p-4 flex items-center gap-3">
                <button onClick={() => setView("options")} className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-white hover:bg-slate-700 transition-all"><ArrowLeft className="w-4 h-4" /></button>
                <div className="font-bold text-white text-sm flex-1">Contact Us</div>
                <button onClick={() => setOpen(false)} className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-white hover:bg-slate-700 transition-all"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center"><Phone className="w-5 h-5 text-black" /></div>
                  <div><div className="font-bold text-black text-sm">Phone Support</div><div className="text-black font-extrabold text-sm">+91 766 1989 366</div><div className="text-xs text-gray-400">Mon–Sat · 9AM–8PM IST</div></div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center"><Mail className="w-5 h-5 text-black" /></div>
                  <div><div className="font-bold text-black text-sm">Email Support</div><div className="text-black font-extrabold text-sm">support@visaformula.com</div><div className="text-xs text-gray-400">Response within 2–4 hours</div></div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div className="font-bold text-black text-sm mb-2 flex items-center gap-2"><Calendar className="w-4 h-4 text-black" /> Book a Free Consultation</div>
                  <div className="text-xs text-gray-500 mb-3">30-minute video call with a VisaFormula expert — completely free.</div>
                  <button onClick={() => setView("chat")} className="w-full bg-black text-white font-bold py-2.5 rounded-xl text-xs hover:bg-slate-900 transition-all">Book Now → Free</button>
                </div>
                <button onClick={() => setView("chat")} className="w-full border border-slate-350 text-slate-800 font-bold py-2.5 rounded-xl text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2"><MessageSquare className="w-4 h-4" /> Chat with AI instead</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB Button */}
      <button onClick={() => { setOpen(!open); setView("options"); }} className="fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-2.5 bg-black text-white font-bold px-5 py-3.5 rounded-full shadow-2xl hover:bg-slate-900 transition-all active:scale-[0.98] group border border-slate-800">
        <span className="relative">
          {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
          {!open && <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />}
        </span>
        <span className="text-sm font-semibold">{open ? "Close" : "Talk to Us"}</span>
      </button>
    </>
  );
}

