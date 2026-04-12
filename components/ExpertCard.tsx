import { Star } from "lucide-react";

export function ExpertCard({ expert }: { expert: any }) {
    return (
        <div className="bg-white border border-gray-200 rounded-[8px] p-4 flex flex-col gap-4 shadow-[0_1px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow h-full">
            <div className="flex gap-4">
                <div className="w-16 h-16 shrink-0">
                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-[#222222] leading-tight truncate">{expert.name}</h3>
                        {expert.badges?.includes("Open now") && (
                            <span className="text-[10px] uppercase font-bold tracking-wider text-green-700 bg-green-100 px-2 py-1 rounded shrink-0 ml-2">Open now</span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                        <div className="flex text-yellow-500">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5" fill={i <= expert.rating ? "currentColor" : "none"} />)}
                        </div>
                        <span className="text-sm font-medium ml-1">{expert.rating}</span>
                        <span className="text-xs text-gray-500">({expert.reviews} reviews)</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 truncate">{expert.role}</p>
                </div>
            </div>

            <div className="text-sm text-gray-600 -mt-1">
                <span className="inline-block">{expert.location}</span>
            </div>

            <div className="flex flex-wrap gap-2">
                {expert.tags?.map((tag: string) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-800 font-medium px-2 py-1 rounded-full border border-gray-200">{tag}</span>
                ))}
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="text-left">
                    <div className="font-bold text-lg">{expert.price}</div>
                </div>
                <button className="bg-[#0ea5e9] text-white px-4 py-2 rounded font-medium hover:bg-[#0284c7] transition-colors text-sm">
                    Request to Book
                </button>
            </div>
        </div>
    );
}
