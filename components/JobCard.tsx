import { Briefcase, MapPin, Clock } from "lucide-react";

export function JobCard({ job }: { job: any }) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 h-full group">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-50 rounded-xl shrink-0 flex items-center justify-center border border-sky-100 group-hover:bg-[#0ea5e9] group-hover:border-sky-300 transition-colors">
                    <Briefcase className="w-5 h-5 text-[#0ea5e9] group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                    <h3 className="font-bold text-[#1a1a2e] text-base line-clamp-1 group-hover:text-[#0ea5e9] transition-colors">{job.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{job.company}</p>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="font-extrabold text-lg text-[#1a1a2e]">{job.salary}</div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{job.location}</span>
                </div>
            </div>
            <div className="mt-3">
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full inline-flex items-center gap-1 border border-emerald-100">
                    ✅ Visa sponsorship
                </span>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {job.posted}
                </span>
                <button className="bg-[#0ea5e9] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#0284c7] transition-all shadow-sm hover:shadow-md">
                    Apply Now
                </button>
            </div>
        </div>
    );
}
