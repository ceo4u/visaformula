import { useState, useEffect } from "react";
import { 
    DollarSign, Users, CheckCircle, Clock, TrendingUp, BarChart3, GripVertical, 
    Settings, X, Save, Edit2, Globe, Sparkles, ArrowLeft, LogOut, LayoutDashboard, 
    Menu, Briefcase, Calendar, Plus, ChevronRight, ChevronDown, Bell, Search, Lock, 
    FileText, LayoutGrid, Star, ShieldCheck, CheckSquare, MessageSquare, Camera, Upload, Trash2, Image, ArrowUpRight, HelpCircle, Eye, AlertTriangle, ExternalLink, Megaphone, User, Send, Filter, CheckCircle2, RefreshCw
} from "lucide-react";

export function ConsultantDashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [timePeriod, setTimePeriod] = useState("This Month");
    const [timePeriodOpen, setTimePeriodOpen] = useState(false);

    // Dynamic Profile Settings States (Reads real user data or clean fallback)
    const [profile, setProfile] = useState({
        name: "Immigration Expert",
        role: "Registered Consultant",
        city: "Location Not Specified",
        experience: 5,
        bio: "Licensed immigration & visa consultant helping clients with study, work, and migration visas.",
        specializations: "Canada, UK, USA, Australia",
        countries: "Worldwide",
        image: ""
    });

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("Action saved successfully!");

    // Temp Form States for Edit Profile Modal
    const [formName, setFormName] = useState("");
    const [formRole, setFormRole] = useState("");
    const [formCity, setFormCity] = useState("");
    const [formBio, setFormBio] = useState("");
    const [formSpecs, setFormSpecs] = useState("");
    const [formCountries, setFormCountries] = useState("");
    const [formImage, setFormImage] = useState("");

    // Granular Location & Registration Form States for Edit Profile Modal
    const [formPhone, setFormPhone] = useState("");
    const [formArea, setFormArea] = useState("");
    const [formCityName, setFormCityName] = useState("");
    const [formState, setFormState] = useState("");
    const [formCountry, setFormCountry] = useState("");
    const [formZip, setFormZip] = useState("");
    const [formGovReg, setFormGovReg] = useState("");
    const [formPortfolio, setFormPortfolio] = useState("");
    const [formTagsArray, setFormTagsArray] = useState<string[]>([]);

    // Real Data States (Initialized with dummy data / from localStorage)
    const DUMMY_LEADS = [
        { id: 1, name: "Rahul Sharma", visa: "Canada Study Visa", country: "Canada 🇨🇦", phone: "+91 98765 43210", status: "New" },
        { id: 2, name: "Priya Mehta", visa: "UK Skilled Worker", country: "UK 🇬🇧", phone: "+91 87654 32109", status: "Contacted" },
        { id: 3, name: "Arjun Nair", visa: "Australia PR", country: "Australia 🇦🇺", phone: "+91 76543 21098", status: "In Progress" },
        { id: 4, name: "Sneha Kapoor", visa: "USA F1 Student", country: "USA 🇺🇸", phone: "+91 65432 10987", status: "New" },
        { id: 5, name: "Vikram Joshi", visa: "Germany Job Seeker", country: "Germany 🇩🇪", phone: "+91 54321 09876", status: "Qualified" },
        { id: 6, name: "Anjali Singh", visa: "Canada Express Entry", country: "Canada 🇨🇦", phone: "+91 43210 98765", status: "New" },
        { id: 7, name: "Rohan Verma", visa: "Australia Student Visa", country: "Australia 🇦🇺", phone: "+91 32109 87654", status: "Contacted" },
        { id: 8, name: "Divya Patel", visa: "UK Tourist Visa", country: "UK 🇬🇧", phone: "+91 21098 76543", status: "Closed" },
        { id: 9, name: "Karthik Rao", visa: "Canada Work Permit", country: "Canada 🇨🇦", phone: "+91 10987 65432", status: "In Progress" },
        { id: 10, name: "Meera Iyer", visa: "New Zealand PR", country: "NZ 🇳🇿", phone: "+91 90876 54321", status: "New" },
        { id: 11, name: "Aakash Gupta", visa: "UAE Work Visa", country: "UAE 🇦🇪", phone: "+91 80765 43210", status: "Qualified" },
        { id: 12, name: "Pooja Mishra", visa: "Canada Study Permit", country: "Canada 🇨🇦", phone: "+91 70654 32109", status: "New" },
    ];
    const DUMMY_ENQUIRIES = [
        { id: 1, name: "Canada Study Visa", visa: "Enquired May 30, 2025", flag: "🇨🇦", status: "New" },
        { id: 2, name: "UK Visitor Visa", visa: "Enquired May 29, 2025", flag: "🇬🇧", status: "New" },
        { id: 3, name: "Australia PR", visa: "Enquired May 28, 2025", flag: "🇦🇺", status: "Contacted" },
        { id: 4, name: "USA Tourist Visa", visa: "Enquired May 21, 2025", flag: "🇺🇸", status: "Closed" },
        { id: 5, name: "Germany Job Seeker", visa: "Enquired May 18, 2025", flag: "🇩🇪", status: "New" },
        { id: 6, name: "Canada Express Entry", visa: "Enquired May 15, 2025", flag: "🇨🇦", status: "New" },
        { id: 7, name: "NZ Skilled Migrant", visa: "Enquired May 12, 2025", flag: "🇳🇿", status: "Contacted" },
        { id: 8, name: "UAE Work Visa", visa: "Enquired May 10, 2025", flag: "🇦🇪", status: "New" },
    ];
    const DUMMY_CLASSIFIEDS = [
        { id: 1, title: "Study in Canada 2025 Intake Open", category: "Study Abroad", price: "₹ Free", views: 124, status: "Active", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop" },
        { id: 2, title: "Caregiver Jobs in Toronto", category: "Job Abroad", price: "₹ Free", views: 98, status: "Active", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop" },
        { id: 3, title: "Shared Accommodation in Toronto", category: "Accommodation", price: "₹650 CAD / Month", views: 76, status: "Active", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400&auto=format&fit=crop" },
        { id: 4, title: "Visa Consultancy Business for Sale", category: "Business Opportunity", price: "₹12,00,000", views: 61, status: "Active", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop" },
    ];
    const DUMMY_REVIEWS = [
        { id: 1, name: "Rahul S.", rating: 5, comment: "Excellent service! Got my Canada visa in record time.", date: "May 28, 2025" },
        { id: 2, name: "Priya M.", rating: 4, comment: "Very professional and knowledgeable consultant.", date: "May 20, 2025" },
        { id: 3, name: "Arjun N.", rating: 5, comment: "Highly recommend for Australia PR. Amazing support!", date: "May 10, 2025" },
    ];
    const DUMMY_DISPUTES = [
        { id: "D-2025-0012", client: "Rahul Sharma", issue: "Service not as described", status: "Under Review", date: "May 22, 2025" },
        { id: "D-2025-0008", client: "Neha Verma", issue: "Refund not processed", status: "In Progress", date: "May 18, 2025" },
    ];
    const [leadsList, setLeadsList] = useState<any[]>(DUMMY_LEADS);
    const [enquiriesList, setEnquiriesList] = useState<any[]>(DUMMY_ENQUIRIES);
    const [classifiedsList, setClassifiedsList] = useState<any[]>(DUMMY_CLASSIFIEDS);
    const [reviewsList, setReviewsList] = useState<any[]>(DUMMY_REVIEWS);
    const [disputesList, setDisputesList] = useState<any[]>(DUMMY_DISPUTES);
    const [supportTickets, setSupportTickets] = useState<any[]>([]);
    const [ticketSubject, setTicketSubject] = useState("");
    const [ticketQuery, setTicketQuery] = useState("");
    const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
    const [servicesList, setServicesList] = useState<any[]>([
        { id: 1, name: "Initial Consultation (30 min)", price: "₹2,500", active: true },
        { id: 2, name: "Full Visa Application Support", price: "₹15,000", active: true },
    ]);

    // Modal States
    const [isPostingAd, setIsPostingAd] = useState(false);
    const [isAddingLead, setIsAddingLead] = useState(false);
    
    // Form states for New Classified Ad
    const [adTitle, setAdTitle] = useState("");
    const [adCategory, setAdCategory] = useState("Study Abroad");
    const [adPrice, setAdPrice] = useState("FREE");

    // Form states for New Lead
    const [leadName, setLeadName] = useState("");
    const [leadVisa, setLeadVisa] = useState("Study Visa");
    const [leadCountry, setLeadCountry] = useState("Canada 🇨🇦");
    const [leadPhone, setLeadPhone] = useState("");
    const [leadStatus, setLeadStatus] = useState("New");

    // Interactive Chat state
    const [activeChatClient, setActiveChatClient] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [chatMessages, setChatMessages] = useState<Record<string, Array<{sender: string; text: string; time: string}>>>({});

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        setMessageInput("");
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userStr = localStorage.getItem("visaformula_user");
            const isLoggedInExpert = localStorage.getItem("expert_isLoggedIn");

            let parsedUser: any = null;
            try { parsedUser = userStr ? JSON.parse(userStr) : null; } catch(e) {}

            const isExpert = parsedUser?.type === "expert" || isLoggedInExpert === "true";
            
            if (!isExpert) {
                // Not an expert - redirect to appropriate dashboard
                window.location.href = parsedUser?.type === "seeker" ? "/dashboard" : "/login";
                return;
            }

            // Load real Expert Profile details from localStorage
            const firstName = localStorage.getItem("expert_firstName") || "";
            const lastName = localStorage.getItem("expert_lastName") || "";
            const storedName = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : "";
            const bizName = localStorage.getItem("expert_businessName") || "";
            const finalName = bizName || storedName || "Immigration Expert";
            const role = localStorage.getItem("expert_advisorType") || "Registered Consultant";
            const city = localStorage.getItem("expert_city") || localStorage.getItem("expert_officeAddress") || "Location Not Specified";
            const bio = localStorage.getItem("expert_aboutMe") || "Licensed immigration & visa consultant helping clients with study, work, and migration visas.";
            const image = localStorage.getItem("expert_profilePhoto") || localStorage.getItem("expert_profilePhotoUrl") || "";
            
            const loadedSpecs = (() => {
                try {
                    const tags = localStorage.getItem("expert_expertiseTags");
                    if (tags) {
                        const parsed = JSON.parse(tags);
                        if (Array.isArray(parsed) && parsed.length > 0) return parsed.join(", ");
                    }
                } catch(e) {}
                return "";
            })() || "Not Specified";

            const loadedCountries = localStorage.getItem("expert_countriesExpertise") || "Not Specified";

            const activeProfile = {
                name: finalName,
                role: role,
                city: city,
                experience: 5,
                bio: bio,
                specializations: loadedSpecs,
                countries: loadedCountries,
                image: image
            };

            setProfile(activeProfile);
            setFormName(finalName);
            setFormRole(role);
            setFormCity(city);
            setFormBio(bio);
            setFormSpecs(loadedSpecs);
            setFormCountries(loadedCountries);
            setFormImage(image);

            // Populate granular registration states for Edit Profile modal
            setFormPhone(localStorage.getItem("expert_contactNumber") || localStorage.getItem("expert_phone") || "");
            setFormArea(localStorage.getItem("expert_area") || "");
            setFormCityName(localStorage.getItem("expert_city") || "");
            setFormState(localStorage.getItem("expert_state") || "");
            setFormCountry(localStorage.getItem("expert_country") || "India");
            setFormZip(localStorage.getItem("expert_zip") || "");
            setFormGovReg(localStorage.getItem("expert_govRegNumber") || "");
            setFormPortfolio(localStorage.getItem("expert_portfolioLink") || "");
            try {
                const tagsStr = localStorage.getItem("expert_expertiseTags");
                if (tagsStr) {
                    const parsed = JSON.parse(tagsStr);
                    if (Array.isArray(parsed)) setFormTagsArray(parsed);
                }
            } catch(e) {}

            // Check if Expert profile is incomplete based on registration starting details
            const hasBizName = Boolean(localStorage.getItem("expert_businessName") || localStorage.getItem("expert_firstName"));
            const hasOfficeAddress = Boolean(localStorage.getItem("expert_officeAddress")) && localStorage.getItem("expert_officeAddress") !== "Location Not Specified";
            const hasPhone = Boolean(localStorage.getItem("expert_phone"));
            const hasCountries = Boolean(localStorage.getItem("expert_countriesExpertise"));

            setIsProfileIncomplete(!hasBizName || !hasOfficeAddress || !hasPhone || !hasCountries);

            // Load real Classified Ads from localStorage
            try {
                const savedAds = localStorage.getItem("expert_activeAds");
                if (savedAds) {
                    const parsedAds = JSON.parse(savedAds);
                    if (Array.isArray(parsedAds)) setClassifiedsList(parsedAds);
                }
            } catch(e) {}

            // Load real Support Tickets from localStorage
            try {
                const savedTickets = localStorage.getItem("expert_support_tickets");
                if (savedTickets) {
                    const parsedTickets = JSON.parse(savedTickets);
                    if (Array.isArray(parsedTickets)) setSupportTickets(parsedTickets);
                }
            } catch(e) {}
        }
    }, []);

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        
        const finalFullAddress = [formArea, formCityName, formState, formCountry, formZip].filter(Boolean).join(", ") || formCity || "Location Not Specified";

        const updatedProfile = {
            name: formName,
            role: formRole,
            city: formCityName || formCity || finalFullAddress,
            experience: 5,
            bio: formBio,
            specializations: formTagsArray.length > 0 ? formTagsArray.join(", ") : formSpecs,
            countries: formCountries,
            image: formImage
        };
        setProfile(updatedProfile);

        localStorage.setItem("expert_businessName", formName);
        localStorage.setItem("expert_advisorType", formRole);
        localStorage.setItem("expert_officeAddress", finalFullAddress);
        localStorage.setItem("expert_area", formArea);
        localStorage.setItem("expert_city", formCityName);
        localStorage.setItem("expert_state", formState);
        localStorage.setItem("expert_country", formCountry);
        localStorage.setItem("expert_zip", formZip);
        localStorage.setItem("expert_contactNumber", formPhone);
        localStorage.setItem("expert_phone", formPhone);
        localStorage.setItem("expert_govRegNumber", formGovReg);
        localStorage.setItem("expert_portfolioLink", formPortfolio);
        localStorage.setItem("expert_aboutMe", formBio);
        localStorage.setItem("expert_expertiseTags", JSON.stringify(formTagsArray));
        localStorage.setItem("expert_countriesExpertise", formCountries);
        localStorage.setItem("expert_profilePhoto", formImage);

        // Update active user & profile updates dictionary
        try {
            localStorage.setItem("visaformula_user", JSON.stringify({
                name: formName,
                email: localStorage.getItem("expert_email") || "",
                role: "expert",
                advisor_type: formRole,
                type: "expert"
            }));
            const key = formName.toLowerCase().trim();
            const existingUpdates = JSON.parse(localStorage.getItem("visaformula_expert_profile_updates") || "{}");
            existingUpdates[key] = {
                name: formName,
                role: formRole,
                city: formCityName || finalFullAddress,
                bio: formBio,
                tags: formTagsArray,
                countries: formCountries.split(",").map(c => c.trim()),
                image: formImage,
                profile_photo: formImage,
                phone: formPhone
            };
            localStorage.setItem("visaformula_expert_profile_updates", JSON.stringify(existingUpdates));

            const existingAll = JSON.parse(localStorage.getItem("visaformula_all_experts") || "[]");
            const updatedAll = existingAll.map((x: any) => {
                if (x.name?.toLowerCase() === formName.toLowerCase() || x.id === "logged-in-expert") {
                    return { ...x, name: formName, role: formRole, city: formCityName || finalFullAddress, bio: formBio, image: formImage, tags: formTagsArray, countries: formCountries.split(",").map(c => c.trim()) };
                }
                return x;
            });
            localStorage.setItem("visaformula_all_experts", JSON.stringify(updatedAll));
        } catch (e) {}

        setIsProfileIncomplete(false);
        setIsEditingProfile(false);
        triggerToast("Profile & Location details updated successfully!");
    };

    const handleCreateAd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!adTitle.trim()) return;
        const newAd = {
            id: Date.now(),
            title: adTitle.trim(),
            category: adCategory,
            price: adPrice,
            views: 0,
            status: "Active",
            img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop"
        };
        const updated = [newAd, ...classifiedsList];
        setClassifiedsList(updated);
        localStorage.setItem("expert_activeAds", JSON.stringify(updated));
        setIsPostingAd(false);
        setAdTitle("");
        triggerToast("New Classified Ad published successfully!");
    };

    const handleDeleteAd = (id: number) => {
        const updated = classifiedsList.filter(ad => ad.id !== id);
        setClassifiedsList(updated);
        localStorage.setItem("expert_activeAds", JSON.stringify(updated));
        triggerToast("Classified Ad removed.");
    };

    const handleAddLead = (e: React.FormEvent) => {
        e.preventDefault();
        if (!leadName.trim()) return;
        const newLead = {
            id: Date.now(),
            name: leadName.trim(),
            visa: leadVisa,
            country: leadCountry,
            phone: leadPhone || "N/A",
            status: leadStatus
        };
        const updated = [newLead, ...leadsList];
        setLeadsList(updated);
        localStorage.setItem("expert_leads", JSON.stringify(updated));
        setIsAddingLead(false);
        setLeadName("");
        setLeadPhone("");
        triggerToast("New client lead added!");
    };

    const handleDeleteLead = (id: number) => {
        const updated = leadsList.filter(l => l.id !== id);
        setLeadsList(updated);
        localStorage.setItem("expert_leads", JSON.stringify(updated));
        triggerToast("Lead removed.");
    };

    const handleSubmitTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ticketSubject.trim() || !ticketQuery.trim()) return;

        setIsSubmittingTicket(true);
        const ticketId = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
        const userEmail = localStorage.getItem("expert_email") || "consultant@visaformula.com";
        const userName = profile.name || "Registered Expert";

        const newTicket = {
            id: ticketId,
            subject: ticketSubject.trim(),
            query: ticketQuery.trim(),
            email: userEmail,
            name: userName,
            status: "Open",
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        };

        try {
            await fetch('/api/support/ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTicket)
            });
        } catch (e) {}

        const updatedTickets = [newTicket, ...supportTickets];
        setSupportTickets(updatedTickets);
        localStorage.setItem("expert_support_tickets", JSON.stringify(updatedTickets));

        setTicketSubject("");
        setTicketQuery("");
        setIsSubmittingTicket(false);
        triggerToast(`Support ticket #${ticketId} created & saved to your dashboard!`);
    };

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("expert_isLoggedIn");
            localStorage.removeItem("expert_email");
            localStorage.removeItem("visaformula_user");
            window.location.href = "/signup/expert";
        }
    };

    // Navigation Menu Specification
    const navItems = [
        { id: "overview", label: "Dashboard", icon: LayoutDashboard },
        { id: "profile", label: "Profile & Business", icon: User },
        { id: "leads", label: "Leads", icon: Users },
        { id: "enquiries", label: "Enquiries", icon: MessageSquare },
        { id: "services", label: "My Services", icon: Briefcase },
        { id: "classifieds", label: "Classifieds / Offers", icon: LayoutGrid },
        { id: "reviews", label: "Reviews & Ratings", icon: Star },
        { id: "promotions", label: "Promotions", icon: Sparkles },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "disputes", label: "Disputes", icon: ShieldCheck },
        { id: "messages", label: "Messages", icon: Bell },
        { id: "subscriptions", label: "Subscriptions", icon: DollarSign },
        { id: "settings", label: "Settings", icon: Settings },
        { id: "help", label: "Help & Support", icon: HelpCircle },
    ];

    return (
        <div className="min-h-screen bg-[#f4f6f9] font-sans flex flex-col text-slate-900 selection:bg-[#00a896] selection:text-white">
            
            {/* Success Notification Toast */}
            {showSuccessToast && (
                <div className="fixed top-5 right-5 z-[99999] bg-[#00a896] text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 animate-bounce">
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Top Fixed Header Navbar */}
            <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 px-4 py-3 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                    <a href="/" className="flex items-center">
                        <img src="/logo.png" alt="VisaFormula Logo" className="h-8 sm:h-9 max-h-[36px] w-auto object-contain" />
                    </a>
                    
                    <button 
                        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 lg:hidden ml-2"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <button onClick={() => setActiveTab("help")} className="w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors">
                        <HelpCircle className="w-4.5 h-4.5" />
                    </button>

                    <button onClick={() => setActiveTab("messages")} className="w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors relative">
                        <Bell className="w-4.5 h-4.5" />
                    </button>

                    <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200 cursor-pointer" onClick={() => setActiveTab("profile")}>
                        {profile.image && !profile.image.includes("unsplash.com") ? (
                            <img src={profile.image} alt={profile.name} className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-[#00a896] text-white text-sm font-black flex items-center justify-center border border-teal-200 shrink-0 shadow-2xs">
                                {(profile.name || "E").charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="hidden md:block text-left">
                            <h4 className="text-xs font-extrabold text-slate-900 leading-tight truncate max-w-[140px]">{profile.name}</h4>
                            <span className="inline-block bg-teal-50 text-[#00a896] text-[10px] font-bold px-1.5 py-0.2 rounded border border-teal-200/80 mt-0.5">Basic Plan</span>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                    </div>
                </div>
            </header>

            <div className="flex flex-1 min-h-[calc(100vh-61px)]">

                {/* Left Sidebar Navigation */}
                <aside className={`hidden lg:flex bg-white border-r border-slate-200/80 flex-col justify-between transition-all duration-300 z-30 shrink-0 select-none ${isSidebarCollapsed ? "w-20" : "w-64"}`}>
                    <div className="p-3 space-y-1">
                        {navItems.map(item => {
                            const isActive = activeTab === item.id;
                            const IconComp = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                                        isActive
                                            ? "bg-[#00a896] text-white shadow-md"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                                        {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                                    </div>
                                </button>
                            );
                        })}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-rose-600 hover:bg-rose-50 transition-all mt-4"
                        >
                            <LogOut className="w-4 h-4 shrink-0 text-rose-500" />
                            {!isSidebarCollapsed && <span>Logout</span>}
                        </button>
                    </div>

                    {!isSidebarCollapsed && (
                        <div className="p-4 m-3 bg-[#f0fdfa] border border-[#ccfbf1] rounded-2xl space-y-3">
                            <h4 className="text-xs font-extrabold text-slate-900">Upgrade to Premium</h4>
                            <ul className="text-[11px] font-semibold text-slate-600 space-y-1">
                                <li className="flex items-center gap-1.5"><span className="text-[#00a896] font-bold">•</span> More leads</li>
                                <li className="flex items-center gap-1.5"><span className="text-[#00a896] font-bold">•</span> Featured listing</li>
                                <li className="flex items-center gap-1.5"><span className="text-[#00a896] font-bold">•</span> Advanced analytics</li>
                                <li className="flex items-center gap-1.5"><span className="text-[#00a896] font-bold">•</span> Priority support</li>
                            </ul>
                            <button 
                                onClick={() => setActiveTab("subscriptions")}
                                className="w-full bg-[#00a896] hover:bg-[#008f80] text-white font-bold py-2 px-3 rounded-xl text-xs shadow-sm transition-all cursor-pointer"
                            >
                                Upgrade Now
                            </button>
                        </div>
                    )}
                </aside>

                {/* Mobile Drawer Navigation */}
                <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsMobileSidebarOpen(false)} />
                    <aside className={`absolute top-0 left-0 w-72 h-full bg-white shadow-2xl flex flex-col justify-between p-4 transform transition-transform duration-300 overflow-y-auto ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <img src="/logo.png" alt="VisaFormula" className="h-7 w-auto object-contain" />
                                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <nav className="space-y-1">
                                {navItems.map(item => {
                                    const isActive = activeTab === item.id;
                                    const IconComp = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveTab(item.id);
                                                setIsMobileSidebarOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                                                isActive
                                                    ? "bg-[#00a896] text-white shadow-md"
                                                    : "text-slate-600 hover:bg-slate-100"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <IconComp className="w-4 h-4" />
                                                <span>{item.label}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-rose-600 hover:bg-rose-50 transition-all mt-4"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>
                    </aside>
                </div>

                {/* Main Content Workspace */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">

                    {/* Live Profile Listing Status Banners */}
                    {isProfileIncomplete ? (
                        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs w-full animate-fade-up">
                            <div className="flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-amber-100/90 flex items-center justify-center text-amber-800 shrink-0 font-black text-lg border border-amber-200">
                                    ⚠️
                                </div>
                                <div>
                                    <h4 className="text-sm font-extrabold text-amber-950 leading-tight">Complete your consultant profile to get listed</h4>
                                    <p className="text-xs font-semibold text-amber-800 mt-1 leading-relaxed">
                                        Please fill in your location address, specialization tags, and bio to get publicly listed on Find Experts & start receiving client leads.
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsEditingProfile(true)}
                                className="bg-amber-800 hover:bg-amber-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                            >
                                <span>Complete Profile to Get Listed</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs w-full animate-fade-up">
                            <div className="flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 font-black text-lg shadow-sm">
                                    ✓
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-extrabold text-emerald-950 leading-tight">Your Agency Profile is Active & Listed Live!</h4>
                                        <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">🟢 LIVE LISTING</span>
                                    </div>
                                    <p className="text-xs font-semibold text-emerald-800 mt-1 leading-relaxed">
                                        Your profile is published and publicly discoverable by visa seekers across the Find Experts directory.
                                    </p>
                                </div>
                            </div>
                            <a 
                                href="/find-experts"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-[#00a896] hover:bg-[#008f80] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                            >
                                <span>View Live Listing</span>
                                <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    )}

                    {/* 1. TAB: OVERVIEW */}
                    {activeTab === "overview" && (
                        <>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
                                </div>
                                <div className="relative">
                                    <button 
                                        onClick={() => setTimePeriodOpen(!timePeriodOpen)}
                                        className="bg-white border border-slate-200/90 hover:border-slate-300 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 shadow-2xs cursor-pointer"
                                    >
                                        <span>{timePeriod}</span>
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                    </button>
                                    {timePeriodOpen && (
                                        <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 w-44 font-sora text-xs">
                                            {["This Month", "Last 7 Days", "Last 30 Days", "This Year"].map(p => (
                                                <button 
                                                    key={p} 
                                                    onClick={() => { setTimePeriod(p); setTimePeriodOpen(false); }}
                                                    className="w-full text-left px-4 py-2 font-semibold hover:bg-slate-50 text-slate-700"
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Section 1: Dynamic Stat Metric Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center cursor-pointer" onClick={() => setActiveTab("leads")}>
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00a896] mb-3">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 leading-tight">{leadsList.length}</span>
                                    <span className="text-xs font-bold text-slate-500 mt-1">Total Leads</span>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center cursor-pointer" onClick={() => setActiveTab("enquiries")}>
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00a896] mb-3">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 leading-tight">{enquiriesList.length}</span>
                                    <span className="text-xs font-bold text-slate-500 mt-1">New Enquiries</span>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center cursor-pointer" onClick={() => setActiveTab("analytics")}>
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00a896] mb-3">
                                        <Eye className="w-5 h-5" />
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 leading-tight">5</span>
                                    <span className="text-xs font-bold text-slate-500 mt-1">Profile Views<br/><span className="text-[10px] font-medium text-slate-400">This Month</span></span>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center cursor-pointer" onClick={() => setActiveTab("reviews")}>
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 mb-3">
                                        <Star className="w-5 h-5 fill-amber-400" />
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 leading-tight">4.3</span>
                                    <span className="text-xs font-bold text-slate-500 mt-1">Avg. Rating</span>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center col-span-2 sm:col-span-1 cursor-pointer" onClick={() => setActiveTab("disputes")}>
                                    <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-3">
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 leading-tight">{disputesList.length}</span>
                                    <span className="text-xs font-bold text-slate-500 mt-1">Ongoing Disputes</span>
                                </div>
                            </div>

                            {/* Section 2: Chart + Enquiries + Profile Strength */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                                {/* Bar Chart — Leads & Enquiries Activity */}
                                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-extrabold text-slate-900">Leads Overview</h3>
                                        <div className="flex items-center gap-3 text-[10.5px] font-bold">
                                            <span className="flex items-center gap-1.5 text-cyan-600"><span className="w-2 h-2 rounded-full bg-cyan-500" /> New Enquiries</span>
                                            <span className="flex items-center gap-1.5 text-indigo-600"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Qualified Leads</span>
                                        </div>
                                    </div>
                                    {/* SVG Bar Chart */}
                                    <div className="w-full h-44 relative">
                                        <svg viewBox="0 0 300 150" className="w-full h-full" preserveAspectRatio="none">
                                            {/* Y-axis grid lines */}
                                            {[0,1,2,3,4].map(i => (
                                                <line key={i} x1="30" y1={10 + i*28} x2="295" y2={10 + i*28} stroke="#f1f5f9" strokeWidth="1" />
                                            ))}
                                            {/* Y labels */}
                                            {[20,15,10,5,0].map((v,i) => (
                                                <text key={i} x="25" y={14 + i*28} textAnchor="end" fontSize="7" fill="#94a3b8">{v}</text>
                                            ))}
                                            {/* Bars — Enquiries (cyan) */}
                                            {[8,12,6,15,10,18,9,14,11,7].map((v,i) => (
                                                <rect key={i} x={33 + i*27} y={122 - v*5.6} width="10" height={v*5.6} rx="2" fill="#06b6d4" opacity="0.85" />
                                            ))}
                                            {/* Bars — Qualified Leads (indigo) */}
                                            {[4,7,3,9,6,11,5,8,7,4].map((v,i) => (
                                                <rect key={i} x={44 + i*27} y={122 - v*5.6} width="10" height={v*5.6} rx="2" fill="#6366f1" opacity="0.85" />
                                            ))}
                                            {/* X axis labels */}
                                            {["May 1","May 8","May 15","May 22","May 29"].map((l,i) => (
                                                <text key={i} x={38 + i*54} y="138" textAnchor="middle" fontSize="6.5" fill="#94a3b8">{l}</text>
                                            ))}
                                            {/* X axis line */}
                                            <line x1="30" y1="122" x2="295" y2="122" stroke="#e2e8f0" strokeWidth="1" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Recent Enquiries */}
                                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-extrabold text-slate-900">Recent Enquiries</h3>
                                        <button onClick={() => setActiveTab("enquiries")} className="text-xs font-bold text-[#00a896] hover:underline">View All</button>
                                    </div>
                                    <div className="space-y-2">
                                        {enquiriesList.slice(0,4).map((enq, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
                                                <div className="flex items-center gap-2.5">
                                                    <span className="text-lg leading-none">{enq.flag}</span>
                                                    <div>
                                                        <h4 className="text-xs font-extrabold text-slate-900">{enq.name}</h4>
                                                        <span className="text-[10px] font-medium text-slate-400">{enq.visa}</span>
                                                    </div>
                                                </div>
                                                <span className={`text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-md ${
                                                    enq.status === "New" ? "bg-amber-500 text-white" :
                                                    enq.status === "Contacted" ? "bg-blue-500 text-white" :
                                                    "bg-slate-200 text-slate-600"
                                                }`}>{enq.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Profile Strength */}
                                <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between items-center text-center">
                                    <div className="w-full text-left">
                                        <h3 className="text-sm font-extrabold text-slate-900">Profile Strength</h3>
                                    </div>
                                    <div className="relative w-28 h-28 my-2 flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                            <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            <path className="text-[#00a896]" strokeDasharray="70, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        </svg>
                                        <span className="absolute text-xl font-black text-slate-900">70%</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block">Good</span>
                                        <p className="text-[11px] font-medium text-slate-500 max-w-[180px] mx-auto">Improve your profile to get more leads.</p>
                                    </div>
                                    <button onClick={() => setIsEditingProfile(true)} className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1 mt-2">
                                        <span>Improve Profile</span>
                                        <span>&rarr;</span>
                                    </button>
                                </div>
                            </div>

                            {/* Section 3: My Classifieds / Offers Card */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-black text-slate-900">My Classifieds / Offers ({classifiedsList.length})</h3>
                                    <button onClick={() => setActiveTab("classifieds")} className="text-xs font-bold text-[#00a896] hover:underline">Manage Ads</button>
                                </div>

                                {classifiedsList.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {classifiedsList.map(ad => (
                                            <div key={ad.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                                                <div>
                                                    <div className="h-32 w-full relative overflow-hidden bg-slate-100">
                                                        <img src={ad.img || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop"} alt={ad.title} className="w-full h-full object-cover" />
                                                        <span className="absolute top-2 left-2 bg-[#00a896] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                                                            {ad.category}
                                                        </span>
                                                    </div>
                                                    <div className="p-3.5 space-y-1.5">
                                                        <h4 className="text-xs font-extrabold text-slate-900 leading-snug line-clamp-2">{ad.title}</h4>
                                                        <p className="text-xs font-black text-[#00a896]">{ad.price}</p>
                                                    </div>
                                                </div>
                                                <div className="p-3.5 pt-0 flex items-center justify-between border-t border-slate-100 text-[11px] font-bold text-slate-500">
                                                    <span className="text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md">Active</span>
                                                    <button onClick={() => handleDeleteAd(ad.id)} className="text-rose-600 hover:underline">Delete</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-2">
                                        <LayoutGrid className="w-8 h-8 text-slate-300 mx-auto" />
                                        <h4 className="text-sm font-extrabold text-slate-800">No Active Classified Ads Yet</h4>
                                        <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">Create and publish promotional ads or study/work offers to reach thousands of visa seekers on VisaFormula.</p>
                                    </div>
                                )}

                                <button 
                                    onClick={() => setIsPostingAd(true)} 
                                    className="w-full py-3 bg-[#f0fdfa] hover:bg-[#e6fffa] border border-[#00a896] text-[#00a896] rounded-xl text-xs font-extrabold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Post New Classified / Offer</span>
                                </button>
                            </div>

                            {/* Section 4: Reviews + Disputes + Promote Your Business */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                                {/* Reviews & Ratings */}
                                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-extrabold text-slate-900">Reviews & Ratings</h3>
                                        <button onClick={() => setActiveTab("reviews")} className="text-xs font-bold text-[#00a896] hover:underline">View All</button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-4xl font-black text-slate-900">4.3</span>
                                        <div>
                                            <div className="flex items-center gap-0.5">
                                                {[1,2,3,4,5].map(s => (
                                                    <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-amber-400 fill-amber-400" : "text-amber-200 fill-amber-100"}`} />
                                                ))}
                                            </div>
                                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">{reviewsList.length} Reviews</p>
                                        </div>
                                    </div>
                                    {/* Star breakdown bars */}
                                    <div className="space-y-1.5">
                                        {[{s:5,count:18},{s:4,count:8},{s:3,count:4},{s:2,count:2},{s:1,count:1}].map(({s,count}) => (
                                            <div key={s} className="flex items-center gap-2 text-[10.5px] font-bold text-slate-500">
                                                <span className="w-3 text-right">{s}</span>
                                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-amber-400 rounded-full" style={{width: `${(count/33)*100}%`}} />
                                                </div>
                                                <span className="w-4 text-right">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Ongoing Disputes */}
                                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-extrabold text-slate-900">Ongoing Disputes</h3>
                                        <button onClick={() => setActiveTab("disputes")} className="text-xs font-bold text-[#00a896] hover:underline">View All</button>
                                    </div>
                                    <div className="space-y-3">
                                        {disputesList.map((d) => (
                                            <div key={d.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10.5px] font-extrabold text-slate-700">Dispute #{d.id}</span>
                                                    <span className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-md ${
                                                        d.status === "Under Review" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                                                    }`}>{d.status}</span>
                                                </div>
                                                <p className="text-[10.5px] font-bold text-slate-900">Client: {d.client}</p>
                                                <p className="text-[10px] text-slate-500 font-medium">Issue: {d.issue}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Promote Your Business */}
                                <div className="lg:col-span-4 bg-gradient-to-br from-[#00a896] to-[#007a6e] rounded-2xl p-5 shadow-md space-y-3 text-white">
                                    <div className="flex items-center gap-2">
                                        <Megaphone className="w-5 h-5 text-white/80" />
                                        <h3 className="text-sm font-extrabold">Promote Your Business</h3>
                                    </div>
                                    <p className="text-[11px] font-medium text-white/80 leading-relaxed">Get more visibility on VisaFormula homepage page</p>
                                    <ul className="space-y-1.5 text-xs font-semibold text-white/90">
                                        <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-white" /> Featured Listing</li>
                                        <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-white" /> Top Position</li>
                                        <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-white" /> More Leads</li>
                                    </ul>
                                    <button
                                        onClick={() => setActiveTab("promotions")}
                                        className="w-full bg-white text-[#00a896] font-extrabold text-xs py-2.5 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                                    >
                                        🚀 Promote Now
                                    </button>
                                </div>
                            </div>

                            {/* Section 5: Business Details Footer */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <h3 className="text-sm font-extrabold text-slate-900">Business Details</h3>
                                    <button onClick={() => setIsEditingProfile(true)} className="text-xs font-bold text-[#00a896] hover:underline flex items-center gap-1">
                                        <Edit2 className="w-3.5 h-3.5" /> Edit Details
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-extrabold text-slate-900">{profile.name}</span>
                                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-200">✔ Verified</span>
                                        </div>
                                        <span className="text-slate-500 font-medium mt-0.5 block">{profile.city}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 font-bold block text-[10.5px]">Agency Type</span>
                                        <span className="font-extrabold text-slate-900 block mt-0.5">{profile.role}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 font-bold block text-[10.5px]">Countries Covered</span>
                                        <span className="font-extrabold text-slate-900 block mt-0.5">{profile.countries}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 font-bold block text-[10.5px]">Specializations</span>
                                        <span className="font-extrabold text-slate-900 block mt-0.5 truncate">{profile.specializations}</span>
                                    </div>
                                </div>
                                <div className="border-t border-slate-100 pt-3 text-center text-xs font-semibold text-slate-500">
                                    Need help? Visit our <button onClick={() => setActiveTab("help")} className="text-[#00a896] font-bold hover:underline">Help Center</button> or <button onClick={() => setActiveTab("help")} className="text-[#00a896] font-bold hover:underline">Contact Support</button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* 2. TAB: PROFILE & BUSINESS */}
                    {activeTab === "profile" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">Profile & Business Details</h2>
                                    <p className="text-xs font-medium text-slate-500">Manage public profile, business verification, and consultation background</p>
                                </div>
                                <button onClick={() => setIsEditingProfile(true)} className="bg-[#00a896] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5">
                                    <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                                </button>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {profile.image && !profile.image.includes("unsplash.com") ? (
                                    <img src={profile.image} alt={profile.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-200 shadow-sm shrink-0" />
                                ) : (
                                    <div className="w-24 h-24 rounded-2xl bg-[#00a896] text-white text-3xl font-black flex items-center justify-center border-2 border-teal-200 shadow-sm shrink-0">
                                        {(profile.name || "E").charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-black text-slate-900">{profile.name}</h3>
                                        <span className="bg-emerald-50 text-emerald-700 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">✔ Verified Agency</span>
                                    </div>
                                    <p className="text-xs font-bold text-[#00a896]">{profile.role} • {profile.city}</p>
                                    <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">{profile.bio}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                                <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                                    <span className="font-bold text-slate-500 block">Areas of Expertise:</span>
                                    <span className="font-black text-slate-900 block">{profile.specializations}</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                                    <span className="font-bold text-slate-500 block">Countries Covered:</span>
                                    <span className="font-black text-slate-900 block">{profile.countries}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. TAB: LEADS */}
                    {activeTab === "leads" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">Client Leads Manager ({leadsList.length} Active Leads)</h2>
                                    <p className="text-xs font-medium text-slate-500">Track and convert prospective visa applicants & consultation leads</p>
                                </div>
                                <button onClick={() => setIsAddingLead(true)} className="bg-[#00a896] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1">
                                    <Plus className="w-4 h-4" /> Add New Lead
                                </button>
                            </div>

                            {leadsList.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-extrabold">
                                                <th className="p-3">Client Name</th>
                                                <th className="p-3">Visa Type</th>
                                                <th className="p-3">Destination</th>
                                                <th className="p-3">Contact</th>
                                                <th className="p-3">Status</th>
                                                <th className="p-3 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {leadsList.map((lead) => (
                                                <tr key={lead.id} className="hover:bg-slate-50 font-semibold">
                                                    <td className="p-3 font-extrabold text-slate-900">{lead.name}</td>
                                                    <td className="p-3 text-slate-700">{lead.visa}</td>
                                                    <td className="p-3 text-slate-900 font-bold">{lead.country}</td>
                                                    <td className="p-3 text-slate-600">{lead.phone}</td>
                                                    <td className="p-3">
                                                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold ${lead.status === "New" ? "bg-amber-500 text-white" : lead.status === "Contacted" ? "bg-blue-100 text-blue-700" : lead.status === "Qualified" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                                                            {lead.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-right space-x-2">
                                                        <button onClick={() => { setActiveChatClient(lead.name); setActiveTab("messages"); }} className="bg-[#00a896] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#008f80]">
                                                            Chat
                                                        </button>
                                                        <button onClick={() => handleDeleteLead(lead.id)} className="text-rose-600 hover:underline text-xs">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
                                    <Users className="w-10 h-10 text-slate-300 mx-auto" />
                                    <h3 className="text-base font-extrabold text-slate-800">No Client Leads Found</h3>
                                    <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">Add your client leads to start tracking consultation requests and visa application stages.</p>
                                    <button onClick={() => setIsAddingLead(true)} className="bg-[#00a896] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md">
                                        + Add New Lead
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 4. TAB: ENQUIRIES */}
                    {activeTab === "enquiries" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">Client Enquiries ({enquiriesList.length})</h2>
                                    <p className="text-xs font-medium text-slate-500">Incoming inquiries submitted from your VisaFormula listing</p>
                                </div>
                            </div>

                            {enquiriesList.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {enquiriesList.map((enq, i) => (
                                        <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-extrabold text-sm text-slate-900">{enq.name}</span>
                                                <span className="text-xs font-medium text-slate-400">{enq.time}</span>
                                            </div>
                                            <p className="text-xs font-medium text-slate-700">{enq.text}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
                                    <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
                                    <h3 className="text-base font-extrabold text-slate-800">No Client Enquiries Yet</h3>
                                    <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">When prospective clients send inquiries from your VisaFormula listing, they will appear here in real-time.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 5. TAB: MY SERVICES */}
                    {activeTab === "services" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">Service Packages & Escrow Rates</h2>
                                    <p className="text-xs font-medium text-slate-500">Configure consultation prices and milestone services</p>
                                </div>
                                <button onClick={() => triggerToast("Added new service package!")} className="bg-[#00a896] text-white px-4 py-2 rounded-xl text-xs font-bold">
                                    + Add New Package
                                </button>
                            </div>

                            <div className="space-y-3">
                                {servicesList.map(s => (
                                    <div key={s.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${s.active ? "bg-emerald-500" : "bg-slate-300"}`} />
                                            <span className="text-xs font-bold text-slate-800">{s.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-black text-sm text-slate-900">{s.price}</span>
                                            <button onClick={() => triggerToast(`Editing ${s.name}...`)} className="text-xs text-[#00a896] font-bold hover:underline">Edit</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 6. TAB: CLASSIFIEDS / OFFERS */}
                    {activeTab === "classifieds" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">My Active Classifieds & Offers ({classifiedsList.length})</h2>
                                    <p className="text-xs font-medium text-slate-500">Manage public listings shown on VisaFormula homepage</p>
                                </div>
                                <button onClick={() => setIsPostingAd(true)} className="bg-[#00a896] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1">
                                    <Plus className="w-4 h-4" /> Post New Ad
                                </button>
                            </div>

                            {classifiedsList.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {classifiedsList.map(ad => (
                                        <div key={ad.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs p-4 space-y-3">
                                            <span className="bg-[#00a896] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full">{ad.category}</span>
                                            <h4 className="text-sm font-extrabold text-slate-900">{ad.title}</h4>
                                            <p className="text-xs font-bold text-[#00a896]">Price: {ad.price}</p>
                                            <div className="flex justify-between items-center text-xs text-slate-500 font-bold border-t pt-2">
                                                <span>👁 {ad.views || 0} Views</span>
                                                <button onClick={() => handleDeleteAd(ad.id)} className="text-rose-600 hover:underline">Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
                                    <LayoutGrid className="w-10 h-10 text-slate-300 mx-auto" />
                                    <h3 className="text-base font-extrabold text-slate-800">No Active Classified Ads</h3>
                                    <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">Create and publish study visa, job permit, or consultancy sale listings to attract clients on VisaFormula.</p>
                                    <button onClick={() => setIsPostingAd(true)} className="bg-[#00a896] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md">
                                        + Post New Classified / Offer
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 7. TAB: REVIEWS & RATINGS */}
                    {activeTab === "reviews" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">Reviews & Ratings</h2>
                                    <p className="text-xs font-medium text-slate-500">Client feedback from completed consultations</p>
                                </div>
                            </div>

                            {reviewsList.length > 0 ? (
                                <div className="space-y-4">
                                    {reviewsList.map((r, i) => (
                                        <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="font-extrabold text-sm text-slate-900">{r.name}</span>
                                                <span className="text-xs text-slate-400 font-semibold">{r.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-amber-400">
                                                {"★".repeat(r.rating)}
                                            </div>
                                            <p className="text-xs text-slate-700 font-medium">{r.text}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
                                    <Star className="w-10 h-10 text-slate-300 mx-auto" />
                                    <h3 className="text-base font-extrabold text-slate-800">No Client Reviews Yet</h3>
                                    <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">When clients complete consultation sessions and leave ratings, their reviews will appear here.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 8. TAB: PROMOTIONS */}
                    {activeTab === "promotions" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">Promotions & Home Page Boost</h2>
                                    <p className="text-xs font-medium text-slate-500">Boost your agency listing to the top position on VisaFormula homepage</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-5 bg-teal-50 border border-teal-200 rounded-2xl space-y-3 text-center">
                                    <Megaphone className="w-8 h-8 text-[#00a896] mx-auto" />
                                    <h3 className="font-extrabold text-sm text-slate-900">Featured Home Page Spot</h3>
                                    <p className="text-xs text-slate-600">Get 10x higher visibility on top search results</p>
                                    <button onClick={() => triggerToast("Activated Featured Spot!")} className="w-full bg-[#00a896] text-white py-2 rounded-xl text-xs font-bold">
                                        Activate (₹1,999/mo)
                                    </button>
                                </div>

                                <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-3 text-center">
                                    <Sparkles className="w-8 h-8 text-amber-600 mx-auto" />
                                    <h3 className="font-extrabold text-sm text-slate-900">Top Verified Badge</h3>
                                    <p className="text-xs text-slate-600">Show priority gold verified trust badge to clients</p>
                                    <button onClick={() => triggerToast("Activated Top Badge!")} className="w-full bg-amber-500 text-white py-2 rounded-xl text-xs font-bold">
                                        Activate (₹999/mo)
                                    </button>
                                </div>

                                <div className="p-5 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-3 text-center">
                                    <TrendingUp className="w-8 h-8 text-indigo-600 mx-auto" />
                                    <h3 className="font-extrabold text-sm text-slate-900">Banner Spotlight</h3>
                                    <p className="text-xs text-slate-600">Display full hero banner ad across destination pages</p>
                                    <button onClick={() => triggerToast("Activated Banner Spotlight!")} className="w-full bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold">
                                        Activate (₹3,499/mo)
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 9. TAB: ANALYTICS */}
                    {activeTab === "analytics" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">Performance Analytics</h2>
                                    <p className="text-xs font-medium text-slate-500">Track monthly views, inquiry growth, and conversion rates</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="p-4 bg-slate-50 rounded-xl border">
                                    <span className="text-xs text-slate-500 font-bold block">Total Profile Views</span>
                                    <span className="text-2xl font-black text-slate-900 block mt-1">1</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border">
                                    <span className="text-xs text-slate-500 font-bold block">Lead Conversion Rate</span>
                                    <span className="text-2xl font-black text-[#00a896] block mt-1">0.0%</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border">
                                    <span className="text-xs text-slate-500 font-bold block">Escrow Earnings</span>
                                    <span className="text-2xl font-black text-slate-900 block mt-1">₹0</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 10. TAB: DISPUTES */}
                    {activeTab === "disputes" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">Disputes & Escrow Resolution</h2>
                                    <p className="text-xs font-medium text-slate-500">Resolve client disputes and milestone escrow holds</p>
                                </div>
                            </div>

                            {disputesList.length > 0 ? (
                                <div className="space-y-3">
                                    {disputesList.map((d, i) => (
                                        <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black text-slate-900">{d.id}</span>
                                                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md">{d.status}</span>
                                            </div>
                                            <p className="text-xs font-semibold text-slate-700">Client: {d.client} | Issue: {d.issue}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
                                    <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto" />
                                    <h3 className="text-base font-extrabold text-slate-800">No Ongoing Disputes</h3>
                                    <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">All client transactions and escrow milestone payments are in good standing.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 11. TAB: MESSAGES */}
                    {activeTab === "messages" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">Messages & Client Chat</h2>
                                    <p className="text-xs font-medium text-slate-500">Real-time messaging with client leads</p>
                                </div>
                            </div>

                            {Object.keys(chatMessages).length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[420px]">
                                    <div className="md:col-span-4 border-r border-slate-200 pr-3 space-y-2 overflow-y-auto">
                                        {Object.keys(chatMessages).map(clientName => (
                                            <button
                                                key={clientName}
                                                onClick={() => setActiveChatClient(clientName)}
                                                className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all ${activeChatClient === clientName ? "bg-[#00a896] text-white border-[#00a896]" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{clientName}</span>
                                                    <span className={`text-[10px] ${activeChatClient === clientName ? "text-white/80" : "text-slate-400"}`}>Active</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="md:col-span-8 flex flex-col justify-between bg-slate-50 rounded-xl p-4 border border-slate-200">
                                        <div className="border-b border-slate-200 pb-2 font-black text-xs text-slate-900">
                                            Chatting with {activeChatClient}
                                        </div>

                                        <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
                                            {(chatMessages[activeChatClient] || []).map((msg, i) => (
                                                <div key={i} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                                                    <div className={`max-w-[80%] p-2.5 rounded-xl text-xs font-medium ${msg.sender === "me" ? "bg-[#00a896] text-white" : "bg-white border border-slate-200 text-slate-800"}`}>
                                                        <p>{msg.text}</p>
                                                        <span className="text-[9px] opacity-70 block text-right mt-1">{msg.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
                                            <input 
                                                type="text" 
                                                value={messageInput} 
                                                onChange={(e) => setMessageInput(e.target.value)} 
                                                placeholder="Type your response message..." 
                                                className="flex-1 px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs outline-none focus:border-[#00a896]"
                                            />
                                            <button type="submit" className="bg-[#00a896] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1">
                                                <Send className="w-3.5 h-3.5" /> Send
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
                                    <Bell className="w-10 h-10 text-slate-300 mx-auto" />
                                    <h3 className="text-base font-extrabold text-slate-800">No Active Conversations Yet</h3>
                                    <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">When clients contact you or submit inquiries, chat threads will open automatically here.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 12. TAB: SUBSCRIPTIONS */}
                    {activeTab === "subscriptions" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">Subscription Plans & Billing</h2>
                                    <p className="text-xs font-medium text-slate-500">Current plan: Basic Plan (Active)</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-5 border-2 border-[#00a896] rounded-2xl bg-teal-50/50 space-y-3">
                                    <span className="bg-[#00a896] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Current Active</span>
                                    <h3 className="text-lg font-black text-slate-900">Basic Plan</h3>
                                    <p className="text-2xl font-black text-slate-900">₹0 <span className="text-xs font-normal text-slate-500">/ forever</span></p>
                                    <ul className="text-xs font-semibold text-slate-700 space-y-1.5">
                                        <li>✓ Standard agency profile listing</li>
                                        <li>✓ Up to 10 client inquiries / month</li>
                                        <li>✓ Standard support</li>
                                    </ul>
                                </div>

                                <div className="p-5 border border-slate-200 rounded-2xl bg-white space-y-3">
                                    <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Recommended</span>
                                    <h3 className="text-lg font-black text-slate-900">Pro Consultant Plan</h3>
                                    <p className="text-2xl font-black text-[#00a896]">₹2,999 <span className="text-xs font-normal text-slate-500">/ month</span></p>
                                    <ul className="text-xs font-semibold text-slate-700 space-y-1.5">
                                        <li>✓ Unlimited client leads & inquiries</li>
                                        <li>✓ Top verified gold badge</li>
                                        <li>✓ Featured home page placement</li>
                                    </ul>
                                    <button onClick={() => triggerToast("Upgrading to Pro Consultant Plan...")} className="w-full bg-[#00a896] text-white py-2 rounded-xl text-xs font-bold">
                                        Upgrade to Pro
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 13. TAB: SETTINGS */}
                    {activeTab === "settings" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">Account & Security Settings</h2>
                                    <p className="text-xs font-medium text-slate-500">Update password, notification preferences, and bank details</p>
                                </div>
                            </div>

                            <div className="space-y-4 max-w-lg">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Account Email Address</label>
                                    <input type="email" disabled value={localStorage.getItem("expert_email") || "consultant@visaformula.com"} className="w-full px-3.5 py-2.5 bg-slate-100 border rounded-xl text-xs font-bold text-slate-500" />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Change Password</label>
                                    <input type="password" placeholder="Enter new password" className="w-full px-3.5 py-2.5 border rounded-xl text-xs font-medium text-slate-900" />
                                </div>

                                <button onClick={() => triggerToast("Settings saved!")} className="bg-[#00a896] text-white px-5 py-2.5 rounded-xl text-xs font-bold">
                                    Save Settings
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 14. TAB: HELP & SUPPORT */}
                    {activeTab === "help" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-900">Help & Support Desk</h2>
                                    <p className="text-xs font-medium text-slate-500">Get assistance from VisaFormula support team & track your queries</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <h3 className="text-sm font-extrabold text-slate-900">Frequently Asked Questions</h3>
                                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                                        <h4 className="text-xs font-bold text-slate-900">How do Escrow payouts work?</h4>
                                        <p className="text-xs text-slate-600">Client payments are held safely until milestone consultation is marked complete.</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                                        <h4 className="text-xs font-bold text-slate-900">How to get Verified Badge?</h4>
                                        <p className="text-xs text-slate-600">Upload your valid immigration license or government registration document in settings.</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-sm font-extrabold text-slate-900">Contact Support Team</h3>
                                    <form onSubmit={handleSubmitTicket} className="space-y-2.5">
                                        <input 
                                            type="text" 
                                            value={ticketSubject}
                                            onChange={(e) => setTicketSubject(e.target.value)}
                                            placeholder="Subject" 
                                            className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-medium outline-none focus:border-[#00a896]" 
                                            required 
                                        />
                                        <textarea 
                                            rows={3} 
                                            value={ticketQuery}
                                            onChange={(e) => setTicketQuery(e.target.value)}
                                            placeholder="Describe your query..." 
                                            className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-medium outline-none focus:border-[#00a896]" 
                                            required 
                                        />
                                        <button 
                                            type="submit" 
                                            disabled={isSubmittingTicket}
                                            className="bg-[#00a896] hover:bg-[#008f80] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:bg-slate-300"
                                        >
                                            {isSubmittingTicket ? "Submitting Ticket..." : "Submit Ticket"}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Submitted Tickets & Contact Queries List */}
                            <div className="pt-4 border-t border-slate-100 space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-extrabold text-slate-900">My Support Tickets & Queries ({supportTickets.length})</h3>
                                </div>

                                {supportTickets.length > 0 ? (
                                    <div className="space-y-2.5">
                                        {supportTickets.map((ticket: any, idx: number) => (
                                            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sora">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="bg-teal-100 text-[#00a896] text-[10px] font-black px-2 py-0.5 rounded-md border border-teal-200">
                                                            #{ticket.id}
                                                        </span>
                                                        <h4 className="text-xs font-extrabold text-slate-900">{ticket.subject}</h4>
                                                    </div>
                                                    <p className="text-xs text-slate-600 font-medium">{ticket.query}</p>
                                                    <span className="text-[10px] text-slate-400 font-semibold block">{ticket.date} · {ticket.email}</span>
                                                </div>
                                                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-3 py-1 rounded-full border border-amber-200 self-start sm:self-auto shrink-0">
                                                    ● {ticket.status || "Open"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-6 text-center border border-dashed border-slate-200 rounded-2xl text-xs text-slate-400 font-medium">
                                        No support tickets submitted yet. Submit a query above to track your tickets here.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </main>
            </div>

            {/* Profile Edit Modal */}
            {isEditingProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsEditingProfile(false)} />
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-5 sm:p-7 space-y-4 z-10 font-sora max-h-[88vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-base sm:text-lg font-extrabold text-slate-900">Edit Business & Profile Details</h3>
                            <button onClick={() => setIsEditingProfile(false)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
                            
                            {/* Profile Photo / Business Logo */}
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Profile Photo / Business Logo</label>
                                <div className="flex items-center gap-3">
                                    {formImage && !formImage.includes("unsplash.com") ? (
                                        <img src={formImage} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-[#00a896] text-white text-lg font-black flex items-center justify-center border border-teal-200 shrink-0">
                                            {(formName || "E").charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    if (typeof reader.result === "string") {
                                                        setFormImage(reader.result);
                                                    }
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-[#00a896] cursor-pointer" 
                                    />
                                </div>
                            </div>

                            {/* Business Name & Type of Business */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                                        <span>Business / Consultancy Name *</span>
                                        <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1"><Lock className="w-3 h-3 text-slate-400" /> Non-editable</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        value={formName} 
                                        disabled
                                        readOnly
                                        className="w-full px-3.5 py-2.5 border border-slate-200 bg-slate-100 rounded-xl text-xs font-bold text-slate-500 cursor-not-allowed outline-none select-none" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Type of Business *</label>
                                    <select 
                                        value={formRole} 
                                        onChange={(e) => setFormRole(e.target.value)}
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black"
                                    >
                                        <option value="Registered Consultant">Registered Consultant</option>
                                        <option value="Authorised immigration / visa appeal lawyer">Authorised immigration / visa appeal lawyer</option>
                                        <option value="Freelancer">Freelancer</option>
                                        <option value="Law Firm / Legal Practice">Law Firm / Legal Practice</option>
                                        <option value="Education & Training Institute">Education & Training Institute</option>
                                        <option value="Recruitment & Manpower Agency">Recruitment & Manpower Agency</option>
                                        <option value="Travel & Tour Agency">Travel & Tour Agency</option>
                                    </select>
                                </div>
                            </div>

                            {/* Contact / WhatsApp Number */}
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Contact / WhatsApp Number *</label>
                                <input 
                                    type="tel" 
                                    required
                                    value={formPhone} 
                                    onChange={(e) => setFormPhone(e.target.value)} 
                                    placeholder="e.g. +91 98765 43210"
                                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                />
                            </div>

                            {/* Office / Practice Location Address (Granular 5 Fields) */}
                            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3 font-sans">
                                <label className="text-xs font-bold text-slate-900 block font-sans">Office / Practice Location Address *</label>
                                <div>
                                    <label className="text-[11px] font-semibold text-slate-700 mb-1 block font-sans">Area / Locality / Street Address *</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formArea} 
                                        onChange={(e) => setFormArea(e.target.value)} 
                                        placeholder="e.g. Suite 402, MG Road"
                                        className="w-full px-3.5 py-2.5 border border-slate-200/90 rounded-2xl text-xs font-semibold text-slate-900 bg-white outline-none focus:border-[#00a896] shadow-2xs font-sans" 
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-700 mb-1 block font-sans">City / District / Town *</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formCityName} 
                                            onChange={(e) => setFormCityName(e.target.value)} 
                                            placeholder="e.g. Mumbai"
                                            className="w-full px-3.5 py-2.5 border border-slate-200/90 rounded-2xl text-xs font-semibold text-slate-900 bg-white outline-none focus:border-[#00a896] shadow-2xs font-sans" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-700 mb-1 block font-sans">State / Province *</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formState} 
                                            onChange={(e) => setFormState(e.target.value)} 
                                            placeholder="e.g. Maharashtra"
                                            className="w-full px-3.5 py-2.5 border border-slate-200/90 rounded-2xl text-xs font-semibold text-slate-900 bg-white outline-none focus:border-[#00a896] shadow-2xs font-sans" 
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-700 mb-1 block font-sans">Country *</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formCountry} 
                                            onChange={(e) => setFormCountry(e.target.value)} 
                                            placeholder="e.g. India"
                                            className="w-full px-3.5 py-2.5 border border-slate-200/90 rounded-2xl text-xs font-semibold text-slate-900 bg-white outline-none focus:border-[#00a896] shadow-2xs font-sans" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-700 mb-1 block font-sans">ZIP / Postal Code *</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formZip} 
                                            onChange={(e) => setFormZip(e.target.value)} 
                                            placeholder="e.g. 400001"
                                            className="w-full px-3.5 py-2.5 border border-slate-200/90 rounded-2xl text-xs font-semibold text-slate-900 bg-white outline-none focus:border-[#00a896] shadow-2xs font-sans" 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Field of Expertise / Study Pills */}
                            <div className="font-sans">
                                <label className="text-xs font-bold text-slate-900 block mb-1 font-sans">Field of Expertise / Study *</label>
                                <span className="text-[11px] text-slate-500 font-semibold block mb-2 font-sans">Select one or more services:</span>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-sans">
                                    {[
                                        { id: "VISIT", label: "Visit Visa" },
                                        { id: "WORK", label: "Work Permit" },
                                        { id: "VISA APPEALS", label: "Visa Appeals" },
                                        { id: "DIGITAL NOMAD", label: "Digital Nomad" },
                                        { id: "PR / MIGRATION", label: "PR & Migration" },
                                        { id: "STUDY", label: "Study Visa" },
                                        { id: "BUSINESS / INVESTMENT", label: "Business / Investor" },
                                        { id: "VISA FILING ASSISTANCE", label: "Visa Filing Assistance" }
                                    ].map(service => {
                                        const isChecked = formTagsArray.includes(service.id);
                                        return (
                                            <button
                                                key={service.id}
                                                type="button"
                                                onClick={() => {
                                                    if (isChecked) {
                                                        setFormTagsArray(prev => prev.filter(t => t !== service.id));
                                                    } else {
                                                        setFormTagsArray(prev => [...prev, service.id]);
                                                    }
                                                }}
                                                className={`px-3 py-2.5 rounded-2xl border text-xs font-semibold text-center transition-all cursor-pointer font-sans ${
                                                    isChecked 
                                                        ? "bg-[#00a896] border-[#00a896] text-white shadow-xs font-bold" 
                                                        : "bg-white border-slate-200/90 text-slate-700 hover:bg-teal-50/50 hover:border-[#00a896]"
                                                }`}
                                            >
                                                {service.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Countries Covered */}
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Countries Covered *</label>
                                <select
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val) {
                                            const currentList = formCountries ? formCountries.split(",").map(c => c.trim()).filter(Boolean) : [];
                                            if (!currentList.includes(val)) {
                                                setFormCountries([...currentList, val].join(", "));
                                            }
                                        }
                                        e.target.value = "";
                                    }}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 bg-white mb-1.5 cursor-pointer"
                                >
                                    <option value="">+ Add Country from Dropdown</option>
                                    <option value="Canada">Canada</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States">United States</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="UAE / Dubai">UAE / Dubai</option>
                                    <option value="Schengen Countries">Schengen Countries</option>
                                    <option value="Worldwide">Worldwide / All Countries</option>
                                </select>
                                <input 
                                    type="text" 
                                    value={formCountries} 
                                    onChange={(e) => setFormCountries(e.target.value)} 
                                    placeholder="e.g. Canada, UK, USA, Australia"
                                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" 
                                />
                            </div>

                            {/* Government Registration & Portfolio */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Government Registration Number / License (Optional)</label>
                                    <input 
                                        type="text" 
                                        value={formGovReg} 
                                        onChange={(e) => setFormGovReg(e.target.value)} 
                                        placeholder="License / Reg Number"
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-black" 
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Portfolio / Website Link (Optional)</label>
                                    <input 
                                        type="url" 
                                        value={formPortfolio} 
                                        onChange={(e) => setFormPortfolio(e.target.value)} 
                                        placeholder="https://yourwebsite.com"
                                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-black" 
                                    />
                                </div>
                            </div>

                            {/* About Consultancy & Bio */}
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">About Consultancy & Bio</label>
                                <textarea 
                                    rows={3} 
                                    value={formBio} 
                                    onChange={(e) => setFormBio(e.target.value)} 
                                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-black" 
                                />
                            </div>

                            <div className="flex gap-3 pt-2 border-t border-slate-100">
                                <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 py-3 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-[#00a896] hover:bg-[#008f80] text-white font-bold rounded-xl text-xs shadow-md transition-all">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Post an Ad / Offer Modal */}
            {isPostingAd && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsPostingAd(false)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 z-10 font-sora">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-base font-extrabold text-slate-900">Post New Classified / Offer</h3>
                            <button onClick={() => setIsPostingAd(false)} className="p-1 text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateAd} className="space-y-3">
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Title / Heading *</label>
                                <input type="text" value={adTitle} onChange={(e) => setAdTitle(e.target.value)} placeholder="e.g. Study in Canada 2025 Special Deal" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" required />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Category *</label>
                                <select value={adCategory} onChange={(e) => setAdCategory(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black">
                                    <option value="Study Abroad">Study Abroad</option>
                                    <option value="Jobs Abroad">Jobs Abroad</option>
                                    <option value="Accommodation">Accommodation</option>
                                    <option value="Business Opportunity">Business Opportunity</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Price / Tagline</label>
                                <input type="text" value={adPrice} onChange={(e) => setAdPrice(e.target.value)} placeholder="e.g. FREE or ₹ 650 CAD / Month" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setIsPostingAd(false)} className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-[#00a896] text-white font-bold rounded-xl text-xs shadow-md">Publish Listing</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add New Lead Modal */}
            {isAddingLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsAddingLead(false)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 z-10 font-sora">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-base font-extrabold text-slate-900">Add New Client Lead</h3>
                            <button onClick={() => setIsAddingLead(false)} className="p-1 text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddLead} className="space-y-3">
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Client Full Name *</label>
                                <input type="text" value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="e.g. Rajesh Kumar" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" required />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Visa Category</label>
                                <select value={leadVisa} onChange={(e) => setLeadVisa(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black">
                                    <option value="Study Visa">Study Visa</option>
                                    <option value="Work Permit">Work Permit</option>
                                    <option value="Visitor Visa">Visitor Visa</option>
                                    <option value="Express Entry PR">Express Entry PR</option>
                                    <option value="Tourist Visa">Tourist Visa</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Destination Country</label>
                                <select value={leadCountry} onChange={(e) => setLeadCountry(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black">
                                    <option value="Canada 🇨🇦">Canada 🇨🇦</option>
                                    <option value="UK 🇬🇧">UK 🇬🇧</option>
                                    <option value="USA 🇺🇸">USA 🇺🇸</option>
                                    <option value="Australia 🇦🇺">Australia 🇦🇺</option>
                                    <option value="Germany 🇩🇪">Germany 🇩🇪</option>
                                    <option value="New Zealand 🇳🇿">New Zealand 🇳🇿</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Contact Phone Number</label>
                                <input type="text" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} placeholder="e.g. +91 98765 43210" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 mb-1 block">Initial Status</label>
                                <select value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-black">
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Qualified">Qualified</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setIsAddingLead(false)} className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-[#00a896] text-white font-bold rounded-xl text-xs shadow-md">Add Lead</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
