import { Calendar, Star } from "lucide-react";

export function TourCard({ tour }: { tour: any }) {
    return (
        <div className="bg-white border border-gray-200 rounded-[8px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow flex flex-col">
            <div className="h-40 w-full relative">
                <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-0.5 rounded text-xs font-bold">
                    {tour.duration}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-[#222222] text-lg leading-tight mb-1">{tour.name}</h3>
                <div className="flex items-center gap-1 text-sm mb-2">
                    <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    <span className="font-medium">{tour.rating}</span>
                    <span className="text-gray-500">({tour.reviews})</span>
                </div>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{tour.covered}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                    {tour.badges?.map((b: string) => (
                        <span key={b} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{b}</span>
                    ))}
                </div>
                <div className="mt-auto flex justify-between items-end">
                    <div>
                        <div className="text-xs text-gray-500 mb-0.5">From</div>
                        <div className="font-bold text-yellow-500 text-lg leading-none">{tour.price}</div>
                    </div>
                    <button className="bg-white border border-[#0ea5e9] text-yellow-500 px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}
