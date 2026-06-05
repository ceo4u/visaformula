import { Star } from "lucide-react";

export function TourCard({ tour }: { tour: any }) {
    return (
        <a href="/tour/1" className="block h-full cursor-pointer">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col h-full group">
                <div className="h-44 w-full relative overflow-hidden">
                    <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold">
                        {tour.duration}
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2">
                    <h3 className="font-bold text-[#1a1a2e] text-lg leading-tight group-hover:text-[#ef4444] transition-colors">{tour.name}</h3>
                    <div className="flex items-center gap-1.5 text-sm">
                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" strokeWidth={0} />
                        <span className="font-bold">{tour.rating}</span>
                        <span className="text-gray-400">({tour.reviews})</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{tour.covered}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                        {tour.badges?.map((b: string) => (
                            <span key={b} className="text-[10px] bg-red-50 text-[#ef4444] px-2 py-0.5 rounded-full border border-red-100 font-semibold">{b}</span>
                        ))}
                    </div>
                    <div className="mt-auto flex justify-between items-end pt-3 border-t border-gray-100">
                        <div>
                            <div className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider mb-0.5">From</div>
                            <div className="font-extrabold text-slate-900 text-xl leading-none">{tour.price}</div>
                        </div>
                        <button className="bg-white border-2 border-slate-900 text-slate-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-900 hover:text-white transition-all">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </a>
    );
}

