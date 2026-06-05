import { Briefcase, MapPin, Clock } from "lucide-react";

export function JobCard({ job }: { job: any }) {
    return (
        <a href="/jobs" className="block h-full cursor-pointer">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300 h-full group">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl shrink-0 flex items-center justify-center border border-red-100 group-hover:bg-red-500 group-hover:border-red-300 transition-colors">
                        <Briefcase className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-[#1a1a2e] text-base line-clamp-1 group-hover:text-red-500 transition-colors">{job.title}</h3>
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
                    <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-full inline-flex items-center gap-1 border border-red-100">
                        ✅ Visa sponsorship
                    </span>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {job.posted}
                    </span>
                    <button className="bg-red-500 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-600 transition-all shadow-sm hover:shadow-md">
                        Apply Now
                    </button>
                </div>
            </div>
        </a>
    );
}

