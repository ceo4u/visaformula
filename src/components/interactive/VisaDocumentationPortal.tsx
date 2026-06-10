import { useState } from "react";
import { CheckCircle, AlertTriangle, Upload, ArrowRight, ShieldCheck, FileText, Sparkles, Check, Globe } from "lucide-react";

type VisaCountry = "canada" | "uk" | "uae" | "aus" | "sch";

type DocumentItem = {
  name: string;
  desc: string;
  icon: string;
  status: "ready" | "missing";
};

const checklists: Record<VisaCountry, { title: string; docs: DocumentItem[] }> = {
  canada: {
    title: "🇨🇦 Canada Student Visa",
    docs: [
      { name: "Valid Passport", desc: "Min 6 months validity · All pages scanned", icon: "🛂", status: "ready" },
      { name: "Passport-Size Photos", desc: "2 photos · White background · 35mm × 45mm", icon: "📸", status: "ready" },
      { name: "Proof of Funds", desc: "Bank statements showing CAD $10,000+ · Notarised", icon: "🏦", status: "missing" },
      { name: "Statement of Purpose (SOP)", desc: "500–1000 words · Why Canada, career goals", icon: "✍️", status: "missing" },
    ],
  },
  uk: {
    title: "🇬🇧 UK Student Visa",
    docs: [
      { name: "Valid Passport", desc: "Min 6 months validity · Scan of bio page", icon: "🛂", status: "ready" },
      { name: "CAS Letter", desc: "Confirmation of Acceptance for Studies from UK university", icon: "📋", status: "missing" },
      { name: "Tuberculosis Test Certificate", desc: "From UKVI approved clinic", icon: "🩺", status: "missing" },
    ],
  },
  uae: {
    title: "🇦🇪 UAE Tourist Visa",
    docs: [
      { name: "Passport Copy", desc: "Clear colour scan of first & last page", icon: "🛂", status: "ready" },
      { name: "Passport Photo", desc: "White background, no glasses", icon: "📸", status: "ready" },
      { name: "Hotel Booking", desc: "Confirmed stay booking in UAE", icon: "🏨", status: "missing" },
    ],
  },
  aus: {
    title: "🇦🇺 Australia Work Visa",
    docs: [
      { name: "Passport", desc: "Scan of valid passport bio page", icon: "🛂", status: "ready" },
      { name: "Skill Assessment", desc: "Approved assessment result by relevant body", icon: "📜", status: "missing" },
      { name: "English Score", desc: "IELTS / PTE scorecard", icon: "🗣️", status: "missing" },
    ],
  },
  sch: {
    title: "🇪🇺 Schengen Tourist Visa",
    docs: [
      { name: "Passport", desc: "Min 2 blank pages, 3 months validity beyond return", icon: "🛂", status: "ready" },
      { name: "Travel Insurance", desc: "Minimum €30,000 coverage for medical emergencies", icon: "🩺", status: "missing" },
      { name: "Flight Reservation", desc: "Round trip flight details", icon: "✈️", status: "missing" },
    ],
  },
};

export function VisaDocumentationPortal() {
  const [activeTab, setActiveTab] = useState<VisaCountry>("canada");
  const [docList, setDocList] = useState(checklists);
  const [toast, setToast] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [dest, setDest] = useState("Canada");
  const [visaType, setVisaType] = useState("Student Visa");
  const [orderDone, setOrderDone] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  const scrollToOrder = () => {
    document.getElementById("doc-order")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleDocStatus = (country: VisaCountry, index: number) => {
    setDocList((prev) => {
      const copy = { ...prev };
      const currentDocs = [...copy[country].docs];
      const doc = { ...currentDocs[index] };
      doc.status = doc.status === "ready" ? "missing" : "ready";
      currentDocs[index] = doc;
      copy[country] = { ...copy[country], docs: currentDocs };
      return copy;
    });
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !whatsapp.trim()) {
      showToast("❌ Please fill all required fields");
      return;
    }
    setOrderDone(true);
    showToast("✅ Order placed! Expert assigned.");
  };

  const currentChecklist = docList[activeTab];
  const readyCount = currentChecklist.docs.filter((d) => d.status === "ready").length;
  const totalCount = currentChecklist.docs.length;
  const progressPct = Math.round((readyCount / totalCount) * 100);

  return (
    <div className="bg-white min-h-screen text-black font-sans pb-24">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c1a2e] text-white px-6 py-3 rounded-full text-xs font-bold z-50 shadow-xl transition-all duration-300">
          {toast}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50/50 via-red-50/20 to-white pt-20 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 text-xs font-bold text-red-600 mb-6">
              <Sparkles className="w-3.5 h-3.5" /> 📂 Visa Documentation Filing
            </div>
            <h1 className="font-sora font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#0c1a2e] leading-[1.1] mb-5 tracking-tight">
              We Prepare Your<br />
              <span className="bg-gradient-to-r from-red-500 to-[#b91c1c] bg-clip-text text-transparent">
                Visa Documents.
              </span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-lg leading-relaxed mb-8 font-medium">
              Submit the right documents, in the right format, with zero errors. Our experts and AI verify everything before your application goes in.
            </p>
            <button
              onClick={scrollToOrder}
              className="bg-black hover:bg-slate-900 text-white font-bold px-7 py-4 rounded-2xl text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              Start Documentation →
            </button>
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-white rounded-3xl border border-slate-250 p-7 shadow-2xl">
              <div className="font-sora font-bold text-[#0c1a2e] mb-4 flex items-center gap-2">
                <span>🛡️</span> Free Redo Guarantee
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                If your visa is rejected due to any documentation error made by our experts, we will redo the entire filing service completely free of charge.
              </p>
              <div className="h-px bg-slate-100 my-4" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold">✓</div>
                <div className="text-xs text-gray-500">Verified by Visara Audit Operations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-white border-y border-slate-100 py-6">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-100">
          {[
            { value: "120+", label: "Countries" },
            { value: "50+", label: "Visa Types" },
            { value: "24 Hours", label: "Fast Delivery" },
            { value: "99.4%", label: "Accuracy Rate" },
          ].map((stat, i) => (
            <div key={stat.label} className={i > 0 ? "pl-4" : ""}>
              <div className="font-sora font-extrabold text-2xl md:text-3xl text-red-500">{stat.value}</div>
              <div className="text-xs text-gray-400 font-semibold mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16 space-y-16">
        {/* Features Grid */}
        <div>
          <span className="text-[11px] font-extrabold text-red-500 uppercase tracking-widest block mb-2">Our Service Features</span>
          <h2 className="font-sora font-extrabold text-[#0c1a2e] text-2xl sm:text-3xl mb-8">What is included in Documentation?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🔍", title: "AI Document Check", desc: "Upload your documents — our AI scans for errors, missing items, incorrect formats instantly." },
              { icon: "📋", title: "Custom Checklist", desc: "Country-specific and visa-type-specific document list — no generic lists." },
              { icon: "🧑‍💼", title: "Expert Review", desc: "A verified immigration expert reviews your complete package before submission." },
              { icon: "📄", title: "Cover Letter Writing", desc: "Professional cover letter tailored to your visa type and destination." },
              { icon: "✍️", title: "SOP / Personal Statement", desc: "Statement of Purpose written and refined by expert writers." },
              { icon: "📦", title: "Submission Package", desc: "All documents organised in correct order, ready for submission." },
            ].map((f) => (
              <div key={f.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{f.icon}</div>
                <div className="font-sora font-bold text-sm text-[#0c1a2e] mb-2">{f.title}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Document Checklist */}
        <div>
          <span className="text-[11px] font-extrabold text-red-500 uppercase tracking-widest block mb-2">Interactive Tool</span>
          <h2 className="font-sora font-extrabold text-[#0c1a2e] text-2xl sm:text-3xl mb-2">What Documents Do You Need?</h2>
          <p className="text-sm text-gray-500 mb-6">Select your destination and visa type to preview the required documentation. Click items to toggle status.</p>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {(Object.keys(checklists) as VisaCountry[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-black text-white border-transparent"
                    : "bg-white text-gray-500 border-slate-200 hover:border-red-500"
                }`}
              >
                {checklists[tab].title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-3">
              {currentChecklist.docs.map((doc, idx) => (
                <div
                  key={doc.name}
                  onClick={() => toggleDocStatus(activeTab, idx)}
                  className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer hover:shadow-sm transition-all ${
                    doc.status === "ready"
                      ? "border-emerald-150 bg-emerald-50/20"
                      : "border-red-100 bg-red-50/10"
                  }`}
                >
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-lg shrink-0">
                    {doc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-[#0c1a2e]">{doc.name}</div>
                    <div className="text-xs text-gray-400 truncate">{doc.desc}</div>
                  </div>
                  <div className="shrink-0 text-xs font-bold">
                    {doc.status === "ready" ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Ready
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Missing
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
              <h3 className="font-sora font-bold text-sm text-[#0c1a2e] mb-3">Checklist Progress</h3>
              <div className="flex justify-between text-xs text-gray-400 font-bold mb-2">
                <span>Documents Ready</span>
                <span>{readyCount} of {totalCount}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-4">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Need help preparing the missing documents? Order our documentation filing service below to get them done by an expert.
              </p>
            </div>
          </div>
        </div>

        {/* Order Section */}
        <div id="doc-order" className="pt-8">
          <span className="text-[11px] font-extrabold text-red-500 uppercase tracking-widest block mb-2">Order Service</span>
          <h2 className="font-sora font-extrabold text-[#0c1a2e] text-2xl sm:text-3xl mb-8">Start Your Documentation Service</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl">
                {orderDone ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="font-sora font-bold text-lg text-black mb-2">Order Received!</h3>
                    <p className="text-sm text-gray-500 mb-6">A document filing expert is analyzing your details and will connect via WhatsApp within 2 hours.</p>
                    <button
                      onClick={() => setOrderDone(false)}
                      className="bg-black hover:bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
                    >
                      New Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleOrder} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-1.5">Full Name</label>
                        <input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500"
                          placeholder="Rahul Kumar"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-1.5">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500"
                          placeholder="rahul@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-1.5">WhatsApp Number</label>
                        <input
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500"
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-1.5">Destination</label>
                        <select
                          value={dest}
                          onChange={(e) => setDest(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394B0C4%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]"
                        >
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>United States</option>
                          <option>Australia</option>
                          <option>Schengen (Europe)</option>
                          <option>UAE</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-1.5">Visa Type</label>
                        <select
                          value={visaType}
                          onChange={(e) => setVisaType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394B0C4%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]"
                        >
                          <option>Student Visa</option>
                          <option>Tourist / Visitor</option>
                          <option>Work Permit</option>
                          <option>PR / Settlement</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-2">Upload Files You Have (Optional)</label>
                      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-[#0c1a2e] mb-0.5">Drop files here or click to browse</p>
                        <p className="text-[10px] text-gray-400">PDF, JPG, PNG · Max 10MB each</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-2xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      Place Order <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="text-center text-[10px] text-gray-450 font-bold uppercase tracking-wider mt-2">
                      🔒 Escrow protected · Expert assigned within 2 hours
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 border border-slate-250 rounded-3xl p-6">
                <h3 className="font-sora font-bold text-sm text-[#0c1a2e] mb-4">What Happens After You Order</h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Order placed & expert assigned", time: "Within 2 hours" },
                    { step: "2", title: "AI + Expert document review", time: "Errors flagged" },
                    { step: "3", title: "Final package delivered", time: "Submission-ready PDF" },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-3 items-start">
                      <div className="w-7 h-7 bg-red-50 text-red-600 border border-red-100 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                        {s.step}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#0c1a2e]">{s.title}</div>
                        <div className="text-[10px] text-gray-400 font-semibold">{s.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 mb-1">Free Redo Guarantee</h4>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">
                    If visa is rejected due to our documentation error, we will redo the entire service completely free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
