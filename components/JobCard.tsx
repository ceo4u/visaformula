import { Briefcase } from "lucide-react";

export function JobCard({ job }: { job: any }) {
    return (
        <div className="bg-white border border-gray-200 rounded-[8px] p-4 flex flex-col shadow-[0_1px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow">
            <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-md shrink-0 flex items-center justify-center border border-gray-200">
                    <Briefcase className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                    <h3 className="font-bold text-[#222222] text-md line-clamp-1">{job.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{job.company}</p>
                </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
                <div className="font-bold text-black">{job.salary}</div>
                <div className="mt-1">{job.location}</div>
            </div>
            <div className="mt-3">
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded inline-flex items-center gap-1">
                    Visa sponsorship ✅
                </span>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">{job.posted}</span>
                <button className="bg-[#0ea5e9] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#0284c7] transition-colors">
                    Apply Now
                </button>
            </div>
        </div>
    );
}
