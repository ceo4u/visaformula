import { Star } from "lucide-react";

export function UniversityCard({ uni }: { uni: any }) {
    return (
        <a href="/university/1" className="block h-full cursor-pointer">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-200/80 transition-all duration-300 flex flex-col h-full group">
                <div className="h-36 overflow-hidden relative">
                    <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg font-bold text-sm shadow-sm">
                        QS #{uni.ranking}
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2.5">
                    <div>
                        <h3 className="font-bold text-[#1a1a2e] text-lg leading-tight group-hover:text-[#6366f1] transition-colors">{uni.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{uni.location}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" strokeWidth={0} />
                        <span className="font-bold">{uni.rating}</span>
                        <span className="text-gray-400">({uni.reviews})</span>
                    </div>
                    <div className="text-xs text-gray-600">
                        <span className="font-semibold text-[#1a1a2e]">Programs:</span> {uni.programs}
                    </div>
                    <div className="flex justify-between items-end mt-auto pt-3 border-t border-gray-100">
                        <div>
                            <div className="font-extrabold text-lg text-[#1a1a2e]">{uni.tuition}</div>
                            <div className="text-[10px] text-emerald-600 bg-emerald-50 inline-block px-2 py-0.5 rounded-full mt-1 font-semibold">Scholarships available</div>
                        </div>
                        <button className="bg-white border-2 border-black text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-black hover:text-white transition-all">
                            View Programs
                        </button>
                    </div>
                </div>
            </div>
        </a>
    );
}

