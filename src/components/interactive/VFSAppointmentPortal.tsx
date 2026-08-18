import { useState } from "react";
import { CheckCircle, Calendar, MapPin, Clock, Search, ShieldCheck, Check, Globe, ArrowRight } from "lucide-react";

type City = "Mumbai" | "Delhi" | "Bangalore" | "Chennai" | "Kolkata" | "Pune";

const centresData: Record<City, { title: string; count: string; type: string; icon: string }> = {
  Mumbai: { title: "Mumbai", count: "3 centres", type: "🏙️", icon: "🏙️" },
  Delhi: { title: "Delhi / NCR", count: "4 centres", type: "🏛️", icon: "🏛️" },
  Bangalore: { title: "Bangalore", count: "2 centres", type: "🌆", icon: "🌆" },
  Chennai: { title: "Chennai", count: "2 centres", type: "🏖️", icon: "🏖️" },
  Kolkata: { title: "Kolkata", count: "2 centres", type: "🌉", icon: "🌉" },
  Pune: { title: "Pune", count: "1 centre", type: "🏞️", icon: "🏞️" },
};

const slotsData = [
  { time: "09:00 AM – 10:00 AM", status: "available" },
  { time: "10:00 AM – 11:00 AM", status: "available" },
  { time: "11:00 AM – 12:00 PM", status: "full" },
  { time: "01:00 PM – 02:00 PM", status: "available" },
  { time: "02:00 PM – 03:00 PM", status: "available" },
  { time: "03:00 PM – 04:00 PM", status: "full" },
];

export function VFSAppointmentPortal() {
  const [selectedCity, setSelectedCity] = useState<City>("Mumbai");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [toast, setToast] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  const scrollToBooking = () => {
    document.getElementById("vfs-booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !selectedDate || !selectedSlot) {
      showToast("❌ Please fill all fields and select a slot");
      return;
    }
    setSubmitted(true);
    showToast(`✅ VFS Slot booked successfully at VFS ${selectedCity}!`);
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
              🗓️ VFS Appointment Booking
            </div>
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#0c1a2e] leading-[1.1] mb-5 tracking-tight">
              Book Your VFS<br />
              <span className="bg-gradient-to-r from-red-500 to-[#b91c1c] bg-clip-text text-transparent">
                Biometric Appointment.
              </span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-lg leading-relaxed mb-8 font-medium">
              We monitor VFS Global slot availability and book your appointment the moment a slot opens.
            </p>
            <button
              onClick={scrollToBooking}
              className="bg-black hover:bg-slate-900 text-white font-bold px-7 py-4 rounded-2xl text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              Book Appointment →
            </button>
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-white rounded-3xl border border-slate-250 p-7 shadow-2xl">
              <div className="font-sans font-bold text-[#0c1a2e] mb-4 flex items-center gap-2">
                <span>⚡</span> Instant Slot Monitoring
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Visa appointment slots release randomly. Our automated tracking monitors VFS 24/7 and books your biometric slot instantly.
              </p>
              <div className="h-px bg-slate-100 my-4" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold">✓</div>
                <div className="text-xs text-gray-500">Fast tracking & booking system</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-white border-y border-slate-100 py-6">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-6 text-center divide-x divide-slate-100">
          {[
            { value: "18+", label: "VFS Centres" },
            { value: "12,000+", label: "Appointments Booked" },
            { value: "98%", label: "On-Time Slot Success" },
          ].map((stat, i) => (
            <div key={stat.label} className={i > 0 ? "pl-4" : ""}>
              <div className="font-sans font-extrabold text-2xl md:text-3xl text-red-500">{stat.value}</div>
              <div className="text-xs text-gray-400 font-semibold mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16 space-y-16">
        {/* Process Guide */}
        <div>
          <span className="text-[11px] font-extrabold text-red-500 tracking-widest block mb-2">VFS Process</span>
          <h2 className="font-sans font-extrabold text-[#0c1a2e] text-2xl sm:text-3xl mb-8">What happens at VFS Global?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🖐️", title: "Biometrics Collection", desc: "Fingerprints and photo captured for official visa processing databases." },
              { icon: "📁", title: "Document Submission", desc: "Physical documents and passport scans submitted directly at VFS centre counter." },
              { icon: "🛂", title: "Passport Collection", desc: "After visa decision, passport collected from VFS or returned via premium courier." },
            ].map((f) => (
              <div key={f.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="text-3xl mb-4">{f.icon}</div>
                <div className="font-sans font-bold text-sm text-[#0c1a2e] mb-2">{f.title}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* VFS Centre Selection */}
        <div>
          <span className="text-[11px] font-extrabold text-red-500 tracking-widest block mb-2">Centre Selection</span>
          <h2 className="font-sans font-extrabold text-[#0c1a2e] text-2xl sm:text-3xl mb-6">Select Your Nearest VFS Centre</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {(Object.keys(centresData) as City[]).map((city) => {
              const centre = centresData[city];
              const isSelected = selectedCity === city;
              return (
                <div
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`border rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all text-center ${
                    isSelected
                      ? "border-red-500 bg-red-50/20"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="text-2xl mb-2">{centre.icon}</div>
                  <div className="font-bold text-xs text-[#0c1a2e] mb-0.5">{centre.title}</div>
                  <div className="text-[10px] text-gray-400 font-semibold">{centre.count}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Form and Slots */}
        <div id="vfs-booking-form" className="pt-8">
          <span className="text-[11px] font-extrabold text-red-500 tracking-widest block mb-2">Slot Booking</span>
          <h2 className="font-sans font-extrabold text-[#0c1a2e] text-2xl sm:text-3xl mb-8">Schedule Your Biometric Slot</h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl">
                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="font-sans font-bold text-lg text-black mb-2">Appointment Request Submitted!</h3>
                    <p className="text-sm text-gray-500 mb-6">We have initiated VFS slot tracking for {fullName} in VFS {selectedCity}. Our operations team will alert you via email once slot is locked.</p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFullName("");
                        setEmail("");
                        setPhone("");
                        setPassportNo("");
                        setSelectedDate("");
                        setSelectedSlot("");
                      }}
                      className="bg-black hover:bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
                    >
                      Book Another Slot
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBook} className="space-y-5">
                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Full Name</label>
                        <input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500"
                          placeholder="As on passport"
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Email Address</label>
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
                        <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Phone Number</label>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500"
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div>
                      <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-1.5">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94B0C4] pointer-events-none" />
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-black outline-none focus:border-red-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Slot Picker */}
                    <div>
                      <label className="text-[10px] font-medium tracking-normal text-gray-400 block mb-2">Available Time Slots</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {slotsData.map((slot) => {
                          const isFull = slot.status === "full";
                          const isSelected = selectedSlot === slot.time;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={isFull}
                              onClick={() => setSelectedSlot(slot.time)}
                              className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                                isFull
                                  ? "bg-slate-100 border-slate-200 text-gray-400 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-red-500 text-white border-transparent shadow-sm"
                                  : "bg-white border-slate-200 text-[#0c1a2e] hover:border-red-500"
                              }`}
                            >
                              {slot.time} {isFull && "· Full"}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-2xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      Book Appointment <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="text-center text-[10px] text-gray-450 font-bold tracking-wider mt-2">
                      🔒 Escrow protected · Instant Slot Alerts
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                <h3 className="font-sans font-bold text-sm text-[#0c1a2e] mb-3">Appointment Checklist</h3>
                <p className="text-xs text-gray-400 mb-4">Ensure you bring the following files to VFS centre:</p>
                <div className="space-y-3 text-xs font-semibold text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-red-50 border border-red-150 flex items-center justify-center text-red-500 font-bold">✓</span>
                    Original Passport (current & previous)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-red-50 border border-red-150 flex items-center justify-center text-red-500 font-bold">✓</span>
                    VFS Appointment Confirmation Letter
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-red-50 border border-red-150 flex items-center justify-center text-red-500 font-bold">✓</span>
                    Printout of Completed Visa Form
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-red-50 border border-red-150 flex items-center justify-center text-red-500 font-bold">✓</span>
                    KYC Documents & Passport size photos
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 mb-1">Guaranteed Slot Matching</h4>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">
                    We track appointments 24/7. If no slot matches your selected window, we book the closest alternative or issue a full refund.
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
