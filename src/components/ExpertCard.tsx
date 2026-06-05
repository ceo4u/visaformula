import { Star, MapPin } from "lucide-react";

export function ExpertCard({ expert }: { expert: any }) {
    return (
        <a href="/expert/1" className="block h-full cursor-pointer">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300 h-full group">
                <div className="flex gap-4">
                    <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden ring-2 ring-gray-100 group-hover:ring-red-200 transition-all">
                        <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                            <h3 className="text-base font-bold text-[#1a1a2e] leading-tight truncate group-hover:text-red-500 transition-colors">{expert.name}</h3>
                            {expert.badges?.includes("Open now") && (
                                <span className="text-[9px] uppercase font-bold tracking-wider text-green-700 bg-green-100 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Open
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-1 mt-1.5">
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star 
                                        key={i} 
                                        className="w-3.5 h-3.5" 
                                        fill={i <= expert.rating ? "currentColor" : "none"} 
                                        strokeWidth={i <= expert.rating ? 0 : 1.5} 
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-bold ml-1">{expert.rating}</span>
                            <span className="text-xs text-gray-400">({expert.reviews})</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{expert.role}</p>
                    </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{expert.location}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {expert.tags?.map((tag: string) => (
                        <span key={tag} className="text-[11px] bg-red-50 text-red-700 font-semibold px-2.5 py-1 rounded-full border border-red-100">{tag}</span>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="text-left">
                        <div className="font-extrabold text-lg text-[#1a1a2e]">{expert.price}</div>
                    </div>
                    <button className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-600 transition-all text-sm shadow-sm hover:shadow-md">
                        Request to Book
                    </button>
                </div>
            </div>
        </a>
    );
}

