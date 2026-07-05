import { Star } from "lucide-react";

const getCodeByName = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("bali")) return "id";
    if (n.includes("dubai")) return "ae";
    if (n.includes("europe")) return "fr";
    if (n.includes("vietnam")) return "vn";
    if (n.includes("malaysia")) return "my";
    if (n.includes("thailand")) return "th";
    if (n.includes("sri lanka")) return "lk";
    if (n.includes("singapore")) return "sg";
    if (n.includes("greece")) return "gr";
    if (n.includes("maldives")) return "mv";
    return "us";
};

export function TourCard({ tour }: { tour: any }) {
    return (
        <a href="/tours" className="block w-full cursor-pointer">
            <div 
                className="group relative h-[440px] w-full rounded-[32px] overflow-hidden text-left hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent"
                style={{ background: '#0C1A2E' }}
            >
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={tour.image} 
                        alt={tour.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                </div>

                {/* Top badge if present */}
                {tour.badges && tour.badges[0] && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full tracking-widest shadow-md uppercase">
                        {tour.badges[0]}
                    </div>
                )}

                {/* Content Container */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                    
                    {/* Flag Badge Container - Circular center-aligned above text */}
                    <div className="flex justify-center mb-4">
                        <div className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center overflow-hidden shadow-xl transform transition-transform duration-300 group-hover:scale-110">
                            <img 
                                src={`https://flagcdn.com/w80/${getCodeByName(tour.name)}.png`} 
                                alt="" 
                                className="w-full h-full object-cover scale-[1.3] transform" 
                            />
                        </div>
                    </div>

                    {/* Tour Title - Serif, uppercase, letter-spaced */}
                    <h3 className="font-serif text-xl font-normal text-white text-center tracking-wider uppercase mb-5 leading-snug drop-shadow-md">
                        {tour.name}
                    </h3>

                    {/* Divider Line */}
                    <div className="w-full h-[0.5px] bg-white/20 mb-5" />

                    {/* Info Table Grid */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">DURATION</span>
                            <span className="text-[11px] text-white font-extrabold tracking-wide uppercase">{tour.duration}</span>
                        </div>
                        <div>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">RATING</span>
                            <span className="text-[11px] text-white font-extrabold tracking-wide uppercase flex items-center justify-center gap-0.5">{tour.rating} ★</span>
                        </div>
                        <div>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-1">PRICE</span>
                            <span className="text-[11px] text-white font-extrabold tracking-wide uppercase">{tour.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}


