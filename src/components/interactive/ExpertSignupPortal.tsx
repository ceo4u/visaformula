import { useState } from "react";
import { 
  CheckCircle, ArrowLeft, ArrowRight, Upload, Plus, X, 
  User, FileText, Globe, Star, Shield, ArrowUpRight, 
  MessageSquare, Briefcase, Mail, Phone, ExternalLink, 
  Percent, Award, Image as ImageIcon, Sparkles, Building, 
  CreditCard, Settings, ChevronRight, Layers, Search, 
  Calendar, LogOut, CheckSquare, TrendingUp, Bookmark, Bell, Clock
} from "lucide-react";
import airplanePaths from "../../data/clean_airplane.json";
import checkmarkPaths from "../../data/clean_checkmark.json";

export function ExpertSignupPortal() {
  const [step, setStep] = useState(1); // 1: Initial Reg, 2: Profile Complete, 3: Dashboard View
  
  // Tab states for Dashboard
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, profile, inquiries, cases, upgrade, photos

  // --- Phase 1 States ---
  const [businessName, setBusinessName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [consultantType, setConsultantType] = useState("Freelancer");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [expertCategory, setExpertCategory] = useState("Student visa expert");
  const [expertAddress, setExpertAddress] = useState("");

  // --- Phase 2 States ---
  // Freelancer specific
  const [smmAccounts, setSmmAccounts] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  
  // Corporate specific
  const [govRegNumber, setGovRegNumber] = useState("");
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [officeAddress, setOfficeAddress] = useState("");

  // Shared Features Matrix
  const [newTag, setNewTag] = useState("");
  const [expertiseTags, setExpertiseTags] = useState(["Study Visa", "Express Entry", "Visa Appeal"]);
  const [countriesExpertise, setCountriesExpertise] = useState("Canada, Australia, UK");
  const [pastSuccessText, setPastSuccessText] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=100&fit=crop&q=60",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=150&h=100&fit=crop&q=60"
  ]);
  const [escrowAccepted, setEscrowAccepted] = useState(true);
  const [subscribeUpdates, setSubscribeUpdates] = useState("Yes");

  // --- Verification functions ---
  const handleSendOtp = () => {
    if (!email) return;
    setVerifyingEmail(true);
    setTimeout(() => {
      setOtpSent(true);
      setVerifyingEmail(false);
    }, 800);
  };

  const handleVerifyOtp = () => {
    if (otpValue === "123456" || otpValue.length > 2) {
      setEmailVerified(true);
      setOtpSent(false);
    }
  };

  // --- Tag Helpers ---
  const addTag = () => {
    if (newTag && !expertiseTags.includes(newTag)) {
      setExpertiseTags([...expertiseTags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setExpertiseTags(expertiseTags.filter(t => t !== tag));
  };

  // Mock Active Cases & Inquiries
  const [inquiries, setInquiries] = useState([
    { id: 1, name: "Arjun Mehta", type: "Student Visa Study permit query", country: "UK", time: "2 hrs ago", message: "Need support for high-priority admission at University of London." },
    { id: 2, name: "Sarah Jenkins", type: "Express Entry points boost", country: "Canada", time: "5 hrs ago", message: "My CRS is 465. I want to check provincial nomination setups." }
  ]);

  const [activeCases, setActiveCases] = useState([
    { id: 1, name: "Prashant Kumar", visa: "Canada Work Permit", status: "In-Progress (Biometrics Pending)", escrow: "₹18,500 Secured", progress: 65 },
    { id: 2, name: "Sneha Reddy", visa: "US H-1B Cap Registration", status: "Reviewing LCA Documents", escrow: "₹25,000 Secured", progress: 40 }
  ]);

  // Form submits
  const handleProceedToPhase2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !contactNumber) {
      alert("Please fill in Business Name and Contact Number.");
      return;
    }
    setStep(2);
  };

  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    "VisaExpert_License_2026.pdf",
    "Customer_Success_Case_CA.jpg"
  ]);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDiscount, setOfferDiscount] = useState("");
  const [membershipTier, setMembershipTier] = useState("Standard Directory");

  const [adsList, setAdsList] = useState<Array<{title: string, desc: string}>>([]);
  const [offersList, setOffersList] = useState<Array<{title: string, discount: string}>>([]);

  const handleLaunchDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (adTitle) {
      setAdsList([...adsList, { title: adTitle, desc: adDescription }]);
      setAdTitle("");
      setAdDescription("");
      setShowAdModal(false);
    }
  };

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (offerTitle) {
      setOffersList([...offersList, { title: offerTitle, discount: offerDiscount }]);
      setOfferTitle("");
      setOfferDiscount("");
      setShowOfferModal(false);
    }
  };

  const handleAcceptInquiry = (id: number) => {
    const inq = inquiries.find(item => item.id === id);
    if (inq) {
      const newCase = {
        id: Date.now(),
        name: inq.name,
        visa: inq.type,
        status: "milestone initialized",
        escrow: "₹15,000 Secured",
        progress: 10
      };
      setActiveCases([...activeCases, newCase]);
      setInquiries(inquiries.filter(item => item.id !== id));
    }
  };

  const handleFileUpload = (fileName: string) => {
    setUploadedFiles([...uploadedFiles, fileName]);
  };

  const avatarPresets = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80"
  ];

  return (
    <div className="min-h-screen text-[#111111] flex flex-col justify-between selection:bg-black selection:text-white" style={{ 
      background: "radial-gradient(circle at 90% 10%, rgba(253, 244, 215, 0.45) 0%, transparent 40%), radial-gradient(circle at 10% 90%, rgba(224, 231, 255, 0.4) 0%, transparent 40%), #fafbfc"
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes premiumFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.995);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-premium-fade {
          animation: premiumFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
      
      {step < 3 && (
        <header className="w-full max-w-7xl mx-auto px-8 pt-2 flex items-center justify-between font-sans">
          <a href="/" className="flex items-center gap-2">
              <svg className="w-36 h-auto" viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
                  {/* Centered airplane swoop above the wordmark */}
                  <g transform="translate(45, -145) scale(0.68)">
                      {airplanePaths.map((p: any, idx: number) => (
                          <path key={idx} d={p.d} fill={p.fill} transform={p.transform} />
                      ))}
                  </g>
                  
                  {/* Wordmark */}
                  <text x="350" y="235" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Montserrat', sans-serif" font-weight="900" font-size="82" letter-spacing="0.02em">
                      <tspan fill="#111111" stroke="#111111" stroke-width="3">VISA</tspan>
                      <tspan fill="#0F2B6C" stroke="#0F2B6C" stroke-width="3">FORMULA</tspan>
                  </text>
                  
                  {/* Tagline */}
                  <text x="350" y="300" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Montserrat', sans-serif" font-weight="800" font-size="24" letter-spacing="0.25em" fill="#0F2B6C">
                      GLOBAL VISA MARKETPLACE
                  </text>
              </svg>
          </a>
          <div className="text-sm font-semibold text-slate-500">
            Already a member? <a href="/login" className="text-black font-extrabold hover:underline">Login</a>
          </div>
        </header>
      )}

      {step < 3 ? (
        <div className="flex-grow flex flex-col justify-start py-6 px-6 max-w-4xl w-full mx-auto">
          <div className="text-center my-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2">Let's get you started</h1>
            <p className="text-sm text-slate-400 font-semibold">Enter your details to initialize your portal</p>
          </div>

          <div className="flex items-center justify-center gap-8 my-8 font-sans">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                step > 1 ? "bg-emerald-500 text-white" : "bg-[#1C1C1E] text-white shadow-sm"
              }`}>
                {step > 1 ? "✓" : "1"}
              </div>
              <span className={`text-sm font-bold ${step === 1 ? "text-black" : "text-slate-400"}`}>
                General Details
              </span>
            </div>
            
            <div className={`h-0.5 w-16 md:w-24 transition-all ${step > 1 ? "bg-emerald-500" : "bg-slate-200"}`}></div>

            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                step === 2 
                  ? "bg-[#1C1C1E] text-white shadow-sm" 
                  : "border border-slate-200 bg-white text-slate-400"
              }`}>
                2
              </div>
              <span className={`text-sm font-bold ${step === 2 ? "text-black" : "text-slate-400"}`}>
                Credentials & Service
              </span>
            </div>
          </div>

          <div className="w-full mx-auto transition-all duration-300 font-sans mt-4">
            {step === 1 && (
              <form onSubmit={handleProceedToPhase2} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 block">Verify Email*</label>
                    <div className="flex gap-3.5">
                      <div className="relative flex-grow">
                        <input 
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your Email Address" 
                          disabled={emailVerified}
                          className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 disabled:bg-slate-50 transition-all shadow-sm"
                        />
                        {emailVerified && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                            <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      {!emailVerified && (
                        <button 
                          type="button"
                          onClick={handleSendOtp}
                          className="bg-black hover:bg-slate-900 text-white text-sm font-semibold px-6 py-4 rounded-xl active:scale-95 transition-all shadow-sm"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                    {emailVerified && (
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 mt-1">
                        ✓ Verified successfully
                      </span>
                    )}
                    {otpSent && (
                      <div className="mt-3 flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 animate-fadeIn">
                        <input 
                          value={otpValue}
                          onChange={(e) => setOtpValue(e.target.value)}
                          placeholder="Enter OTP (123456)" 
                          className="w-36 px-4 py-2.5 bg-white border border-slate-250 rounded-lg text-sm outline-none text-center font-medium"
                        />
                        <button 
                          type="button"
                          onClick={handleVerifyOtp}
                          className="bg-black hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                        >
                          Confirm
                        </button>
                        <span className="text-xs font-semibold text-black animate-pulse ml-1">OTP Sent</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 block">Type of Consultant*</label>
                    <div className="relative">
                      <select 
                        value={consultantType} 
                        onChange={(e) => setConsultantType(e.target.value)} 
                        className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black cursor-pointer appearance-none shadow-sm"
                      >
                        <option value="Freelancer">Freelancer</option>
                        <option value="Business Expert">Business expert</option>
                        <option value="Institute or company">Institute or company</option>
                        <option value="Legal professional">Legal professional</option>
                        <option value="Supportive business">Supportive business</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-550">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 block">Business Name*</label>
                    <input 
                      required
                      value={businessName} 
                      onChange={(e) => setBusinessName(e.target.value)} 
                      placeholder="Enter your Business Name" 
                      className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 block">Contact Number*</label>
                    <input 
                      required
                      value={contactNumber} 
                      onChange={(e) => setContactNumber(e.target.value)} 
                      placeholder="Enter your Contact Number" 
                      className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 block">Website (Optional)</label>
                    <input 
                      value={website} 
                      onChange={(e) => setWebsite(e.target.value)} 
                      placeholder="Enter website link" 
                      className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 block">Facebook / Social (Optional)</label>
                    <input 
                      value={facebookLink} 
                      onChange={(e) => setFacebookLink(e.target.value)} 
                      placeholder="Enter social link" 
                      className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 block">Expert In (Category)*</label>
                    <div className="relative">
                      <select 
                        required
                        value={expertCategory} 
                        onChange={(e) => setExpertCategory(e.target.value)} 
                        className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black cursor-pointer appearance-none shadow-sm"
                      >
                        <option value="Student visa expert">Student visa expert</option>
                        <option value="Visa filing expert">Visa filing expert</option>
                        <option value="Visit visa expert">Visit visa expert</option>
                        <option value="Job visa expert">Job visa expert</option>
                        <option value="PR And Migration expert">PR And Migration expert</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-550">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700 block">Practice / Office Address*</label>
                    <input 
                      required
                      value={expertAddress} 
                      onChange={(e) => setExpertAddress(e.target.value)} 
                      placeholder="Enter your Office Address or Practice Location" 
                      className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                    />
                  </div>
                </div>

                <div className="pt-8 flex justify-center">
                  <button 
                    type="submit"
                    className="bg-[#111111] hover:bg-black text-white px-12 py-4 rounded-xl text-base font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleLaunchDashboard} className="space-y-10">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-150 flex items-center justify-between text-sm shadow-sm">
                  <span className="text-slate-750 font-semibold text-slate-700">Selected Consultant Category: <strong className="text-black font-bold uppercase">{consultantType}</strong></span>
                  {consultantType === "Freelancer" ? (
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-250 uppercase font-semibold">Verification Documents: Optional</span>
                  ) : (
                    <span className="text-[10px] bg-red-50 text-red-700 px-3 py-1 rounded-lg border border-red-200 uppercase font-semibold">Verification Documents: Required</span>
                  )}
                </div>

                <div className="bg-white border border-slate-150 rounded-xl p-6 shadow-sm space-y-4">
                  <span className="text-sm font-semibold text-slate-800 block">Choose Profile Photo / Upload</span>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <label className="group relative w-20 h-20 rounded-full border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center flex-shrink-0 cursor-pointer hover:border-slate-400 transition-all shadow-inner">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="profile" className="w-full h-full object-cover group-hover:opacity-85 transition-opacity" />
                      ) : (
                        <User className="w-10 h-10 text-slate-350 group-hover:text-slate-500 transition-colors" />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[10px] font-semibold">
                        <Upload className="w-4 h-4 mb-0.5" />
                        <span>Upload</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setProfilePhoto(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <div className="flex-grow space-y-3">
                      <span className="text-xs font-semibold text-slate-500 block">Select a Preset Professional Avatar:</span>
                      <div className="flex gap-2 flex-wrap items-center">
                        {avatarPresets.map((presetUrl, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setProfilePhoto(presetUrl)}
                            className={`w-10 h-10 rounded-full border overflow-hidden transition-all ${profilePhoto === presetUrl ? "border-black ring-2 ring-black scale-105" : "border-slate-200 hover:border-slate-400"}`}
                          >
                            <img src={presetUrl} alt="preset" className="w-full h-full object-cover" />
                          </button>
                        ))}
                        
                        <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>

                        <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all active:scale-95 shadow-sm">
                          <Upload className="w-3.5 h-3.5" />
                          Upload Custom Photo
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setProfilePhoto(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {consultantType === "Freelancer" ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 block">Social Media Accounts / Portfolio Links</label>
                        <input 
                          value={smmAccounts}
                          onChange={(e) => setSmmAccounts(e.target.value)}
                          placeholder="e.g. Behance, LinkedIn" 
                          className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 block">Personal Portfolio / Website</label>
                        <input 
                          value={portfolioLink}
                          onChange={(e) => setPortfolioLink(e.target.value)}
                          placeholder="e.g. https://portfolio.com" 
                          className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700 block">About Section / Brief Bio</label>
                        <textarea 
                          value={aboutMe}
                          onChange={(e) => setAboutMe(e.target.value)}
                          rows={4}
                          placeholder="Briefly describe your freelance services and achievements..." 
                          className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black resize-none placeholder:text-slate-400 shadow-sm"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 block">Government Registration Number / License *</label>
                        <input 
                          required
                          value={govRegNumber}
                          onChange={(e) => setGovRegNumber(e.target.value)}
                          placeholder="Enter Registration No" 
                          className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 block">License Copy Document Upload *</label>
                        <button 
                          type="button" 
                          onClick={() => setLicenseUploaded(true)}
                          className={`w-full py-4 border-2 border-dashed rounded-xl text-sm font-semibold transition-all shadow-sm ${licenseUploaded ? "bg-slate-100 border-black text-black" : "border-slate-250 hover:bg-slate-50 text-slate-500"}`}
                        >
                          {licenseUploaded ? "✓ License Document Attached" : "Upload Document File (PDF / JPG)"}
                        </button>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700 block">Physical Verified Office Address *</label>
                        <input 
                          required
                          value={officeAddress}
                          onChange={(e) => setOfficeAddress(e.target.value)}
                          placeholder="Enter complete office location" 
                          className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t border-slate-150 pt-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 block">Areas of Expertise (Tags)</label>
                      <div className="flex gap-2.5">
                        <input 
                          value={newTag} 
                          onChange={(e) => setNewTag(e.target.value)} 
                          placeholder="e.g. Work Visa" 
                          className="w-full px-4 py-3 bg-white border border-slate-250 rounded-xl text-sm outline-none focus:border-black shadow-sm"
                        />
                        <button type="button" onClick={addTag} className="bg-[#111111] hover:bg-black text-white text-xs px-5 py-3 rounded-xl font-semibold active:scale-95 transition-all shadow-sm">Add</button>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {expertiseTags.map(tag => (
                          <span key={tag} className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-xs">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="text-slate-400 hover:text-black font-bold">×</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 block">Countries of Expertise</label>
                      <input 
                        value={countriesExpertise}
                        onChange={(e) => setCountriesExpertise(e.target.value)}
                        placeholder="e.g. Canada, UK, Australia" 
                        className="w-full px-5 py-4 bg-white border border-slate-250 rounded-xl text-base outline-none focus:border-black focus:ring-1 focus:ring-black text-black placeholder:text-slate-400 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-5 bg-slate-50/50 rounded-xl border border-slate-200 shadow-sm">
                    <div>
                      <span className="text-sm font-semibold text-slate-800 block">Accept Secure Escrow Payouts</span>
                      <span className="text-xs text-slate-400 font-medium mt-0.5 block">Payments remain secured in escrow during milestone completion checks.</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setEscrowAccepted(!escrowAccepted)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${escrowAccepted ? "bg-black text-white" : "bg-slate-200 text-slate-700"}`}
                    >
                      {escrowAccepted ? "Yes" : "No"}
                    </button>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm font-semibold text-slate-550 hover:text-black flex items-center gap-1 transition-colors"
                  >
                    ← Back
                  </button>

                  <button 
                    type="submit"
                    className="bg-[#111111] hover:bg-black text-white px-12 py-4 rounded-xl text-base font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-grow flex bg-[#f3f7fa] min-h-screen text-[#111111] antialiased animate-premium-fade">
          
          <aside className="w-64 bg-white border-r border-slate-200/65 flex flex-col justify-between py-8 px-5 flex-shrink-0">
            <div className="flex flex-col items-stretch gap-8">
              {/* Logo / Branding */}
              <div className="flex flex-col gap-3 px-3">
                <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-black transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                </a>
                <div className="flex items-center gap-2.5 mt-1">
                  <div className="w-5.5 h-5.5 rounded-full border-[3.5px] border-black flex-shrink-0"></div>
                  <span className="font-extrabold text-black text-lg tracking-tight">VisaFormula</span>
                </div>
              </div>
              
              <nav className="flex flex-col gap-2">
                {[
                  { id: "dashboard", label: "Dashboard", icon: Layers },
                  { id: "profile", label: "Edit Profile", icon: User },
                  { id: "inquiries", icon: MessageSquare, label: "New Inquiries", count: inquiries.length },
                  { id: "cases", icon: Briefcase, label: "Active Cases", count: activeCases.length },
                  { id: "upgrade", icon: Shield, label: "Upgrade Tier" },
                  { id: "photos", icon: Upload, label: "Upload Photos", count: uploadedFiles.length }
                ].map(tab => {
                  const isActive = activeTab === tab.id;
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-5 py-3.5 rounded-full font-bold text-xs tracking-wide transition-all relative ${
                        isActive 
                          ? "bg-[#1C1C1E] text-white shadow-sm active:scale-[0.98]" 
                          : "text-slate-700 hover:text-black hover:bg-slate-50"
                      }`}
                    >
                      <IconComponent className="w-4 h-4 flex-shrink-0" />
                      <span>{tab.label}</span>
                      
                      {tab.count !== undefined && tab.count > 0 && (
                        <span className={`absolute right-4 px-2 py-0.5 rounded-full text-[9px] font-black transition-all ${
                          isActive ? "bg-white text-black" : "bg-slate-100 text-slate-700"
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
 
            <div className="px-2">
              <button 
                onClick={() => setStep(1)} 
                className="flex items-center gap-3 px-5 py-3.5 text-slate-700 hover:text-red-600 hover:bg-red-50/50 rounded-full font-bold text-xs tracking-wide transition-all w-full text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </aside>

          <main className="flex-grow p-8 overflow-y-auto space-y-8">
            
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-grow max-w-4xl">
                {/* Profile Badge (Premium Style matching screenshot) */}
                <div className="bg-white border border-slate-200/80 rounded-[28px] shadow-sm flex items-center overflow-hidden max-w-md w-full relative">
                  {/* Top right gradient banner background */}
                  <div className="absolute top-0 right-0 left-[35%] h-[45px] bg-gradient-to-br from-[#818CF8]/35 via-[#C084FC]/20 to-transparent rounded-bl-[40px] pointer-events-none" />
                  
                  {/* Left side: Avatar */}
                  <div className="p-4 pr-2 flex-shrink-0 z-10">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[24px] bg-slate-100 overflow-hidden border border-slate-150 flex items-center justify-center font-black text-xl text-slate-400 shadow-inner">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="expert avatar" className="w-full h-full object-cover" />
                      ) : (
                        "XP"
                      )}
                    </div>
                  </div>

                  {/* Right side: Info */}
                  <div className="p-4 pl-3 flex flex-col justify-center flex-grow z-10">
                    {/* Name and PRO Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base sm:text-lg font-extrabold text-black tracking-tight leading-snug">{businessName || "Apex Immigration"}</h2>
                      <span className="inline-flex items-center gap-0.5 bg-[#4A72FF] text-white px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider">
                        PRO <Sparkles className="w-2.5 h-2.5 fill-current text-white" />
                      </span>
                    </div>

                    {/* Description/Location */}
                    <p className="text-[11.5px] text-slate-500 font-semibold mt-1 leading-tight max-w-[220px]">
                      {expertCategory || consultantType || "Visa Expert"} based in {expertAddress ? expertAddress.split(',')[0] : (officeAddress ? officeAddress.split(',')[0] : "Delhi, India")}
                    </p>
                  </div>
                </div>

                {/* Search Bar next to Profile */}
                <div className="relative w-full sm:w-[450px] flex-shrink-0">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Search consultations, tasks, files..."
                    className="w-full pl-11 pr-5 py-4 bg-white border border-slate-200 rounded-full text-xs font-semibold focus:border-black outline-none shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Action buttons on the right */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowAdModal(true)}
                  className="bg-white hover:bg-slate-50 text-black border border-slate-250 px-5 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 shadow-sm cursor-pointer"
                >
                  Post an Ad <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => setShowOfferModal(true)}
                  className="bg-black hover:bg-slate-900 text-white px-5 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 shadow-sm cursor-pointer"
                >
                  Special Offer <Sparkles className="w-4 h-4 text-yellow-400" />
                </button>
              </div>
            </header>

            {activeTab === "dashboard" ? (
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                
                {/* Column 1: Applicant Inquiries (styled as My Tasks mockup) */}
                <div className="xl:col-span-1 bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-bold text-lg text-black">My Inquiries</h3>
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Applicant Requests</span>
                    </div>
                    <button onClick={() => setShowAdModal(true)} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all">
                      <Plus className="w-4 h-4 text-black" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button className="bg-black text-white text-xs font-bold px-4 py-2 rounded-full">Today</button>
                    <button className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-full transition-all">Tomorrow</button>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-2xl flex items-center justify-between text-xs font-bold text-black">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px]">{inquiries.length}</div>
                      <span>On Going Inquiries</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {inquiries.length === 0 ? (
                      <div className="text-center py-6 text-slate-400 text-xs font-medium">
                        No pending applicant inquiries.
                      </div>
                    ) : (
                      inquiries.map((inq, idx) => {
                        const bgColors = ["bg-[#ffeae6]/40", "bg-[#e8f5e9]/40", "bg-[#e1f5fe]/40", "bg-[#f3e5f5]/40"];
                        return (
                          <div key={inq.id} className={`p-4 border border-slate-150 rounded-2xl transition-all hover:scale-[1.01] flex flex-col justify-between gap-3 ${bgColors[idx % bgColors.length]}`}>
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="text-xs font-semibold text-black block">{inq.name}</span>
                                <span className="text-[9px] bg-white/80 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-bold mt-1 inline-block uppercase tracking-wider">
                                  {inq.type} ({inq.country})
                                </span>
                              </div>
                              <span className="text-[9px] font-semibold text-slate-400">{inq.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">{inq.message}</p>
                            
                            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100/50">
                              <button 
                                onClick={() => setInquiries(inquiries.filter(item => item.id !== inq.id))}
                                className="text-[10px] font-bold text-slate-500 hover:text-black transition-colors"
                              >
                                Decline
                              </button>
                              <button 
                                onClick={() => handleAcceptInquiry(inq.id)}
                                className="bg-black hover:bg-slate-900 text-white text-[9px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all"
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Column 2: Dashboard Analytics & Milestone Escrow (Middle column) */}
                <div className="xl:col-span-2 flex flex-col gap-8">
                  
                  {/* Upper Row: Projects Overview & Earnings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Projects / Cases Overview Doughnut Chart Layout */}
                    <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[280px]">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Cases Overview</span>
                        <button className="text-slate-400 hover:text-black">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-3">
                        <div className="absolute inset-0 border-[10px] border-slate-100 rounded-full"></div>
                        <div className="absolute inset-0 border-[10px] border-t-black border-r-orange-500 border-b-sky-500 border-l-slate-100 rounded-full animate-spin-slow"></div>
                        <div className="text-center z-10">
                          <span className="text-2xl font-bold text-black">{activeCases.length}</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">Active</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-black rounded-xs"></span> In Progress: {activeCases.filter(c => c.progress < 100).length}</span>
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-orange-500 rounded-xs"></span> Completed: {activeCases.filter(c => c.progress === 100).length}</span>
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-sky-500 rounded-xs"></span> Inquiries: {inquiries.length}</span>
                      </div>
                    </div>

                    {/* Milestone Earnings Chart Visual (Income VS Expense layout) */}
                    <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[280px]">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Revenue</span>
                          <span className="text-lg font-bold text-black mt-1 block">₹43,500 Secured</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-450">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                          <span>Escrow Active</span>
                        </div>
                      </div>

                      {/* Custom visual curves / lines representing Income vs Expense */}
                      <div className="relative h-28 flex items-end justify-between gap-1 mt-2">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <path d="M0,35 Q20,10 40,25 T80,15 T100,5" fill="none" stroke="rgba(17,17,17,0.15)" strokeWidth="1.5" />
                          <path d="M0,38 Q25,30 50,35 T100,28" fill="none" stroke="rgba(249,115,22,0.25)" strokeWidth="1.5" />
                          <circle cx="40" cy="25" r="2.5" fill="black" />
                          <circle cx="80" cy="15" r="2.5" fill="orange" />
                        </svg>
                        <div className="absolute top-2 right-2 bg-black text-white text-[8px] px-2 py-0.5 rounded font-bold">
                          Income: 24,600$
                        </div>
                      </div>

                      <div className="flex justify-between text-[9px] font-bold text-slate-400 border-t border-slate-100 pt-2">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                      </div>
                    </div>

                  </div>

                  {/* Lower Block: Milestone Escrow Vault (Invoice Overview Mockup layout) */}
                  <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="font-bold text-lg text-black">Milestone Escrow Vault</h3>
                        <span className="text-[11px] text-slate-450 font-bold uppercase tracking-wider">Secured Payouts</span>
                      </div>
                      <Shield className="w-5 h-5 text-black" />
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: "Overdue Payouts", count: "0 cases", amount: "₹0", width: "5%", bg: "bg-purple-600" },
                        { label: "Under Milestone Review", count: `${activeCases.length} cases`, amount: "₹43,500", width: "65%", bg: "bg-red-500" },
                        { label: "Secure Escrow Held", count: `${activeCases.length} cases`, amount: "₹43,500", width: "65%", bg: "bg-sky-500" },
                        { label: "Total Completed Payouts", count: "0 cases", amount: "₹0", width: "5%", bg: "bg-emerald-500" },
                        { label: "Drafts / Pending", count: "0 cases", amount: "₹0", width: "5%", bg: "bg-orange-500" }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-black">
                            <span>{item.label}</span>
                            <div className="flex gap-4">
                              <span className="text-slate-450">{item.count}</span>
                              <span className="font-bold">{item.amount}</span>
                            </div>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.bg} rounded-full`} style={{ width: item.width }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Column 3: Active Case Milestones & Open Tickets (Right Column) */}
                <div className="xl:col-span-1 flex flex-col gap-8">
                  
                  {/* Active Cases Milestone list (styled like My Meetings in mockup) */}
                  <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-450 uppercase tracking-widest block">Active Cases</span>
                      <Calendar className="w-4 h-4 text-black" />
                    </div>

                    <div className="space-y-3">
                      {activeCases.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs font-medium">
                          No active client cases.
                        </div>
                      ) : (
                        activeCases.map((c, idx) => (
                          <div key={c.id} className="bg-slate-50 border border-slate-200/40 rounded-2xl p-4.5 space-y-3 hover:shadow-xs transition-all relative">
                            <div className="flex justify-between items-center text-xs font-bold">
                              <span className="text-slate-450 font-bold">{c.escrow}</span>
                              <span className="bg-black text-white px-2 py-0.5 rounded-md text-[9px] uppercase tracking-wider">Meet</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-250 flex items-center justify-center font-bold text-xs text-black">
                                {c.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-semibold text-black block truncate">{c.name}</span>
                                <span className="text-[10px] text-slate-400 block truncate font-semibold mt-0.5">{c.visa}</span>
                              </div>
                            </div>
                            
                            {/* Milestone progress interactive slider */}
                            <div className="mt-2 pt-2 border-t border-slate-100/50">
                              <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 mb-1">
                                <span>Progress: {c.progress}%</span>
                                <span className="text-black font-bold uppercase">{c.status.includes("Completed") ? "Completed" : "In-Progress"}</span>
                              </div>
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={c.progress}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  setActiveCases(activeCases.map(item => item.id === c.id ? { ...item, progress: val, status: val === 100 ? "Completed & Escrow Released" : "milestone in-progress" } : item));
                                }}
                                className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-black" 
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Open Tickets layout (shows partners ads & promotional offers list) */}
                  <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-450 uppercase tracking-widest block">Active Ads & Offers</span>
                      <Plus className="w-4 h-4 text-black cursor-pointer" onClick={() => setShowAdModal(true)} />
                    </div>

                    <div className="space-y-4">
                      {adsList.length === 0 && offersList.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs font-medium">
                          No promotional offers published. Click + to post.
                        </div>
                      ) : (
                        <>
                          {adsList.map((ad, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs text-orange-850 flex-shrink-0">AD</div>
                              <div className="flex-1 truncate">
                                <div className="text-xs font-semibold text-black leading-none truncate">{ad.title}</div>
                                <span className="text-[9px] text-slate-400 font-bold block mt-1 truncate">{ad.desc}</span>
                              </div>
                              <button onClick={() => setAdsList(adsList.filter((_, i) => i !== idx))} className="text-xs text-slate-400 hover:text-black font-bold">×</button>
                            </div>
                          ))}
                          {offersList.map((off, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-xs text-emerald-850 flex-shrink-0">%</div>
                              <div className="flex-1 truncate">
                                <div className="text-xs font-semibold text-black leading-none truncate">{off.title}</div>
                                <span className="text-[9px] text-emerald-700 font-bold block mt-1 truncate">{off.discount} Discount</span>
                              </div>
                              <button onClick={() => setOffersList(offersList.filter((_, i) => i !== idx))} className="text-xs text-slate-400 hover:text-black font-bold">×</button>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            ) : activeTab === "profile" ? (
              <div className="bg-white border border-slate-200/50 rounded-3xl p-8 shadow-sm space-y-8 animate-premium-fade">
                <h3 className="text-base font-bold text-black border-b border-slate-100 pb-3 uppercase tracking-wide">
                  Live Consultant Profile Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Business Name</label>
                    <input 
                      type="text" 
                      value={businessName} 
                      onChange={(e) => setBusinessName(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Contact Number</label>
                    <input 
                      type="text" 
                      value={contactNumber} 
                      onChange={(e) => setContactNumber(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Practice Consultant Category</label>
                    <select 
                      value={consultantType} 
                      onChange={(e) => setConsultantType(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none cursor-pointer"
                    >
                      <option value="Freelancer">Freelancer</option>
                      <option value="Business Expert">Business expert</option>
                      <option value="Institute or company">Institute or company</option>
                      <option value="Legal professional">Legal professional</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Expert In (Category)</label>
                    <select 
                      value={expertCategory} 
                      onChange={(e) => setExpertCategory(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none cursor-pointer"
                    >
                      <option value="Student visa expert">Student visa expert</option>
                      <option value="Visa filing expert">Visa filing expert</option>
                      <option value="Visit visa expert">Visit visa expert</option>
                      <option value="Job visa expert">Job visa expert</option>
                      <option value="PR And Migration expert">PR And Migration expert</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Practice / Office Address</label>
                    <input 
                      type="text"
                      value={expertAddress} 
                      onChange={(e) => setExpertAddress(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Website Address</label>
                    <input 
                      type="text" 
                      value={website} 
                      onChange={(e) => setWebsite(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Countries of Expertise</label>
                    <input 
                      type="text" 
                      value={countriesExpertise} 
                      onChange={(e) => setCountriesExpertise(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-black focus:bg-white focus:border-black outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Registered Email Address</label>
                    <input 
                      type="email" 
                      disabled
                      value={email} 
                      className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-500 outline-none"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 space-y-4">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Additional Details & Verified Documents</span>
                  {consultantType === "Freelancer" ? (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800">SMM / Portfolio Link</label>
                        <input 
                          type="text"
                          value={portfolioLink}
                          onChange={(e) => setPortfolioLink(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800">Bio</label>
                        <textarea 
                          value={aboutMe}
                          onChange={(e) => setAboutMe(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs outline-none resize-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800">Gov Reg / License Code</label>
                        <input 
                          type="text"
                          value={govRegNumber}
                          onChange={(e) => setGovRegNumber(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800">Office Location Address</label>
                        <input 
                          type="text"
                          value={officeAddress}
                          onChange={(e) => setOfficeAddress(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : activeTab === "inquiries" ? (
              <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm animate-premium-fade">
                <h3 className="text-base font-bold text-black border-b border-slate-100 pb-3 mb-4 uppercase tracking-wide">
                  Incoming Applicant Inquiries
                </h3>

                {inquiries.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 font-medium text-sm">
                    No new inquiries currently available.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map(inq => (
                      <div key={inq.id} className="border border-slate-150 rounded-2xl p-5 hover:shadow-md transition-all bg-white relative group">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-black text-sm">{inq.name}</h4>
                            <span className="text-[10px] bg-slate-100 text-black px-2.5 py-0.5 rounded-md font-bold mt-1.5 inline-block uppercase tracking-wider">
                              {inq.type} ({inq.country})
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400">{inq.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium mt-3">{inq.message}</p>
                        
                        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-2.5">
                          <button 
                            onClick={() => setInquiries(inquiries.filter(item => item.id !== inq.id))}
                            className="text-xs font-bold text-slate-450 hover:text-black px-3.5 py-1.5 transition-colors"
                          >
                            Decline
                          </button>
                          <button 
                            onClick={() => handleAcceptInquiry(inq.id)}
                            className="bg-black hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-xl active:scale-95 transition-all shadow-sm"
                          >
                            Accept Inquiry
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : activeTab === "cases" ? (
              <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm animate-premium-fade">
                <h3 className="text-base font-bold text-black border-b border-slate-100 pb-3 mb-4 uppercase tracking-wide">
                  Active Client Milestones List
                </h3>

                {activeCases.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 font-medium text-sm">
                    No active cases. Accept inquiries to initiate escrow cases.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeCases.map(c => (
                      <div key={c.id} className="border border-slate-150 rounded-2xl p-5 hover:shadow-md transition-all bg-white relative">
                        <div className="flex items-center justify-between mb-3.5">
                          <h4 className="font-bold text-black text-sm">{c.name}</h4>
                          <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md">
                            {c.escrow}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-black">{c.visa}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{c.status}</p>

                        <div className="mt-5">
                          <div className="flex items-center justify-between text-[10px] font-bold mb-1.5">
                            <span>Case milestone progress</span>
                            <span>{c.progress}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={c.progress}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setActiveCases(activeCases.map(item => item.id === c.id ? { ...item, progress: val, status: val === 100 ? "Completed & Escrow Released" : "milestone in-progress" } : item));
                            }}
                            className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-black" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : activeTab === "upgrade" ? (
              <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm animate-premium-fade">
                <h3 className="text-base font-bold text-black border-b border-slate-100 pb-3 mb-6 uppercase tracking-wide">
                  Membership Tier Plans Comparison
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="border border-slate-150 rounded-2xl p-6 shadow-sm space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Current Tier</span>
                      <h4 className="text-lg font-bold text-black mt-1">Standard Directory</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Basic directory listing, standard case commission applies. Receive applicant inquiries up to 5 per week.</p>
                    <button 
                      disabled={membershipTier === "Standard Directory"}
                      onClick={() => setMembershipTier("Standard Directory")}
                      className="w-full bg-slate-100 text-slate-500 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {membershipTier === "Standard Directory" ? "Active Membership" : "Downgrade to Standard"}
                    </button>
                  </div>

                  <div className="border-2 border-black rounded-2xl p-6 shadow-sm space-y-4 relative overflow-hidden bg-slate-50/20">
                    <span className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase bg-black text-white px-2 py-0.5 rounded-md">Highly Rated</span>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-550 tracking-wider">Premium Partner</span>
                      <h4 className="text-lg font-bold text-[#111111] mt-1">Elite Accelerator</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Featured directory listing boost, direct messaging to all applicants, zero commission on escrow bookings, priority support.</p>
                    <button 
                      disabled={membershipTier === "Elite Accelerator"}
                      onClick={() => setMembershipTier("Elite Accelerator")}
                      className="w-full bg-black hover:bg-slate-900 text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider active:scale-95 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {membershipTier === "Elite Accelerator" ? "Active Elite Membership" : "Upgrade Tier"}
                    </button>
                  </div>
                </div>
              </div>
            ) : activeTab === "photos" ? (
              <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm space-y-6 animate-premium-fade">
                <h3 className="text-base font-bold text-black border-b border-slate-100 pb-3 uppercase tracking-wide">
                  Upload Photos & Gallery Documents
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="border-2 border-dashed border-slate-250 rounded-2xl p-6 text-center hover:bg-slate-50 cursor-pointer transition-all block group">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-black transition-colors" />
                    <span className="text-xs font-bold text-black block">Upload Case Success Files</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block font-semibold">PDF, JPG, PNG up to 10MB</span>
                    <input 
                      type="file" 
                      accept="image/*,application/pdf"
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file.name);
                        }
                      }}
                    />
                  </label>

                  <label className="border-2 border-dashed border-slate-250 rounded-2xl p-6 text-center hover:bg-slate-50 cursor-pointer transition-all block group">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-black transition-colors" />
                    <span className="text-xs font-bold text-black block">Upload ID Document/License</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block font-semibold">PDF, JPG, PNG up to 10MB</span>
                    <input 
                      type="file" 
                      accept="image/*,application/pdf"
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file.name);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="space-y-3 pt-4">
                  <span className="text-xs font-bold text-black block uppercase tracking-wider">Uploaded Gallery Files List ({uploadedFiles.length})</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-150 p-4.5 rounded-xl flex items-center justify-between text-xs font-bold text-black shadow-sm">
                        <span className="truncate pr-2">{file}</span>
                        <button onClick={() => setUploadedFiles(uploadedFiles.filter(item => item !== file))} className="text-black font-extrabold hover:text-red-650 transition-colors text-sm">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </main>
      {showAdModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn px-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-sm text-black uppercase tracking-wider">Post a New Ad</h3>
                  <button onClick={() => setShowAdModal(false)} className="text-slate-450 hover:text-black font-bold">×</button>
                </div>
                <form onSubmit={handleAddAd} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Ad Title</label>
                    <input 
                      required
                      type="text" 
                      value={adTitle} 
                      onChange={(e) => setAdTitle(e.target.value)} 
                      placeholder="e.g. Express Admission Consultation Session"
                      className="w-full px-4.5 py-3 border rounded-xl text-xs outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Description</label>
                    <textarea 
                      required
                      value={adDescription} 
                      onChange={(e) => setAdDescription(e.target.value)} 
                      placeholder="Give details about your advertisement offer..."
                      rows={3}
                      className="w-full px-4.5 py-3 border rounded-xl text-xs outline-none resize-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2.5 pt-2">
                    <button type="button" onClick={() => setShowAdModal(false)} className="px-4 py-2 border rounded-lg text-xs font-bold text-slate-500">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-wider">Publish Ad</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showOfferModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn px-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-sm text-black uppercase tracking-wider">Create a Promotional Offer</h3>
                  <button onClick={() => setShowOfferModal(false)} className="text-slate-450 hover:text-black font-bold">×</button>
                </div>
                <form onSubmit={handleAddOffer} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Offer Title</label>
                    <input 
                      required
                      type="text" 
                      value={offerTitle} 
                      onChange={(e) => setOfferTitle(e.target.value)} 
                      placeholder="e.g. Canada Visa Appeal Special discount"
                      className="w-full px-4.5 py-3 border rounded-xl text-xs outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Discount Amount / Percentage</label>
                    <input 
                      required
                      type="text" 
                      value={offerDiscount} 
                      onChange={(e) => setOfferDiscount(e.target.value)} 
                      placeholder="e.g. ₹5,000 or 15%"
                      className="w-full px-4.5 py-3 border rounded-xl text-xs outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2.5 pt-2">
                    <button type="button" onClick={() => setShowOfferModal(false)} className="px-4 py-2 border rounded-lg text-xs font-bold text-slate-500">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-wider">Launch Offer</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      
      {step < 3 && (
        <footer className="bg-white border-t border-slate-100 py-6 px-12 text-xs font-semibold text-slate-500 font-sans mt-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>Copyright © 2022 VisaFormula Corporates</span>
            <div className="flex items-center gap-6">
              <span className="cursor-pointer hover:text-black">Privacy</span>
              <span className="cursor-pointer hover:text-black">Policy</span>
            </div>
          </div>
        </footer>
      )}
      
    </div>
  );
}
