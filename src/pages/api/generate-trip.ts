// src/pages/api/generate-trip.ts
import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

export const prerender = false;

// Resolve Gemini API key safely
const getGeminiApiKey = (): string => {
  let key = (import.meta?.env?.GEMINI_API_KEY as string | undefined)?.trim();
  if (key) return key;

  key = (process.env.GEMINI_API_KEY as string | undefined)?.trim();
  if (key) return key;

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^GEMINI_API_KEY\s*=\s*(.*)$/m);
      if (match) {
        key = match[1].trim().replace(/^["']|["']$/g, '');
        if (key) return key;
      }
    }
  } catch (err) {}

  return '';
};

// // High-fidelity fallback destination intelligence database
const destinationKnowledge: Record<string, { image: string; fallbackDays: Array<{ title: string; morning: string; afternoon: string; evening: string }> }> = {
  newyork: {
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Manhattan Skyline & Times Square Arrival', morning: 'Arrive at JFK/Newark & check-in to Midtown hotel', afternoon: 'Central Park stroll, Bethesda Terrace & 5th Avenue walk', evening: 'Broadway theater show & Times Square neon lights' },
      { title: 'Statue of Liberty & Financial District', morning: 'Ferry to Statue of Liberty & Ellis Island Immigration Museum', afternoon: 'Wall Street, 9/11 Memorial & Oculus World Trade Center', evening: 'Sunset cocktail at One World Observatory' },
      { title: 'Brooklyn Bridge & DUMBO Arts Scene', morning: 'Walk across iconic Brooklyn Bridge with skyline panorama', afternoon: 'DUMBO cobblestone streets & Brooklyn Bridge Park', evening: 'Rooftop dining with Empire State Building sunset view' },
      { title: 'The Met Museum & High Line Walk', morning: 'Masterpieces at The Metropolitan Museum of Art', afternoon: 'Walk the elevated High Line Park & Chelsea Market food hall', evening: 'Hudson Yards & The Edge glass skydeck observation' },
      { title: 'SoHo Boutiques, Greenwich Village & Departure', morning: 'Art galleries & shopping in trendy SoHo & Greenwich Village', afternoon: 'Grand Central Terminal & Summit One Vanderbilt', evening: 'Airport transfer & safe flight home' }
    ]
  },
  london: {
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Royal Heritage & Big Ben Welcome', morning: 'Arrival at Heathrow & Westminster hotel check-in', afternoon: 'Big Ben, Westminster Abbey & Buckingham Palace walk', evening: 'Sunset flight on the iconic London Eye' },
      { title: 'Tower Bridge & Historic London Tower', morning: 'Crown Jewels at Tower of London & Tower Bridge walk', afternoon: 'Borough Market international street food tasting', evening: 'Covent Garden street performers & West End musical' },
      { title: 'British Museum & Soho Nightlife', morning: 'Rosetta Stone & world artifacts at British Museum', afternoon: 'Oxford Street & Regent Street shopping', evening: 'Soho eclectic cafes, pubs & jazz clubs' },
      { title: 'Greenwich Meridian & Thames River Cruise', morning: 'Thames river cruise to Royal Observatory Greenwich', afternoon: 'Cutty Sark ship & Greenwich vintage market', evening: 'South Bank river promenade dining' },
      { title: 'Hyde Park, Kensington & Departure', morning: 'Kensington Palace & Serpentine boating in Hyde Park', afternoon: 'Harrods luxury shopping & afternoon tea', evening: 'Airport transfer & departure' }
    ]
  },
  tokyo: {
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Shinjuku Neon & Shibuya Crossing', morning: 'Arrive at Haneda/Narita & hotel check-in', afternoon: 'Shibuya Crossing & Hachiko statue photography', evening: 'Shinjuku Omoide Yokocho street food & Tokyo skyline' },
      { title: 'Historic Asakusa & Akihabara Tech', morning: 'Sensō-ji Ancient Buddhist Temple in Asakusa', afternoon: 'Sumida River water bus & Tokyo Skytree panorama', evening: 'Akihabara electronic district & anime culture' },
      { title: 'Meiji Shrine & Harajuku Trends', morning: 'Peaceful Meiji Jingu Forest Shrine walk', afternoon: 'Takeshita Street colorful fashion & crepes', evening: 'Roppongi Hills modern art museum & dinner' },
      { title: 'Tsukiji Outer Market & Ginza Luxury', morning: 'Fresh sushi breakfast at Tsukiji Outer Market', afternoon: 'Ginza world-class shopping & Kabuki theater', evening: 'Odaiba futuristic bay & Rainbow Bridge lights' },
      { title: 'Imperial Palace Gardens & Departure', morning: 'Imperial Palace East Gardens stroll', afternoon: 'Tokyo Station ramen street & souvenir shopping', evening: 'Airport express transfer & departure' }
    ]
  },
  dubai: {
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Downtown Glamour & Burj Khalifa', morning: 'Arrival into DXB & luxury hotel check-in', afternoon: 'Dubai Mall, Aquarium & Underwater Zoo', evening: 'At The Top Burj Khalifa (148th Fl) & Dubai Fountain show' },
      { title: 'Desert Safari & Bedouin Camp', morning: 'Relaxed morning at JBR Beach or Marina Walk', afternoon: '4x4 Desert Dune Bashing & Sandboarding', evening: 'Belly dance show, Henna & BBQ dinner under stars' },
      { title: 'Old Dubai Heritage & Gold Souk', morning: 'Abra traditional wooden boat ride across Dubai Creek', afternoon: 'Gold & Spice Souks & Al Fahidi historic district', evening: 'Dinner cruise along Dubai Marina canal' },
      { title: 'Palm Jumeirah & Atlantis Thrills', morning: 'The View at The Palm observation deck', afternoon: 'Aquaventure Waterpark or Lost Chambers Aquarium', evening: 'Bluewaters Island & Ain Dubai views' },
      { title: 'Miracle Garden & Departure', morning: 'Dubai Miracle Garden 150M floral wonderland', afternoon: 'Last-minute duty-free shopping', evening: 'Airport transfer & flight departure' }
    ]
  },
  paris: {
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Eiffel Tower & Seine River Cruise', morning: 'Arrival in Paris & hotel check-in', afternoon: 'Eiffel Tower summit views & Champ de Mars stroll', evening: 'Illuminated Seine River dinner cruise' },
      { title: 'Louvre & Historic Latin Quarter', morning: 'Mona Lisa & masterworks at The Louvre', afternoon: 'Tuileries Garden, Palais Garnier & macaroon tasting', evening: 'Latin Quarter bohemian bistros & jazz' },
      { title: 'Montmartre & Sacré-Cœur Panorama', morning: 'Sacré-Cœur Basilica & artist square at Place du Tertre', afternoon: 'Champs-Élysées & Arc de Triomphe climb', evening: 'Moulin Rouge district evening walk' },
      { title: 'Palace of Versailles Grand Day', morning: 'RER train to Versailles & Hall of Mirrors', afternoon: 'Grand Trianon & musical fountain gardens', evening: 'Return to Paris for French wine & cheese tasting' },
      { title: 'Le Marais Boutiques & Departure', morning: 'Shopping in trendy Le Marais district', afternoon: 'Hotel check-out & transfer to CDG Airport', evening: 'Departure flight' }
    ]
  },
  singapore: {
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Marina Bay & Supertree Light Show', morning: 'Arrival at Changi Airport & Jewel Waterfall check-in', afternoon: 'Gardens by the Bay Flower Dome & Cloud Forest', evening: 'Spectra light & water show at Marina Bay Sands' },
      { title: 'Universal Studios & Sentosa Island', morning: 'Cable Car ride to Sentosa Island', afternoon: 'Universal Studios Singapore movie thrill rides', evening: 'Wings of Time spectacular firework show' },
      { title: 'Night Safari & Cultural Neighborhoods', morning: 'Little India & Chinatown heritage temples', afternoon: 'Orchard Road shopping & Marina Bay SkyPark', evening: 'World-famous Singapore Night Safari tram' },
      { title: 'Singapore Zoo & Clarke Quay Vibes', morning: 'Mandai Wildlife Reserve & river wonders', afternoon: 'Merlion Park photography & boutique cafes', evening: 'Clarke Quay riverfront bars & chili crab dinner' },
      { title: 'Jewel Changi Canopy & Departure', morning: 'Changi Canopy Park & shopping', afternoon: 'Flight departure with lifelong memories', evening: 'Safe travels' }
    ]
  },
  thailand: {
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Bangkok Grand Palace & River Boats', morning: 'Arrive at BKK & riverfront hotel check-in', afternoon: 'Grand Palace & Wat Pho Giant Reclining Buddha', evening: 'Chao Phraya Princess luxury dinner cruise' },
      { title: 'Floating Markets & Street Food Walk', morning: 'Damnoen Saduak Longtail boat floating market', afternoon: 'Chatuchak Weekend Market / Siam Paragon', evening: 'Chinatown (Yaowarat) Michelin street food tour' },
      { title: 'Coral Island Speedboat Trip', morning: 'Speedboat to Coral Island (Koh Larn)', afternoon: 'Parasailing, Sea Walker & seafood beach lunch', evening: 'Sunset viewpoints and night market' },
      { title: 'Phi Phi Islands Speedboat Safari', morning: 'Maya Bay & Pi Leh Lagoon emerald swimming', afternoon: 'Monkey Beach & Viking Cave snorkeling', evening: 'Beachside fire show & live reggae music' },
      { title: 'Thai Massage & Souvenirs Departure', morning: 'Authentic 2-hour Thai Aromatherapy Massage', afternoon: 'Duty-free shopping & airport transfer', evening: 'Return flight' }
    ]
  },
  bali: {
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Seminyak Coastal Arrival & Sunsets', morning: 'Arrive at Ngurah Rai Airport & villa check-in', afternoon: 'Seminyak boutique shops & cafe hopping', evening: 'Sunset cocktails at Potato Head Beach Club' },
      { title: 'Ubud Jungle, Waterfalls & Swings', morning: 'Tegalalang Rice Terraces & jungle swing', afternoon: 'Tegenungan Waterfall swim & Monkey Forest', evening: 'Ubud organic farm-to-table dinner' },
      { title: 'Nusa Penida Island Tour', morning: 'Speedboat to Nusa Penida & Kelingking T-Rex cliff', afternoon: 'Broken Beach & Angel Billabong lagoon swim', evening: 'Return to mainland for seafood on Jimbaran Beach' },
      { title: 'Uluwatu Cliffs & Kecak Fire Dance', morning: 'Padang Padang beach surf & sunbathing', afternoon: 'Uluwatu Clifftop Temple visit', evening: 'Mesmerizing Kecak Fire Dance at sunset' },
      { title: 'Balinese Spa & Departure', morning: 'Relaxing 2-hour Balinese massage & coffee tasting', afternoon: 'Souvenir shopping at Krisna Oleh Oleh', evening: 'Airport transfer & departure' }
    ]
  },
  switzerland: {
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Zurich Lake & Old Town Welcome', morning: 'Arrive in Zurich & scenic train check-in', afternoon: 'Bahnhofstrasse luxury shopping & Lake Zurich cruise', evening: 'Traditional Swiss cheese fondue dinner' },
      { title: 'Interlaken & Lauterbrunnen Waterfalls', morning: 'Panoramic GoldenPass train to Interlaken', afternoon: 'Lauterbrunnen valley of 72 waterfalls walk', evening: 'Cozy alpine chalet evening with Swiss hot chocolate' },
      { title: 'Jungfraujoch Top of Europe (3,454m)', morning: 'Eiger Express cogwheel train to Jungfraujoch', afternoon: 'Ice Palace, Sphinx Observatory & snow walk', evening: 'Return to Grindelwald village for dinner' },
      { title: 'Lucerne Chapel Bridge & Mount Titlis', morning: 'Lake Lucerne steamer boat & Lion Monument', afternoon: 'Rotair revolving cable car to Mount Titlis glacier', evening: 'Cliff walk suspension bridge & Lucerne old town' },
      { title: 'Swiss Chocolatier Tour & Departure', morning: 'Lindt Home of Chocolate museum visit', afternoon: 'Check-out & Zurich Airport scenic departure', evening: 'Flight home' }
    ]
  },
  goa: {
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Arrival & North Goa Vibes', morning: 'Arrive in Goa & check-in to hotel', afternoon: 'Baga Beach & Watersports', evening: 'Sunset at Anjuna Beach & Dinner' },
      { title: 'South Goa Escape & Waterfalls', morning: 'Dudhsagar Waterfall excursion', afternoon: 'Spice Plantation tour & authentic Goan buffet', evening: 'Palolem Beach chilled beachside acoustic night' },
      { title: 'Old Goa & Latin Quarter Heritage Walk', morning: 'Basilica of Bom Jesus & Se Cathedral', afternoon: 'Fontainhas colorful Portuguese streets & bakery stops', evening: 'Mandovi River sunset cruise & live music' },
      { title: 'Grand Island Scuba & Dolphin Adventure', morning: 'Boat ride to Grand Island, dolphin sighting & snorkeling', afternoon: 'Island BBQ lunch & swimming in calm waters', evening: 'Vagator Hilltop sunset view & dinner' },
      { title: 'Leisure Morning, Souvenirs & Departure', morning: 'Chilled breakfast at local cafe & cashews shopping', afternoon: 'Hotel check-out and transfer to airport/station', evening: 'Safe flight/journey home' }
    ]
  },
  manali: {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Arrival & Mall Road Strolls', morning: 'Scenic arrival into Kullu Valley & check-in', afternoon: 'Hadimba Devi Temple & Van Vihar nature walk', evening: 'Cafe hopping & shopping at Mall Road' },
      { title: 'Solang Valley & High Altitude Thrills', morning: 'Paragliding & Zorbing in Solang Valley', afternoon: 'Drive through Atal Tunnel towards Sissu waterfall', evening: 'Cozy bonfire & Himachali trout dinner' },
      { title: 'Old Manali Culture & Waterfalls', morning: 'Jogini Waterfall trek from Vashisht village', afternoon: 'Old Manali wooden cafes & live indie acoustic vibes', evening: 'Hot sulfur spring dip at Vashisht' },
      { title: 'Naggar Castle & Art Exploration', morning: 'Trip to historical Naggar Castle & Nicholas Roerich Gallery', afternoon: 'Traditional Himachali Dham lunch & river crossing', evening: 'Relaxed evening overlooking snow-capped peaks' },
      { title: 'Local Craft Shopping & Departure', morning: 'Pashmina shawls & apple cider tasting', afternoon: 'Check-out & Volvo bus/flight departure', evening: 'Journey back with mountain memories' }
    ]
  },
  kashmir: {
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Srinagar Shikara & Houseboat Arrival', morning: 'Arrive in Srinagar & check-in to luxury Houseboat', afternoon: 'Mughal Gardens (Shalimar & Nishat Bagh) stroll', evening: 'Romantic Shikara ride during sunset on Dal Lake' },
      { title: 'Gulmarg Meadow of Flowers & Gondola', morning: 'Scenic drive to Gulmarg pine valley', afternoon: 'Phase 1 & Phase 2 Gondola ride to snow peaks', evening: 'Hot Kahwa tea & Wazwan feast in Srinagar' },
      { title: 'Pahalgam Valley of Shepherds', morning: 'Drive past saffron fields of Pampore to Pahalgam', afternoon: 'Betaab Valley & Aru Valley horse riding', evening: 'Riverside relaxation along Lidder River' },
      { title: 'Sonamarg Golden Glacier Day Trip', morning: 'Excursion to Thajiwas Glacier in Sonamarg', afternoon: 'Sledge riding & photography in alpine landscapes', evening: 'Return to Srinagar floating vegetable market visit' },
      { title: 'Pashmina Souvenirs & Departure', morning: 'Lal Chowk dry fruits & Pashmina shawl shopping', afternoon: 'Check-out & Srinagar airport transfer', evening: 'Departure' }
    ]
  },
  udaipur: {
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Lakeside Welcome & City Palace', morning: 'Arrival and check-in to heritage Haveli', afternoon: 'Grand City Palace museum tour & crystal gallery', evening: 'Lake Pichola sunset boat cruise to Jag Mandir' },
      { title: 'Monsoon Palace & Royal Gardens', morning: 'Saheliyon-ki-Bari fountains & vintage car museum', afternoon: 'Drive up to Sajjangarh Monsoon Palace panorama', evening: 'Dharohar folk dance show at Bagore Ki Haveli' },
      { title: 'Fateh Sagar & Bohemian Art Cafes', morning: 'Jagdish Temple & walk through old bazaars', afternoon: 'Fateh Sagar lake boating & Nehru Park stroll', evening: 'Rooftop candlelit dinner overlooking City Palace' },
      { title: 'Kumbhalgarh Fortress Day Excursion', morning: 'Scenic drive to Great Wall of India at Kumbhalgarh', afternoon: 'Ranakpur marble Jain temple exploration', evening: 'Return to Udaipur for royal Rajasthani Thali' },
      { title: 'Silver Bazaars & Departure', morning: 'Shopping for miniature paintings & handcrafted leather', afternoon: 'Check-out and transfer to Udaipur airport', evening: 'Departure' }
    ]
  },
  jaipur: {
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Pink City Welcome & Hawa Mahal', morning: 'Arrival in Jaipur & heritage Haveli check-in', afternoon: 'Hawa Mahal honeycomb palace & City Palace museum', evening: 'Jantar Mantar observatory & Johari Bazaar shopping' },
      { title: 'Amber Fort Elephant Ridge & Jal Mahal', morning: 'Grand Amber Fort climb & Sheesh Mahal mirror palace', afternoon: 'Scenic Jal Mahal water palace photography & Nahargarh Fort', evening: 'Chokhi Dhani traditional Rajasthani village cultural dinner' },
      { title: 'Jaigarh Fort & Blue Pottery Craft', morning: 'Jaivana cannon at Jaigarh Fort panorama', afternoon: 'Blue pottery workshop & block printing emporium', evening: 'Rooftop Rajasthani Lal Maas & folk music dinner' },
      { title: 'Patrika Gate & Albert Hall Lights', morning: 'Vibrant colorful Patrika Gate photoshoot', afternoon: 'Albert Hall Museum & Ram Niwas Garden stroll', evening: 'Bapu Bazaar handicrafts & silver jewelry' },
      { title: 'Galtaji Sun Temple & Departure', morning: 'Historic Galtaji Monkey Temple spring walk', afternoon: 'Check-out & Jaipur International Airport transfer', evening: 'Departure' }
    ]
  },
  kerala: {
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Cochin Heritage & Fort Kochi Walk', morning: 'Arrive at Kochi Airport & hotel check-in', afternoon: 'Chinese Fishing Nets & Mattancherry Palace', evening: 'Kathakali cultural dance performance' },
      { title: 'Munnar Tea Gardens & Misty Peaks', morning: 'Scenic drive through waterfalls to Munnar hill station', afternoon: 'Tea Museum tour & Tata Tea estate walk', evening: 'Eravikulam National Park Nilgiri Tahr spotting' },
      { title: 'Alleppey Backwaters Houseboat Cruise', morning: 'Drive down to Alleppey backwater canals', afternoon: 'Private traditional Houseboat cruise & onboard lunch', evening: 'Sunset sailing past paddy fields & village life' },
      { title: 'Varkala Clifftop & Beach Sunsets', morning: 'Check-out from houseboat & transfer to Varkala', afternoon: 'Varkala cliff bohemian cafes & beach stroll', evening: 'Fresh grilled seafood dinner overlooking Arabian Sea' },
      { title: 'Ayurvedic Spa & Departure', morning: 'Relaxing Ayurvedic rejuvenation massage', afternoon: 'Spices & banana chips shopping, airport transfer', evening: 'Departure' }
    ]
  },
  ladakh: {
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=600&auto=format&fit=crop',
    fallbackDays: [
      { title: 'Leh Acclimatization & Shanti Stupa', morning: 'Arrival at Kushok Bakula Airport & hotel rest', afternoon: 'Gentle walk through Leh Old Town market', evening: 'Sunset panorama at Shanti Stupa' },
      { title: 'Monasteries & Magnetic Hill Miracle', morning: 'Hall of Fame & Spituk Gompa visit', afternoon: 'Magnetic Hill gravity illusion & Sangam river confluence', evening: 'Pathar Sahib Gurudwara blessing & cafe dinner' },
      { title: 'Nubra Valley via Khardung La (18,380 ft)', morning: 'Drive across world-highest motorable Khardung La pass', afternoon: 'Diskit Monastery giant Maitreya Buddha statue', evening: 'Double-humped Bactrian camel safari at Hunder sand dunes' },
      { title: 'Pangong Tso Blue Lake Enchantment', morning: 'Scenic drive along Shyok River to Pangong Lake', afternoon: 'Mesmerizing color-changing lake photography', evening: 'Stargazing in pristine Himalayan skies at camp' },
      { title: 'Thiksey Monastery & Departure', morning: 'Thiksey Monastery morning prayer chant & Shey Palace', afternoon: 'Check-out & Leh airport transfer', evening: 'Flight back' }
    ]
  }
};

// Procedural dynamic generator for ANY city or country in the world
function generateUniversalItinerary(destination: string, vibe: string, durationNum: number) {
  const capDest = destination.charAt(0).toUpperCase() + destination.slice(1);
  const normalizedVibe = vibe.toLowerCase();

  const dayTemplates = [
    {
      title: `Arrival, City Landmark Highlights & Welcome in ${capDest}`,
      morning: `Arrival at ${capDest} airport/station, check-in to accommodation & refreshment`,
      afternoon: `Explore iconic downtown center, signature historic plazas & walking avenues in ${capDest}`,
      evening: `Sunset viewpoint panorama, local cuisine dining & vibrant evening atmosphere`
    },
    {
      title: `${normalizedVibe.includes('beach') ? 'Coastal Watersports & Island Escape' : normalizedVibe.includes('adventure') ? 'High Thrills, Scenic Treks & Nature Excursions' : 'Cultural Heritage, Iconic Museums & Architecture'} in ${capDest}`,
      morning: `Early morning excursion to ${capDest}'s famous nature landscapes, scenic lookouts or famous heritage monuments`,
      afternoon: `Immersive local experience, authentic food street trail & landmark discoveries across ${capDest}`,
      evening: `Relaxing twilight dinner with local musical performances and rooftop night vistas`
    },
    {
      title: `Hidden Gems, Artisan Quarters & Culinary Trails in ${capDest}`,
      morning: `Explore picturesque artisan streets, vintage bazaars and specialty cafes in ${capDest}`,
      afternoon: `Guided tour of top-rated regional cultural attractions, riverfront/waterfront or botanical gardens`,
      evening: `Celebration dinner tasting authentic local delicacies and waterfront night stroll`
    },
    {
      title: `Panoramic Day Excursion & Natural Wonders in ${capDest}`,
      morning: `Scenic day drive exploring stunning countryside, mountains or coastal trails near ${capDest}`,
      afternoon: `Outdoor adventure activities, boat cruise or photography at picturesque vistas`,
      evening: `Return to central ${capDest} for leisure time and evening cafe hopping`
    },
    {
      title: `Souvenir Markets, Spa Relaxation & Departure from ${capDest}`,
      morning: `Leisurely breakfast, handcrafted souvenir shopping and final photo stops in ${capDest}`,
      afternoon: `Hotel check-out, farewell lunch and transfer to airport/station`,
      evening: `Safe journey back with unforgettable memories of ${capDest}`
    },
    {
      title: `Deep Cultural Immersion & Special Landmarks in ${capDest}`,
      morning: `Visit world-renowned galleries, historical fortresses and sacred sites in ${capDest}`,
      afternoon: `Afternoon culinary masterclass and leisure shopping across vibrant districts`,
      evening: `Fine dining evening overlooking illuminated city skyline of ${capDest}`
    },
    {
      title: `Grand Finale Tour & Farewell Evening in ${capDest}`,
      morning: `Sunrise scenic viewpoint walk and special breakfast experience`,
      afternoon: `Last-minute landmark visits, park relaxation and gift shopping`,
      evening: `Gala farewell dinner celebrating the complete journey across ${capDest}`
    }
  ];

  const daysCount = Math.max(1, Math.min(durationNum || 5, 7));
  const days = [];

  for (let i = 0; i < daysCount; i++) {
    const template = dayTemplates[i % dayTemplates.length];
    days.push({
      dayNumber: i + 1,
      title: i === 0 ? `Day 1 Arrival & Essential ${capDest} Discovery` : template.title,
      image: `https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop`,
      morning: template.morning,
      afternoon: template.afternoon,
      evening: template.evening
    });
  }

  return days;
}

function generateFallbackPlan(destination: string, budgetNum: number, durationNum: number, vibe: string, modifiers: string[]) {
  const normDest = destination.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
  
  // Try finding exact or partial match in knowledge base
  const matchedKey = Object.keys(destinationKnowledge).find((k) => normDest.includes(k) || k.includes(normDest));
  
  let days: any[] = [];
  let image = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop';

  const daysCount = Math.max(1, Math.min(durationNum || 5, 7));

  if (matchedKey && destinationKnowledge[matchedKey]) {
    const info = destinationKnowledge[matchedKey];
    image = info.image;
    for (let i = 0; i < daysCount; i++) {
      const dayIdx = i % info.fallbackDays.length;
      const baseDay = info.fallbackDays[dayIdx];
      days.push({
        dayNumber: i + 1,
        title: baseDay.title,
        image: info.image,
        morning: baseDay.morning,
        afternoon: baseDay.afternoon,
        evening: baseDay.evening
      });
    }
  } else {
    // Dynamically synthesize custom itinerary for this EXACT destination!
    days = generateUniversalItinerary(destination, vibe, daysCount);
  }

  // Budget calculations
  let transportPct = 20;
  let hotelPct = 30;
  let foodPct = 17;
  let activityPct = 20;
  let reservePct = 13;

  if (modifiers.includes('luxurious')) {
    hotelPct = 40;
    activityPct = 15;
    foodPct = 17;
    transportPct = 20;
    reservePct = 8;
  } else if (modifiers.includes('cheaper')) {
    hotelPct = 28;
    transportPct = 22;
    foodPct = 20;
    activityPct = 17;
    reservePct = 13;
  }

  const transportAmt = Math.round((budgetNum * transportPct) / 100);
  const hotelAmt = Math.round((budgetNum * hotelPct) / 100);
  const foodAmt = Math.round((budgetNum * foodPct) / 100);
  const activityAmt = Math.round((budgetNum * activityPct) / 100);
  const reserveAmt = budgetNum - (transportAmt + hotelAmt + foodAmt + activityAmt);

  return {
    destination,
    vibe,
    totalBudget: budgetNum,
    durationDays: daysCount,
    budgetBreakdown: [
      { category: 'Transport', amount: transportAmt, pct: transportPct, color: '#00A86B', icon: 'Car' },
      { category: 'Hotel', amount: hotelAmt, pct: hotelPct, color: '#30005a', icon: 'Hotel' },
      { category: 'Food', amount: foodAmt, pct: foodPct, color: '#f59e0b', icon: 'UtensilsCrossed' },
      { category: 'Activities', amount: activityAmt, pct: activityPct, color: '#3b82f6', icon: 'Compass' },
      { category: 'Emergency Reserve', amount: reserveAmt, pct: reservePct, color: '#ef4444', icon: 'ShieldAlert' }
    ],
    days
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const destination = (body.destination || 'Goa').toString().trim();
    const budgetRaw = body.budget?.toString().replace(/[^0-9]/g, '') || '30000';
    const budgetNum = Math.max(3000, parseInt(budgetRaw, 10) || 30000);
    const durationRaw = body.duration?.toString().replace(/[^0-9]/g, '') || '5';
    const durationNum = Math.max(1, Math.min(14, parseInt(durationRaw, 10) || 5));
    const vibe = (body.vibe || 'Beach & Leisure').toString().trim();
    const prompt = (body.prompt || '').toString().trim();
    const modifiers: string[] = Array.isArray(body.modifiers) ? body.modifiers : [];

    const apiKey = getGeminiApiKey();

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are TravlTik's master AI Travel Planning Engine. Given the user's travel parameters:
Destination: "${destination}"
Total Budget (INR): ₹${budgetNum}
Duration: ${durationNum} Days
Vibe / Theme: "${vibe}"
Freeform prompt: "${prompt}"
Active modifiers: ${modifiers.join(', ') || 'None'}

Return ONLY a valid JSON object without markdown fences, formatting, or extra commentary matching this exact schema:
{
  "destination": "${destination}",
  "vibe": "${vibe}",
  "totalBudget": ${budgetNum},
  "durationDays": ${durationNum},
  "budgetBreakdown": [
    { "category": "Transport", "amount": number, "pct": number, "color": "#00a896", "icon": "Car" },
    { "category": "Hotel", "amount": number, "pct": number, "color": "#5b2c6f", "icon": "Hotel" },
    { "category": "Food", "amount": number, "pct": number, "color": "#f59e0b", "icon": "UtensilsCrossed" },
    { "category": "Activities", "amount": number, "pct": number, "color": "#3b82f6", "icon": "Compass" },
    { "category": "Emergency Reserve", "amount": number, "pct": number, "color": "#ef4444", "icon": "ShieldAlert" }
  ],
  "days": [
    {
      "dayNumber": 1,
      "title": "Short punchy title",
      "image": "high quality unsplash photo URL for ${destination}",
      "morning": "Detailed morning activity with specific real landmark/place",
      "afternoon": "Detailed afternoon activity with specific lunch spot/activity",
      "evening": "Detailed evening/night activity with sunset view or nightlife"
    }
  ]
}

Ensure the sum of amounts in budgetBreakdown equals ${budgetNum}, percentages total 100%, and exactly ${durationNum} days are generated with realistic, authentic places in ${destination}.`;

        const response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: [{ role: 'user', parts: [{ text: systemPrompt }] }]
        });

        const rawText = response.text || '';
        const cleanedJson = rawText.replace(/```json\s*|\s*```/g, '').trim();
        const parsed = JSON.parse(cleanedJson);

        if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0) {
          return new Response(JSON.stringify({ success: true, plan: parsed, source: 'ai' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (aiErr) {
        console.warn('[AI Trip Generation] Gemini request fallback:', aiErr);
      }
    }

    // Fallback if AI not reachable or key absent
    const fallbackPlan = generateFallbackPlan(destination, budgetNum, durationNum, vibe, modifiers);
    return new Response(JSON.stringify({ success: true, plan: fallbackPlan, source: 'algorithmic' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error generating trip plan:', error);
    return new Response(JSON.stringify({ success: false, error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
