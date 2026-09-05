import { useState } from "react";
import { CheckCircle, ArrowRight, ArrowLeft, Upload, Globe, FileText, Info, ShieldCheck, Clock } from "lucide-react";

export function VisaFormFilingPortal() {
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState("");
  
  // Step 1: Personal Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Step 2: Visa Details
  const [dest, setDest] = useState("🇺🇸 USA");
  const [visaType, setVisaType] = useState("Tourist");
  const [purpose, setPurpose] = useState("");

  // Submission State
  const [submitted, setSubmitted] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  const scrollToForm = () => {
    document.getElementById("form-order")?.scrollIntoView({ behavior: "smooth" });
  };

  const nextStep = (n: number) => {
    if (n === 2) {
      if (!firstName.trim() || !lastName.trim() || !dob || !passportNo.trim() || !email.trim() || !whatsapp.trim()) {
        showToast("❌ Please fill all required personal details");
        return;
      }
    }
    setStep(n);
    showToast(n < 4 ? `Step ${n} of 4` : "✅ Ready to confirm!");
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("✅ Order placed! Expert assigned.");
  };

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
              📝 Visa Form Filing
            </div>
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#0c1a2e] leading-[1.1] mb-5 tracking-tight">
              We Fill Your Visa<br />
              <span className="bg-gradient-to-r from-red-500 to-[#b91c1c] bg-clip-text text-transparent">
                Application Form.
              </span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-lg leading-relaxed mb-8 font-medium">
              DS-160, VAF, IMM 1294, or any country-specific form — our experts fill it correctly and review it before submission.
            </p>
            <button
              onClick={scrollToForm}
              className="bg-black hover:bg-slate-900 text-white font-bold px-7 py-4 rounded-2xl text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              Get Form Filled →
            </button>
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-white rounded-3xl border border-slate-250 p-7 shadow-2xl">
              <div className="font-sans font-bold text-[#0c1a2e] mb-4 flex items-center gap-2">
                <span>⏱️</span> 12-Hour Delivery Promise
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Order your form filing before 6 PM, and our team will deliver a fully completed, error-free visa application package by 6 AM the next morning.
              </p>
              <div className="h-px bg-slate-100 my-4" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold">✓</div>
                <div className="text-xs text-gray-500">Rapid priority processing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-16 space-y-16">
        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🔍", title: "Profile Analysis First", desc: "Expert studies your profile before filling to answer each question optimally." },
            { icon: "⚠️", title: "Flag Risky Questions", desc: "Our experts know which answers can trigger rejection and advise you properly." },
            { icon: "✅", title: "Double Review", desc: "Every visa form is reviewed twice by independent auditors before delivery." },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{f.icon}</div>
              <div className="font-sans font-bold text-sm text-[#0c1a2e] mb-2">{f.title}</div>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stepper Form Section */}
        <div id="form-order" className="pt-8">
          <span className="text-[11px] font-extrabold text-red-500 tracking-widest block mb-2">Form Order Filing</span>
          <h2 className="font-sans font-extrabold text-[#0c1a2e] text-2xl sm:text-3xl mb-2">Tell Us About Your Application</h2>
          <p className="text-sm text-gray-500 mb-8">Follow our simple 4-step secure panel to get started.</p>

          {/* Step Indicator */}
          <div className="flex items-center max-w-2xl mb-10">
            {[
              { num: 1, label: "Your Details" },
              { num: 2, label: "Visa Details" },
              { num: 3, label: "Upload Docs" },
              { num: 4, label: "Confirm" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    onClick={() => step > s.num && setStep(s.num)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                      step > s.num
                        ? "bg-[#0c1a2e] text-white shadow-sm"
                        : step === s.num
                        ? "bg-white border-2 border-red-500 text-red-500 shadow-md shadow-red-50"
                        : "bg-slate-100 text-gray-400 border border-slate-200"
                    }`}
                  >
                    {step > s.num ? "✓" : s.num}
                  </div>
                  <span className="text-[10px] font-bold mt-1 text-center text-gray-400 hidden sm:block">
                    {s.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 mt-[-14px] transition-all ${
                      step > s.num ? "bg-[#0c1a2e]" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl">
                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="font-sans font-bold text-lg text-black mb-2">Application Received!</h3>
                    <p className="text-sm text-gray-500 mb-6">Our form filling specialist has been assigned. We will compile the details and send the review draft via email.</p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setStep(1);
                        setFirstName("");
                        setLastName("");
                        setDob("");
                        setPassportNo("");
                        setEmail("");
                        setWhatsapp("");
                        setPurpose("");
                      }}
                      className="bg-black hover:bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
                    >
                      Fill New Form
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Step 1 */}
                    {step === 1 && (
                      <div className="space-y-4">
                        <h3 className="font-sans font-bold text-base text-[#0c1a2e] mb-4">Step 1 — Personal Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">First Name</label>
                            <input
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500"
                              placeholder="As on passport"
                              required
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Last Name</label>
                            <input
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500"
                              placeholder="As on passport"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Date of Birth</label>
                            <input
                              type="date"
                              value={dob}
                              onChange={(e) => setDob(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Passport Number</label>
                            <input
                              value={passportNo}
                              onChange={(e) => setPassportNo(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500"
                              placeholder="P1234567"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Email</label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500"
                              placeholder="email@example.com"
                              required
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">WhatsApp Number</label>
                            <input
                              value={whatsapp}
                              onChange={(e) => setWhatsapp(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500"
                              placeholder="+91 98765 43210"
                              required
                            />
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex justify-end">
                          <button
                            type="button"
                            onClick={() => nextStep(2)}
                            className="bg-black hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-1.5 active:scale-[0.98] transition-all"
                          >
                            Continue to Visa Details <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                      <div className="space-y-4">
                        <h3 className="font-sans font-bold text-base text-[#0c1a2e] mb-4">Step 2 — Visa & Travel Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Destination</label>
                            <select
                              value={dest}
                              onChange={(e) => setDest(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394B0C4%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]"
                            >
                              <option>🇺🇸 USA</option>
                              <option>🇬🇧 UK</option>
                              <option>🇨🇦 Canada</option>
                              <option>🇪🇺 Schengen (Europe)</option>
                              <option>🇦🇺 Australia</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Visa Type</label>
                            <select
                              value={visaType}
                              onChange={(e) => setVisaType(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394B0C4%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]"
                            >
                              <option>Tourist</option>
                              <option>Student</option>
                              <option>Work</option>
                              <option>PR / Business</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Purpose of Visit</label>
                          <textarea
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500 resize-none h-24 placeholder:text-gray-300"
                            placeholder="Briefly explain your travel plan..."
                            required
                          />
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex justify-between">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1"
                          >
                            <ArrowLeft className="w-4 h-4" /> Back
                          </button>
                          <button
                            type="button"
                            onClick={() => nextStep(3)}
                            className="bg-black hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-1.5 active:scale-[0.98] transition-all"
                          >
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                      <div className="space-y-4">
                        <h3 className="font-sans font-bold text-base text-[#0c1a2e] mb-2">Step 3 — Upload Documents</h3>
                        <p className="text-xs text-gray-400 mb-4">Please upload scanned copies of your passport bio page and passport-size photo.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Passport bio page</label>
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                              <Upload className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                              <span className="text-[11px] font-bold text-black block">Upload Passport Scan</span>
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Passport Photo</label>
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                              <Upload className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                              <span className="text-[11px] font-bold text-black block">Upload Photo</span>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex justify-between">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1"
                          >
                            <ArrowLeft className="w-4 h-4" /> Back
                          </button>
                          <button
                            type="button"
                            onClick={() => nextStep(4)}
                            className="bg-black hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-1.5 active:scale-[0.98] transition-all"
                          >
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 4 */}
                    {step === 4 && (
                      <div className="space-y-4">
                        <h3 className="font-sans font-bold text-base text-[#0c1a2e] mb-4">Step 4 — Confirm & Start</h3>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5 text-sm font-semibold">
                          <div className="flex justify-between text-gray-500">
                            <span>Service Type</span>
                            <span className="text-black">Visa Form Filing</span>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>Destination</span>
                            <span className="text-black">{dest}</span>
                          </div>
                          <div className="h-px bg-slate-200 my-1" />
                          <div className="flex justify-between text-base font-bold text-[#0c1a2e]">
                            <span>Booking Summary</span>
                            <span className="text-red-500">Ready to Order</span>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1"
                          >
                            <ArrowLeft className="w-4 h-4" /> Back
                          </button>
                          <button
                            onClick={handleOrder}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold px-7 py-3 rounded-xl text-xs flex items-center gap-1.5 shadow-md active:scale-[0.98]"
                          >
                            Confirm & Start Filing <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-emerald-50 border border-emerald-150 rounded-3xl p-6 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 mb-1">Verified Accuracy</h4>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">
                    If your visa is rejected due to a form-filling error made by our experts, we will refund the service fee 100%.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex gap-3 items-start">
                <Clock className="w-5 h-5 text-[#0c1a2e] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0c1a2e] mb-1">12-Hour Delivery Promise</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Order before 6 PM, and we will deliver a submission-ready draft by 6 AM the next day.
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
