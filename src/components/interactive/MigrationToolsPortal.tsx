import React, { useState } from "react";
import { 
    Calculator, CheckCircle, ShieldCheck, DollarSign, Clock, FileText, 
    Search, RefreshCw, Clipboard, ArrowRight, Star, Globe, Info, HelpCircle
} from "lucide-react";

interface Occupation {
    title: string;
    noc: string;
    anzsco: string;
    soc: string;
    demand: "High" | "Medium" | "Low";
}

const OCCUPATIONS: Occupation[] = [
    { title: "Software Engineer / Developer", noc: "21232", anzsco: "261313", soc: "2136", demand: "High" },
    { title: "Registered Nurse", noc: "31301", anzsco: "254499", soc: "2236", demand: "High" },
    { title: "Data Scientist", noc: "21211", anzsco: "261399", soc: "2135", demand: "High" },
    { title: "Marketing Manager", noc: "10022", anzsco: "131112", soc: "1132", demand: "Medium" },
    { title: "Mechanical Engineer", noc: "21301", anzsco: "233512", soc: "2122", demand: "Medium" },
    { title: "Accountant", noc: "11100", anzsco: "221111", soc: "2421", demand: "Medium" },
    { title: "Civil Engineer", noc: "21300", anzsco: "233211", soc: "2121", demand: "High" },
    { title: "Business Analyst", noc: "21220", anzsco: "261111", soc: "2135", demand: "High" },
    { title: "Graphic Designer", noc: "52120", anzsco: "232411", soc: "3411", demand: "Low" }
];

export function MigrationToolsPortal() {
    const [activeTool, setActiveTool] = useState<string>("eligibility"); // eligibility, points, cost, docs, occupation

    // 1. Eligibility states
    const [eligCountry, setEligCountry] = useState("Canada");
    const [eligAge, setEligAge] = useState(25);
    const [eligEdu, setEligEdu] = useState("Master's");
    const [eligLang, setEligLang] = useState("CLB 9");
    const [eligExp, setEligExp] = useState(3);
    const [eligJobOffer, setEligJobOffer] = useState(false);

    // 2. CRS / Points States
    const [pointsCountry, setPointsCountry] = useState("Canada");
    // Canada CRS inputs
    const [crsAge, setCrsAge] = useState("20-29");
    const [crsEdu, setCrsEdu] = useState("Master's");
    const [crsExp, setCrsExp] = useState("3+ years");
    const [crsIeltsL, setCrsIeltsL] = useState(8.0);
    const [crsIeltsR, setCrsIeltsR] = useState(7.0);
    const [crsIeltsW, setCrsIeltsW] = useState(7.0);
    const [crsIeltsS, setCrsIeltsS] = useState(7.0);
    const [crsSpouse, setCrsSpouse] = useState(false);
    // Australia Points inputs
    const [ausAge, setAusAge] = useState("25-32");
    const [ausEdu, setAusEdu] = useState("Bachelor's");
    const [ausLang, setAusLang] = useState("Superior (IELTS 8+)");
    const [ausExp, setAusExp] = useState("5-7 years");
    const [ausPartner, setAusPartner] = useState("Single");

    // 3. Fee & Cost Estimator States
    const [costCountry, setCostCountry] = useState("Canada");
    const [costVisaType, setCostVisaType] = useState("PR");
    const [costDependents, setCostDependents] = useState(0);

    // 4. Document Checklist Generator States
    const [docVisaType, setDocVisaType] = useState("PR");

    // 5. Occupation search
    const [searchQuery, setSearchQuery] = useState("");

    // --- CALCULATIONS ---

    // Eligibility Checker results
    const checkEligibility = () => {
        if (eligCountry === "Canada") {
            if (eligAge < 45 && eligExp >= 1) return { eligible: true, desc: "You qualify for FSW. Minimum eligibility points met." };
            return { eligible: false, desc: "You do not meet the minimum entry requirements. Try to gain more work experience or boost language skills." };
        }
        if (eligCountry === "Australia") {
            if (eligAge < 45 && eligExp >= 2) return { eligible: true, desc: "Eligible for SkillSelect registration. Estimated points > 65." };
            return { eligible: false, desc: "Australian skilled migration requires age under 45 and formal skills assessment." };
        }
        if (eligCountry === "UK") {
            if (eligJobOffer && eligLang !== "None") return { eligible: true, desc: "You meet the 70-point Skilled Worker requirement (Sponsorship needed)." };
            return { eligible: false, desc: "You must have a job offer from an approved sponsor to qualify for UK Skilled Worker." };
        }
        // US
        if (eligEdu === "PhD" || eligEdu === "Master's" || eligJobOffer) {
            return { eligible: true, desc: "Eligible for EB-2 / EB-3 professional classification categories." };
        }
        return { eligible: false, desc: "Requires a US employer sponsor or high investor threshold (EB-5)." };
    };

    // CRS Calculator score
    const calcCrsScore = () => {
        let score = 0;
        // Age points (Max 110 with spouse, 120 without)
        const ageMap: Record<string, number> = {
            "Under 18": 0, "18": 99, "19": 105, "20-29": 110, "30": 105, "31-39": 85, "40-44": 35, "45+": 0
        };
        score += ageMap[crsAge] || 0;

        // Education points (Max 150)
        const eduMap: Record<string, number> = {
            "PhD": 150, "Master's": 135, "Bachelor's": 120, "Two+ credentials": 128, "Diploma": 98, "High School": 30
        };
        score += eduMap[crsEdu] || 0;

        // Work experience points (Max 80)
        const expMap: Record<string, number> = {
            "None": 0, "1 year": 40, "2 years": 53, "3+ years": 64
        };
        score += expMap[crsExp] || 0;

        // Language points (estimated simplifed IELTS scoring)
        const ieltsAvg = (crsIeltsL + crsIeltsR + crsIeltsW + crsIeltsS) / 4;
        if (ieltsAvg >= 8) score += 136;
        else if (ieltsAvg >= 7.5) score += 124;
        else if (ieltsAvg >= 7) score += 110;
        else if (ieltsAvg >= 6.5) score += 80;
        else score += 40;

        // Additional / Spouse / Adaptability factors
        if (crsSpouse) score += 40;
        else score += 30; // adaptability points equivalent

        return score;
    };

    // Australia Points Calculator (65 points min threshold)
    const calcAusPoints = () => {
        let points = 0;
        // Age (Max 30)
        if (ausAge === "18-24") points += 25;
        else if (ausAge === "25-32") points += 30;
        else if (ausAge === "33-39") points += 25;
        else if (ausAge === "40-44") points += 15;

        // Language (Max 20)
        if (ausLang.includes("Superior")) points += 20;
        else if (ausLang.includes("Proficient")) points += 10;

        // Education (Max 20)
        if (ausEdu === "PhD") points += 20;
        else if (ausEdu === "Bachelor's" || ausEdu === "Master's") points += 15;
        else points += 10;

        // Experience (Max 15)
        if (ausExp === "8+ years") points += 15;
        else if (ausExp === "5-7 years") points += 10;
        else if (ausExp === "3-4 years") points += 5;

        // Partner skills (Max 10)
        if (ausPartner === "Single" || ausPartner === "Skilled Spouse") points += 10;

        return points;
    };

    // UK Points Calculator (70 points min requirement)
    const calcUkPoints = () => {
        let points = 0;
        if (eligJobOffer) points += 20; // Offer by approved sponsor
        if (eligEdu !== "High School") points += 20; // Job at appropriate skill level
        if (eligLang !== "None") points += 10; // Speaks English
        // Salary points
        points += 20; // Assuming minimum salary met
        return points;
    };

    // Fee calculations
    const getFeeEstimate = () => {
        let govFee = 0;
        let serviceFee = 350;

        if (costCountry === "Canada") {
            if (costVisaType === "PR") govFee = 1525;
            else if (costVisaType === "Student") govFee = 150;
            else govFee = 155;
        } else if (costCountry === "Australia") {
            if (costVisaType === "PR") govFee = 4640;
            else if (costVisaType === "Student") govFee = 710;
            else govFee = 325;
        } else { // UK
            if (costVisaType === "PR") govFee = 1200; // Indefinite Leave
            else if (costVisaType === "Student") govFee = 490;
            else govFee = 715;
        }

        const dependentAdd = costVisaType === "PR" ? (costCountry === "Canada" ? 950 : 2300) : 150;
        const dependentFees = costDependents * dependentAdd;

        return {
            govFee,
            dependentFees,
            serviceFee,
            total: govFee + dependentFees + serviceFee
        };
    };

    // Document checklists
    const getDocsChecklist = () => {
        if (docVisaType === "PR") {
            return [
                "Passport (Valid for at least 6 months)",
                "Language Test Results (IELTS/PTE/CELPIP)",
                "Educational Credential Assessment (ECA)",
                "Proof of Funds (Bank Certificates)",
                "Police Clearance Certificates (PCC)",
                "Reference Letters from Previous Employers"
            ];
        }
        if (docVisaType === "Student") {
            return [
                "Letter of Acceptance (LOA)",
                "Proof of Tuition Payment & GIC receipt",
                "Academic Transcripts & Certificates",
                "Statement of Purpose (SOP)",
                "Proof of Financial Support (1 year living costs)",
                "IELTS/PTE Score Card"
            ];
        }
        return [
            "Employer Job Offer Letter & Contract",
            "LMIA/COS Sponsorship Documentation",
            "Valid Work Experience References",
            "Passport & Identity Documents",
            "IELTS Score Certificate"
        ];
    };

    // Filtered occupation listings
    const filteredOccupations = OCCUPATIONS.filter(o => 
        o.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const eligRes = checkEligibility();
    const crsScore = calcCrsScore();
    const ausPoints = calcAusPoints();
    const ukPoints = calcUkPoints();
    const feeRes = getFeeEstimate();
    const docList = getDocsChecklist();

    return (
        <div className="bg-white text-black min-h-screen py-16 px-4 md:px-8 font-opensans max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Migration Tools & Calculators
                </h1>
                <p className="text-slate-500 max-w-2xl mx-auto text-base font-semibold">
                    Plan your immigration journey with real-time points calculations, eligibility checkers, fee estimators, and occupation lookup tools.
                </p>
            </div>

            {/* Main Tabs Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-3 border-b border-gray-200 pb-6 mb-12 font-opensans">
                {[
                    { id: "eligibility", label: "1. Eligibility Checkers", icon: Globe, iconColor: "text-blue-500", bgClass: "bg-blue-50", desc: "Start Here" },
                    { id: "points", label: "2. Points Calculators", icon: Calculator, iconColor: "text-violet-500", bgClass: "bg-violet-50", desc: "CRS & SkillSelect" },
                    { id: "cost", label: "3. Cost & Fee Estimator", icon: DollarSign, iconColor: "text-emerald-500", bgClass: "bg-emerald-50", desc: "Government Fees" },
                    { id: "docs", label: "4. Document Checklists", icon: FileText, iconColor: "text-amber-500", bgClass: "bg-amber-50", desc: "Requirements" },
                    { id: "occupation", label: "5. Occupation Search", icon: Search, iconColor: "text-sky-500", bgClass: "bg-sky-50", desc: "NOC & ANZSCO" }
                ].map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTool(tab.id)}
                            className={`px-5 py-3 rounded-2xl text-left transition-all duration-200 flex items-center gap-3 border ${
                                activeTool === tab.id 
                                    ? "bg-black text-white border-black shadow-md font-bold" 
                                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-slate-700"
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                activeTool === tab.id ? "bg-white/10 text-white" : `${tab.bgClass} ${tab.iconColor}`
                            }`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold">{tab.label}</div>
                                <div className={`text-[10px] uppercase font-bold tracking-wider mt-0.5 ${activeTool === tab.id ? "text-slate-350" : "text-slate-450"}`}>
                                    {tab.desc}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Tab content areas */}
            <div className="border-2 border-black rounded-3xl p-6 md:p-10 shadow-lg shadow-gray-100 mb-16">
                
                {/* 1. ELIGIBILITY TAB */}
                {activeTool === "eligibility" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-7 space-y-6">
                            <h3 className="text-2xl font-extrabold mb-5 flex items-center gap-3">
                                <Globe className="w-7 h-7 text-blue-500 shrink-0" />
                                Express Entry & Skilled Migration Eligibility
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Target Country</label>
                                    <select value={eligCountry} onChange={e => setEligCountry(e.target.value)} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none">
                                        <option value="Canada">Canada</option>
                                        <option value="Australia">Australia</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="USA">United States</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Age</label>
                                    <input type="number" value={eligAge} onChange={e => setEligAge(Number(e.target.value))} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Highest Education</label>
                                    <select value={eligEdu} onChange={e => setEligEdu(e.target.value)} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none">
                                        <option value="PhD">PhD</option>
                                        <option value="Master's">Master's Degree</option>
                                        <option value="Bachelor's">Bachelor's Degree</option>
                                        <option value="Diploma">College Diploma</option>
                                        <option value="High School">High School</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">English Level (IELTS / PTE Equivalent)</label>
                                    <select value={eligLang} onChange={e => setEligLang(e.target.value)} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none">
                                        <option value="CLB 10">Superior (CLB 10+ / IELTS 8.5)</option>
                                        <option value="CLB 9">Advanced (CLB 9 / IELTS 8.0)</option>
                                        <option value="CLB 7">Moderate (CLB 7 / IELTS 6.0)</option>
                                        <option value="None">None / Basic</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Work Experience (Years)</label>
                                    <input type="number" value={eligExp} onChange={e => setEligExp(Number(e.target.value))} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none" />
                                </div>
                                <div className="flex items-center pt-8">
                                    <label className="flex items-center gap-2.5 cursor-pointer">
                                        <input type="checkbox" checked={eligJobOffer} onChange={e => setEligJobOffer(e.target.checked)} className="w-5 h-5 border-2 border-black rounded cursor-pointer accent-black" />
                                        <span className="text-xs font-bold text-black">Approved Job Offer from Sponsor?</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 bg-gray-50 border-2 border-black rounded-3xl p-6 flex flex-col justify-between">
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Live Result</h4>
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold mb-5 ${
                                    eligRes.eligible ? "bg-emerald-50 text-emerald-700 border border-emerald-250" : "bg-red-50 text-red-700 border border-red-200"
                                }`}>
                                    <CheckCircle className="w-4 h-4" /> {eligRes.eligible ? "Eligible" : "Under Review"}
                                </div>
                                <p className="text-navy font-bold text-lg mb-4">{eligCountry} Entry Pathway Check</p>
                                <p className="text-slate-650 text-xs font-semibold leading-relaxed mb-6">
                                    {eligRes.desc}
                                </p>
                            </div>
                            <div className="pt-5 border-t border-gray-200">
                                <a href={`/signup?type=seeker&country=${eligCountry}`} className="w-full py-3 bg-black hover:bg-slate-900 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all">
                                    Continue Free Assessment <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. POINTS CALCULATORS TAB */}
                {activeTool === "points" && (
                    <div>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-8">
                            <h3 className="text-2xl font-extrabold flex items-center gap-2">
                                📊 Skilled PR Visa Points Calculators
                            </h3>
                            <div className="flex gap-2">
                                {["Canada", "Australia", "UK"].map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setPointsCountry(c)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            pointsCountry === c 
                                                ? "bg-black text-white" 
                                                : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        {c === "Canada" ? "🇨🇦 Canada CRS" : c === "Australia" ? "🇦🇺 Australia Points" : "🇬🇧 UK skilled"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Canada CRS Calc */}
                        {pointsCountry === "Canada" && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                <div className="lg:col-span-7 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Age Bracket</label>
                                            <select value={crsAge} onChange={e => setCrsAge(e.target.value)} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none">
                                                <option value="Under 18">Under 18</option>
                                                <option value="18">18 years</option>
                                                <option value="19">19 years</option>
                                                <option value="20-29">20-29 years (Max points)</option>
                                                <option value="30">30 years</option>
                                                <option value="31-39">31-39 years</option>
                                                <option value="40-44">40-44 years</option>
                                                <option value="45+">45+ years</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Education Level</label>
                                            <select value={crsEdu} onChange={e => setCrsEdu(e.target.value)} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none">
                                                <option value="PhD">PhD (Doctorate)</option>
                                                <option value="Master's">Master's Degree</option>
                                                <option value="Two+ credentials">Two or more certificates</option>
                                                <option value="Bachelor's">Bachelor's Degree</option>
                                                <option value="Diploma">Diploma (3yr)</option>
                                                <option value="High School">High School Diploma</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Work Experience</label>
                                            <select value={crsExp} onChange={e => setCrsExp(e.target.value)} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none">
                                                <option value="None">None</option>
                                                <option value="1 year">1 year</option>
                                                <option value="2 years">2 years</option>
                                                <option value="3+ years">3+ years</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center pt-6">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={crsSpouse} onChange={e => setCrsSpouse(e.target.checked)} className="w-4.5 h-4.5 border-2 border-black rounded cursor-pointer accent-black" />
                                                <span className="text-xs font-bold text-black">Including accompanying spouse?</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* IELTS values */}
                                    <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Language Scores (IELTS Equivalent)</h4>
                                        <div className="grid grid-cols-4 gap-3">
                                            {["Listening", "Reading", "Writing", "Speaking"].map((item, index) => {
                                                const val = [crsIeltsL, crsIeltsR, crsIeltsW, crsIeltsS][index];
                                                const setter = [setCrsIeltsL, setCrsIeltsR, setCrsIeltsW, setCrsIeltsS][index];
                                                return (
                                                    <div key={item}>
                                                        <label className="text-[10px] text-gray-400 font-bold block mb-1">{item}</label>
                                                        <input type="number" step="0.5" value={val} onChange={e => setter(Number(e.target.value))} className="w-full h-10 border border-slate-300 rounded-lg px-2 text-xs font-bold text-center outline-none bg-white focus:border-black" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-5 bg-gray-50 border-2 border-black rounded-3xl p-6 flex flex-col justify-between text-center">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Estimated CRS Score</h4>
                                        <div className="w-32 h-32 rounded-full border-4 border-black flex flex-col items-center justify-center mx-auto mb-5 bg-white shadow-sm">
                                            <span className="text-3xl font-black">{crsScore}</span>
                                            <span className="text-[10px] text-gray-400 font-semibold mt-0.5">out of 1200</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-700 leading-normal px-2">
                                            Based on recent Express Entry draws, a score of 490+ has high chances of receiving an ITA.
                                        </p>
                                    </div>
                                    <a href="/find-experts?category=canada" className="mt-8 py-3 bg-black hover:bg-slate-900 text-white font-bold text-sm rounded-xl block transition-all shadow-sm">
                                        Match with Canada Experts
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Australia SkillSelect Calc */}
                        {pointsCountry === "Australia" && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                <div className="lg:col-span-7 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Age Group</label>
                                            <select value={ausAge} onChange={e => setAusAge(e.target.value)} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none">
                                                <option value="18-24">18-24 years (25 pts)</option>
                                                <option value="25-32">25-32 years (30 pts)</option>
                                                <option value="33-39">33-39 years (25 pts)</option>
                                                <option value="40-44">40-44 years (15 pts)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">English Competency</label>
                                            <select value={ausLang} onChange={e => setAusLang(e.target.value)} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none">
                                                <option value="Superior (IELTS 8+)">Superior (IELTS 8+ / PTE 79+) (20 pts)</option>
                                                <option value="Proficient (IELTS 7)">Proficient (IELTS 7 / PTE 65+) (10 pts)</option>
                                                <option value="Competent (IELTS 6)">Competent (IELTS 6 / PTE 50) (0 pts)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Skilled Employment (Overseas)</label>
                                            <select value={ausExp} onChange={e => setAusExp(e.target.value)} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none">
                                                <option value="None">Less than 3 years (0 pts)</option>
                                                <option value="3-4 years">3-4 years (5 pts)</option>
                                                <option value="5-7 years">5-7 years (10 pts)</option>
                                                <option value="8+ years">8+ years (15 pts)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Partner & Spousal status</label>
                                            <select value={ausPartner} onChange={e => setAusPartner(e.target.value)} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none">
                                                <option value="Single">Single / Australian citizen spouse (10 pts)</option>
                                                <option value="Skilled Spouse">Spouse with skills & English (10 pts)</option>
                                                <option value="English Only Spouse">Spouse with English competency only (5 pts)</option>
                                                <option value="Unskilled Spouse">Spouse without skills or English (0 pts)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-5 bg-gray-50 border-2 border-black rounded-3xl p-6 flex flex-col justify-between text-center">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Estimated Points</h4>
                                        <div className="w-32 h-32 rounded-full border-4 border-black flex flex-col items-center justify-center mx-auto mb-5 bg-white shadow-sm">
                                            <span className="text-3xl font-black">{ausPoints}</span>
                                            <span className="text-[10px] text-gray-400 font-semibold mt-0.5">points calculated</span>
                                        </div>
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                                            ausPoints >= 65 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                                        }`}>
                                            {ausPoints >= 65 ? "✓ Meets 65-Point minimum" : "✗ Needs 65 Points minimum"}
                                        </div>
                                    </div>
                                    <a href="/find-experts?category=australia" className="mt-4 py-3 bg-black hover:bg-slate-900 text-white font-bold text-sm rounded-xl block transition-all shadow-sm">
                                        Connect with Australia Experts
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* UK Skilled worker points */}
                        {pointsCountry === "UK" && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                <div className="lg:col-span-7 space-y-6">
                                    <p className="text-sm font-bold text-slate-650 leading-relaxed mb-4">
                                        The UK Skilled Worker visa operates on a 70-point modular system. Points are awarded based on sponsorship, job skill level, language capability, and minimum salary thresholds.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                            <span className="text-xs font-bold text-navy">Job offer from approved UK sponsor (Mandatory)</span>
                                            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+20 Points</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                            <span className="text-xs font-bold text-navy">Job at appropriate skill level (Mandatory)</span>
                                            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+20 Points</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                            <span className="text-xs font-bold text-navy">English level B1 standard (Mandatory)</span>
                                            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+10 Points</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                            <span className="text-xs font-bold text-navy">Meets salary threshold of £26,200 (or higher)</span>
                                            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+20 Points</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-5 bg-gray-50 border-2 border-black rounded-3xl p-6 flex flex-col justify-between text-center">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Total UK Points</h4>
                                        <div className="w-32 h-32 rounded-full border-4 border-black flex flex-col items-center justify-center mx-auto mb-5 bg-white shadow-sm">
                                            <span className="text-3xl font-black">{ukPoints}</span>
                                            <span className="text-[10px] text-gray-400 font-semibold mt-0.5">out of 70 req</span>
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
                                            ✓ Met 70-Point Requirement
                                        </div>
                                    </div>
                                    <a href="/find-experts?category=uk" className="mt-4 py-3 bg-black hover:bg-slate-900 text-white font-bold text-sm rounded-xl block transition-all shadow-sm">
                                        Find UK Work Sponsors
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* 3. COST & FEE ESTIMATOR TAB */}
                {activeTool === "cost" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-7 space-y-6">
                            <h3 className="text-2xl font-extrabold mb-5 flex items-center gap-3">
                                <DollarSign className="w-7 h-7 text-emerald-500 shrink-0" />
                                Total Visa Fees & Professional Cost Estimator
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Country Selection</label>
                                    <select value={costCountry} onChange={e => setCostCountry(e.target.value)} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none">
                                        <option value="Canada">Canada</option>
                                        <option value="Australia">Australia</option>
                                        <option value="UK">United Kingdom</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Visa Class</label>
                                    <select value={costVisaType} onChange={e => setCostVisaType(e.target.value)} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none">
                                        <option value="PR">Skilled PR (Permanent Resident)</option>
                                        <option value="Student">Student Visa</option>
                                        <option value="Work">Employer Sponsored Work Visa</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Accompanying Dependents (Spouse / Children)</label>
                                    <input type="number" min="0" max="6" value={costDependents} onChange={e => setCostDependents(Number(e.target.value))} className="w-full h-11 border-2 border-black rounded-xl px-3 font-semibold bg-white outline-none" />
                                </div>
                            </div>

                            {/* Cost itemization details */}
                            <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50 space-y-3">
                                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                                    <span>Main Applicant Government Fee:</span>
                                    <span className="text-black font-black">${feeRes.govFee}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                                    <span>Dependent Surcharges:</span>
                                    <span className="text-black font-black">${feeRes.dependentFees}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                                    <span>Document Translation & Legal Service Fee:</span>
                                    <span className="text-black font-black">${feeRes.serviceFee}</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 bg-gray-50 border-2 border-black rounded-3xl p-6 flex flex-col justify-between text-center">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Total Estimated Cost</h4>
                                <div className="w-32 h-32 rounded-full border-4 border-black flex flex-col items-center justify-center mx-auto mb-5 bg-white shadow-sm">
                                    <span className="text-3xl font-black">${feeRes.total}</span>
                                    <span className="text-[10px] text-gray-400 font-semibold mt-0.5">USD equivalent</span>
                                </div>
                                <p className="text-xs text-gray-450 leading-relaxed font-semibold">
                                    Estimate includes legal service packaging, document vetting, and mandatory state/federal government filing charges.
                                </p>
                            </div>
                            <a href="/support" className="mt-8 py-3 bg-black hover:bg-slate-900 text-white font-bold text-sm rounded-xl block transition-all shadow-sm">
                                Talk to Billing Advisor
                            </a>
                        </div>
                    </div>
                )}

                {/* 4. DOCUMENT CHECKLISTS TAB */}
                {activeTool === "docs" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-7 space-y-6">
                            <h3 className="text-2xl font-extrabold mb-4 flex items-center gap-3">
                                <FileText className="w-7 h-7 text-amber-500 shrink-0" />
                                Personalized Document Checklist Generator
                            </h3>
                            <p className="text-xs font-bold text-slate-500 mb-5 leading-normal">
                                Select your immigration category below to generate the mandatory document files required for submission.
                            </p>

                            <div className="flex gap-2.5 mb-6">
                                {["PR", "Student", "Work"].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setDocVisaType(t)}
                                        className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all border border-black ${
                                            docVisaType === t 
                                                ? "bg-black text-white" 
                                                : "bg-white text-black hover:bg-slate-50"
                                        }`}
                                    >
                                        {t === "PR" ? "Skilled Permanent Residency" : t === "Student" ? "Student Permit" : "Employer Work Visa"}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-2">
                                {docList.map((doc, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                                        <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center text-xs font-black shrink-0 bg-white">
                                            {index + 1}
                                        </div>
                                        <span className="text-xs font-bold text-slate-700">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-5 bg-gray-50 border-2 border-black rounded-3xl p-6 flex flex-col justify-between">
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Verification Check</h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <p className="text-xs font-bold text-slate-650 leading-relaxed">
                                            Documents must be verified by certified legal experts before filing to avoid immediate cancellation.
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                        <p className="text-xs font-bold text-slate-650 leading-relaxed">
                                            Police certificates (PCC) and medical validation records are valid for exactly 6 months.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <a href="/visa-documentation" className="mt-8 py-3 bg-black hover:bg-slate-900 text-white font-bold text-sm rounded-xl block text-center transition-all shadow-sm">
                                Submit Docs for Evaluation
                            </a>
                        </div>
                    </div>
                )}

                {/* 5. OCCUPATION SEARCH TAB */}
                {activeTool === "occupation" && (
                    <div className="space-y-6">
                        <div className="max-w-xl">
                            <h3 className="text-2xl font-extrabold mb-3 flex items-center gap-3">
                                <Search className="w-7 h-7 text-sky-500 shrink-0" />
                                Global Occupation Codes Lookup (NOC, ANZSCO, SOC)
                            </h3>
                            <p className="text-xs font-bold text-slate-500 mb-5 leading-normal">
                                Search for your occupation title below to verify its designated code and market demand under Canadian, Australian, and British visa regulations.
                            </p>

                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search e.g. Software Engineer, Registered Nurse..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 border-2 border-black rounded-xl font-bold bg-white text-sm outline-none focus:ring-2 focus:ring-slate-100"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto pt-3">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-black text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                                        <th className="py-3 px-2">Job Title</th>
                                        <th className="py-3 px-2">NOC (Canada)</th>
                                        <th className="py-3 px-2">ANZSCO (Australia)</th>
                                        <th className="py-3 px-2">SOC (UK)</th>
                                        <th className="py-3 px-2">PR Demand Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOccupations.length > 0 ? (
                                        filteredOccupations.map((o, idx) => (
                                            <tr key={idx} className="border-b border-gray-100 text-xs font-bold text-slate-700 hover:bg-slate-50/50 transition-all">
                                                <td className="py-4 px-2 font-black text-black">{o.title}</td>
                                                <td className="py-4 px-2">{o.noc}</td>
                                                <td className="py-4 px-2">{o.anzsco}</td>
                                                <td className="py-4 px-2">{o.soc}</td>
                                                <td className="py-4 px-2">
                                                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                                        o.demand === "High" 
                                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                                            : o.demand === "Medium" 
                                                                ? "bg-amber-50 text-amber-700 border border-amber-100" 
                                                                : "bg-red-50 text-red-700 border border-red-100"
                                                    }`}>
                                                        {o.demand} Demand
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-xs text-gray-400 font-semibold">
                                                No occupations found matching your query. Try a different search term.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
