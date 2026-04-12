import { Star } from "lucide-react";

export function UniversityCard({ uni }: { uni: any }) {
    return (
        <div className="bg-white border border-gray-200 rounded-[8px] p-4 flex flex-col gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow">
            <div className="h-32 -mx-4 -mt-4 mb-2 overflow-hidden rounded-t-[8px] relative">
                <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded font-bold text-sm shadow">
                    QS #{uni.ranking}
                </div>
            </div>
            <div>
                <h3 className="font-bold text-[#222222] text-lg leading-tight">{uni.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{uni.location}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                <span className="font-medium">{uni.rating}</span>
                <span className="text-gray-500">({uni.reviews})</span>
            </div>
            <div className="text-xs text-gray-600">
                <span className="font-medium text-black">Programs:</span> {uni.programs}
            </div>
            <div className="flex justify-between items-end mt-auto pt-2">
                <div>
                    <div className="font-bold">{uni.tuition}</div>
                    <div className="text-xs text-green-700 bg-green-50 inline-block px-1 rounded mt-1">Scholarships available</div>
                </div>
                <button className="bg-white border border-[#0ea5e9] text-yellow-500 px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                    View Programs
                </button>
            </div>
        </div>
    );
}
