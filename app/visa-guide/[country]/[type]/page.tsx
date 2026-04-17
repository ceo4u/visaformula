import { Globe, FileText, Clock, DollarSign, CheckCircle, ArrowRight, AlertTriangle, Users } from "lucide-react";
import Link from "next/link";

const visaData: Record<string, Record<string, any>> = {
    canada: {
        "express-entry": { title: "Canada Express Entry", flag: "🇨🇦", type: "Permanent Residence", processing: "6-8 months", cost: "CAD 1,365", requirements: ["Valid passport", "Language test (IELTS/CELPIP)", "Educational Credential Assessment (ECA)", "Police clearance certificate", "Medical examination", "Proof of funds (CAD 13,757+ for single)"], documents: ["Passport copies", "IELTS/CELPIP score report", "ECA certificate", "Employment reference letters", "Bank statements (6 months)", "Police clearance"], timeline: [{ step: "Create Express Entry profile", time: "1-2 weeks" }, { step: "Receive ITA (Invitation to Apply)", time: "Varies (CRS-dependent)" }, { step: "Submit full application", time: "60 days after ITA" }, { step: "Biometrics", time: "30 days after request" }, { step: "Decision", time: "6-8 months from submission" }] },
        "study-permit": { title: "Canada Study Permit", flag: "🇨🇦", type: "Student Visa", processing: "4-16 weeks", cost: "CAD 150", requirements: ["Acceptance letter from DLI", "Valid passport", "Proof of financial support", "Language proficiency", "Medical exam (if required)", "Police clearance"], documents: ["Letter of acceptance", "Passport", "GIC certificate (CAD 20,635)", "Tuition receipt", "IELTS score", "SOP (Statement of Purpose)"], timeline: [{ step: "Get acceptance letter", time: "4-8 weeks" }, { step: "Arrange GIC & tuition", time: "1-2 weeks" }, { step: "Apply online via IRCC", time: "1 day" }, { step: "Biometrics", time: "1-2 weeks" }, { step: "Decision", time: "4-16 weeks" }] },
    },
    usa: {
        "h1b": { title: "USA H-1B Work Visa", flag: "🇺🇸", type: "Work Visa", processing: "3-6 months", cost: "USD 1,710+", requirements: ["Bachelor's degree or equivalent", "Job offer from US employer", "Employer files petition (I-129)", "Specialty occupation proof", "Valid passport", "Labor Condition Application (LCA)"], documents: ["Passport", "I-797 approval notice", "DS-160 confirmation", "Educational transcripts", "Resume/CV", "Employment offer letter"], timeline: [{ step: "Employer files LCA", time: "7 days" }, { step: "H-1B registration (April lottery)", time: "March" }, { step: "If selected, file petition", time: "90 days" }, { step: "USCIS processing", time: "3-6 months" }, { step: "Visa stamp at consulate", time: "1-4 weeks" }] },
        "f1": { title: "USA F-1 Student Visa", flag: "🇺🇸", type: "Student Visa", processing: "3-5 weeks", cost: "USD 185 + SEVIS $350", requirements: ["I-20 from SEVP-certified school", "Valid passport", "Proof of financial support", "Ties to home country", "English proficiency", "Academic records"], documents: ["I-20 form", "DS-160 confirmation", "Passport", "Financial documents", "Academic transcripts", "TOEFL/IELTS scores"], timeline: [{ step: "Get I-20 from university", time: "2-4 weeks" }, { step: "Pay SEVIS fee", time: "1 day" }, { step: "Complete DS-160", time: "1 day" }, { step: "Schedule visa interview", time: "1-3 weeks" }, { step: "Attend interview", time: "1 day" }] },
    },
};

export default function VisaGuidePage({ params }: { params: { country: string; type: string } }) {
    const countryData = visaData[params.country];
    const visa = countryData?.[params.type];

    if (!visa) {
        return (
            <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="font-sora text-3xl font-bold text-navy mb-4">Visa Guide Not Found</h1>
                    <p className="text-gray-500 mb-6">We don&apos;t have a guide for this visa type yet.</p>
                    <Link href="/"><button className="bg-[#0ea5e9] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0284c7] transition-all">Go Home</button></Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f0f4f8] min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#0ea5e9] via-[#0284c7] to-[#0369a1] text-white py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{visa.flag}</span>
                        <div>
                            <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold">{visa.type}</span>
                            <h1 className="font-sora text-3xl md:text-4xl font-extrabold mt-2">{visa.title}</h1>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6 mt-6">
                        <span className="flex items-center gap-2 text-sm"><Clock className="w-4 h-4" /> Processing: {visa.processing}</span>
                        <span className="flex items-center gap-2 text-sm"><DollarSign className="w-4 h-4" /> Cost: {visa.cost}</span>
                    </div>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                {/* Requirements */}
                <section className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
                    <h2 className="font-sora text-xl font-bold text-navy mb-5 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500" /> Requirements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {visa.requirements.map((r: string, i: number) => (
                            <div key={i} className="flex items-start gap-2 p-3 bg-sky-50/50 rounded-xl border border-sky-100">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span className="text-sm text-gray-700">{r}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Documents */}
                <section className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
                    <h2 className="font-sora text-xl font-bold text-navy mb-5 flex items-center gap-2"><FileText className="w-5 h-5 text-[#0ea5e9]" /> Required Documents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {visa.documents.map((d: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 p-3 bg-sky-50/50 rounded-xl border border-sky-100">
                                <FileText className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                                <span className="text-sm text-gray-700">{d}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Timeline */}
                <section className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm">
                    <h2 className="font-sora text-xl font-bold text-navy mb-5 flex items-center gap-2"><Clock className="w-5 h-5 text-amber-500" /> Application Timeline</h2>
                    <div className="space-y-4">
                        {visa.timeline.map((t: any, i: number) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                                <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                                    <h4 className="font-semibold text-navy text-sm">{t.step}</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">{t.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center pt-4">
                    <Link href={`/find-lawyer?country=${params.country}&type=${params.type}`}>
                        <button className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white px-8 py-4 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-sky-200 transition-all inline-flex items-center gap-2">
                            <Users className="w-5 h-5" /> Find {visa.title} Experts <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
