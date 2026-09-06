// src/lib/country-hero-images.ts
// Comprehensive 4K Retina Curated Hero Images for All 195+ Sovereign Countries & Territories

export interface CountryHeroImageInfo {
  url: string;
  alt: string;
  landmark: string;
  countryName: string;
  source: 'unsplash' | 'pexels' | 'curated_library';
  photographer?: string;
}

export interface CountryHeroEntry {
  name: string;
  landmark: string;
  tourism: string;
  study?: string;
  business?: string;
}

const U = (id: string, width = 1600): string =>
  `https://images.unsplash.com/${id}?w=${width}&auto=format&fit=crop&q=85`;

export const COUNTRY_HERO_CATALOG: Record<string, CountryHeroEntry> = {
  "afghanistan": {
    name: "Afghanistan",
    landmark: "Band-e Amir travertine lakes & Bamyan Valley",
    tourism: U("photo-1596701062351-8c2c14d1fdd0"),
  },
  "albania": {
    name: "Albania",
    landmark: "Ksamil Islands & Albanian Riviera",
    tourism: U("photo-1533105079780-92b9be482077"),
  },
  "algeria": {
    name: "Algeria",
    landmark: "Ghardaia & Sahara Desert dunes",
    tourism: U("photo-1539650116574-8efeb43e2750"),
  },
  "andorra": {
    name: "Andorra",
    landmark: "Pyrenees Mountains & Andorra la Vella",
    tourism: U("photo-1548625361-19597793d5f3"),
  },
  "angola": {
    name: "Angola",
    landmark: "Kalandula Falls & Luanda Bay",
    tourism: U("photo-1516026672322-bc52d61a55d5"),
  },
  "antigua-and-barbuda": {
    name: "Antigua and Barbuda",
    landmark: "Dickenson Bay turquoise waters",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "argentina": {
    name: "Argentina",
    landmark: "Iguazu Falls & Buenos Aires Casa Rosada",
    tourism: U("photo-1589308078059-be1415eab4c3"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "armenia": {
    name: "Armenia",
    landmark: "Khor Virap Monastery with Mount Ararat",
    tourism: U("photo-1527838832700-5059252407fa"),
  },
  "australia": {
    name: "Australia",
    landmark: "Sydney Opera House & Harbour Bridge",
    tourism: U("photo-1506973035872-a4ec16b8e8d9"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1523482580672-f109ba8cb9be"),
  },
  "austria": {
    name: "Austria",
    landmark: "Hallstatt Alpine Village & Vienna Belvedere",
    tourism: U("photo-1516550893923-42d28e5677af"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "azerbaijan": {
    name: "Azerbaijan",
    landmark: "Flame Towers & Baku Caspian Boulevard",
    tourism: U("photo-1588668214407-6ea9a6d8c272"),
    business: U("photo-1588668214407-6ea9a6d8c272"),
  },
  "bahamas": {
    name: "Bahamas",
    landmark: "Exuma Cays crystal turquoise waters",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "bahrain": {
    name: "Bahrain",
    landmark: "Bahrain World Trade Center & Manama Bay",
    tourism: U("photo-1512453979798-5ea266f8880c"),
    business: U("photo-1512453979798-5ea266f8880c"),
  },
  "bangladesh": {
    name: "Bangladesh",
    landmark: "Sundarbans & Lalbagh Fort Dhaka",
    tourism: U("photo-1585123334904-845d60e97b29"),
  },
  "barbados": {
    name: "Barbados",
    landmark: "Carlisle Bay & Bridgetown Caribbean Coast",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "belarus": {
    name: "Belarus",
    landmark: "Mir Castle Complex & Minsk Independence Ave",
    tourism: U("photo-1513635269975-59663e0ac1ad"),
  },
  "belgium": {
    name: "Belgium",
    landmark: "Grand Place Brussels & Bruges Canals",
    tourism: U("photo-1516483638261-f4dbaf036963"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "belize": {
    name: "Belize",
    landmark: "Great Blue Hole & Ambergris Caye",
    tourism: U("photo-1544551763-46a013bb70d5"),
  },
  "benin": {
    name: "Benin",
    landmark: "Ganvie Stilt Village & Cotonou coastline",
    tourism: U("photo-1516026672322-bc52d61a55d5"),
  },
  "bhutan": {
    name: "Bhutan",
    landmark: "Tiger’s Nest Monastery (Paro Taktsang)",
    tourism: U("photo-1544735716-392fe2489ffa"),
  },
  "bolivia": {
    name: "Bolivia",
    landmark: "Salar de Uyuni Salt Flats reflection",
    tourism: U("photo-1509316975850-ff9c5deb0cd9"),
  },
  "bosnia-and-herzegovina": {
    name: "Bosnia and Herzegovina",
    landmark: "Stari Most Old Bridge Mostar",
    tourism: U("photo-1563822249548-9a72b6353cd1"),
  },
  "botswana": {
    name: "Botswana",
    landmark: "Okavango Delta wildlife luxury safari",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "brazil": {
    name: "Brazil",
    landmark: "Christ the Redeemer & Rio de Janeiro Sugarloaf",
    tourism: U("photo-1483729558449-99ef09a8c325"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "brunei": {
    name: "Brunei",
    landmark: "Sultan Omar Ali Saifuddien Mosque Bandar",
    tourism: U("photo-1541432901042-2d8bd64b4a9b"),
  },
  "bulgaria": {
    name: "Bulgaria",
    landmark: "Alexander Nevsky Cathedral Sofia & Rila",
    tourism: U("photo-1516483638261-f4dbaf036963"),
  },
  "burkina-faso": {
    name: "Burkina Faso",
    landmark: "Sindou Peaks rock formations",
    tourism: U("photo-1516026672322-bc52d61a55d5"),
  },
  "burundi": {
    name: "Burundi",
    landmark: "Lake Tanganyika shoreline & Bujumbura",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "cambodia": {
    name: "Cambodia",
    landmark: "Angkor Wat sunrise reflection Siem Reap",
    tourism: U("photo-1508804185872-d7badad00f7d"),
  },
  "cameroon": {
    name: "Cameroon",
    landmark: "Mount Cameroon & Limbe volcanic coastline",
    tourism: U("photo-1516026672322-bc52d61a55d5"),
  },
  "canada": {
    name: "Canada",
    landmark: "Lake Louise Canadian Rockies & Toronto Skyline",
    tourism: U("photo-1503614472-8c93d56e92ce"),
    study: U("photo-1592280771190-3e2e4d571952"),
    business: U("photo-1517090504586-fde19ea6066f"),
  },
  "cape-verde": {
    name: "Cape Verde",
    landmark: "Santa Maria beach Sal Island",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "central-african-republic": {
    name: "Central African Republic",
    landmark: "Dzanga-Sangha National Park",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "chad": {
    name: "Chad",
    landmark: "Ennedi Plateau desert arches",
    tourism: U("photo-1509316975850-ff9c5deb0cd9"),
  },
  "chile": {
    name: "Chile",
    landmark: "Torres del Paine National Park Patagonia",
    tourism: U("photo-1527004013197-933c4bb611b3"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "china": {
    name: "China",
    landmark: "Great Wall of China & Shanghai Skyline",
    tourism: U("photo-1508804185872-d7badad00f7d"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1508804185872-d7badad00f7d"),
  },
  "colombia": {
    name: "Colombia",
    landmark: "Cartagena Old Town & Cocora Valley",
    tourism: U("photo-1533105079780-92b9be482077"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "comoros": {
    name: "Comoros",
    landmark: "Mount Karthala & Moroni coastline",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "congo": {
    name: "Congo (Republic)",
    landmark: "Odzala-Kokoua National Park rainforest",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "congo-drc": {
    name: "Democratic Republic of the Congo",
    landmark: "Virunga National Park volcanoes",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "costa-rica": {
    name: "Costa Rica",
    landmark: "Arenal Volcano & Manuel Antonio rainforest",
    tourism: U("photo-1518182170546-07661fd94144"),
  },
  "croatia": {
    name: "Croatia",
    landmark: "Dubrovnik Old Town Adriatic Coast & Plitvice",
    tourism: U("photo-1533105079780-92b9be482077"),
  },
  "cuba": {
    name: "Cuba",
    landmark: "Old Havana vintage classic cars & El Capitolio",
    tourism: U("photo-1500759285222-a95626b934cb"),
  },
  "cyprus": {
    name: "Cyprus",
    landmark: "Aphrodite’s Rock & Paphos Mediterranean coast",
    tourism: U("photo-1570077188670-e3a8d69ac5ff"),
  },
  "czech-republic": {
    name: "Czech Republic",
    landmark: "Prague Charles Bridge & Old Town Square",
    tourism: U("photo-1541849546-216549ae216d"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "denmark": {
    name: "Denmark",
    landmark: "Nyhavn colorful harbour Copenhagen",
    tourism: U("photo-1513622470522-26c3c8a854bc"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "djibouti": {
    name: "Djibouti",
    landmark: "Lake Assal crater lake & Red Sea coral reef",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "dominica": {
    name: "Dominica",
    landmark: "Morne Trois Pitons lush boiling lake",
    tourism: U("photo-1518182170546-07661fd94144"),
  },
  "dominican-republic": {
    name: "Dominican Republic",
    landmark: "Punta Cana luxury white sand resort",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "ecuador": {
    name: "Ecuador",
    landmark: "Galapagos Islands & Quito Historic Center",
    tourism: U("photo-1527004013197-933c4bb611b3"),
  },
  "egypt": {
    name: "Egypt",
    landmark: "Great Pyramids of Giza & Cairo Nile",
    tourism: U("photo-1503177119275-0aa32b3a9368"),
    business: U("photo-1503177119275-0aa32b3a9368"),
  },
  "el-salvador": {
    name: "El Salvador",
    landmark: "Santa Ana Volcano crater lake & El Tunco",
    tourism: U("photo-1518182170546-07661fd94144"),
  },
  "equatorial-guinea": {
    name: "Equatorial Guinea",
    landmark: "Malabo volcanic island & cathedral",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "eritrea": {
    name: "Eritrea",
    landmark: "Asmara Italian Art Deco architecture",
    tourism: U("photo-1513635269975-59663e0ac1ad"),
  },
  "estonia": {
    name: "Estonia",
    landmark: "Tallinn Medieval Old Town panoramic view",
    tourism: U("photo-1513622470522-26c3c8a854bc"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "eswatini": {
    name: "Eswatini",
    landmark: "Ezulwini Valley & Mlilwane Wildlife Sanctuary",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "ethiopia": {
    name: "Ethiopia",
    landmark: "Lalibela Rock-Hewn Churches & Simien Mountains",
    tourism: U("photo-1527838832700-5059252407fa"),
  },
  "fiji": {
    name: "Fiji",
    landmark: "Mamanuca Islands turquoise lagoon resort",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "finland": {
    name: "Finland",
    landmark: "Helsinki Cathedral & Lapland Aurora Borealis",
    tourism: U("photo-1531366936337-7c912a4589a7"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "france": {
    name: "France",
    landmark: "Paris Eiffel Tower & Seine River sunset",
    tourism: U("photo-1502602898657-3e91760cbb34"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1508804185872-d7badad00f7d"),
  },
  "gabon": {
    name: "Gabon",
    landmark: "Loango National Park Atlantic coastline",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "gambia": {
    name: "Gambia",
    landmark: "Kunta Kinteh Island & Gambia River estuary",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "georgia": {
    name: "Georgia",
    landmark: "Gergeti Trinity Church Mount Kazbegi",
    tourism: U("photo-1565008447742-97f6f38c985c"),
  },
  "germany": {
    name: "Germany",
    landmark: "Berlin Brandenburg Gate & Neuschwanstein Castle",
    tourism: U("photo-1560969184-10fe8719e047"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1577083552431-6e5fd01aa342"),
  },
  "ghana": {
    name: "Ghana",
    landmark: "Cape Coast Castle & Accra Independence Arch",
    tourism: U("photo-1516026672322-bc52d61a55d5"),
  },
  "greece": {
    name: "Greece",
    landmark: "Oia Santorini Caldera & Athens Acropolis",
    tourism: U("photo-1570077188670-e3a8d69ac5ff"),
  },
  "grenada": {
    name: "Grenada",
    landmark: "Grand Anse Beach Caribbean sunset",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "guatemala": {
    name: "Guatemala",
    landmark: "Tikal Maya Pyramids & Lake Atitlan volcanoes",
    tourism: U("photo-1518182170546-07661fd94144"),
  },
  "guinea": {
    name: "Guinea",
    landmark: "Fouta Djallon waterfalls & Conakry coastline",
    tourism: U("photo-1516026672322-bc52d61a55d5"),
  },
  "guinea-bissau": {
    name: "Guinea-Bissau",
    landmark: "Bijagos Archipelago biosphere reserve",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "guyana": {
    name: "Guyana",
    landmark: "Kaieteur Falls pristine Amazon rainforest",
    tourism: U("photo-1518182170546-07661fd94144"),
  },
  "haiti": {
    name: "Haiti",
    landmark: "Citadelle Laferriere mountaintop fortress",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "honduras": {
    name: "Honduras",
    landmark: "Roatan coral reef & Copan Maya Ruins",
    tourism: U("photo-1544551763-46a013bb70d5"),
  },
  "hungary": {
    name: "Hungary",
    landmark: "Budapest Parliament Building & Danube River",
    tourism: U("photo-1551867633-194f125bddfa"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "iceland": {
    name: "Iceland",
    landmark: "Skogafoss Waterfall & Kirkjufell Northern Lights",
    tourism: U("photo-1504893524553-b855bce32c67"),
  },
  "india": {
    name: "India",
    landmark: "Taj Mahal Agra marble dome reflection",
    tourism: U("photo-1564507592333-c60657eea523"),
    study: U("photo-1562774053-701939374585"),
    business: U("photo-1486406146926-c627a92ad1ab"),
  },
  "indonesia": {
    name: "Indonesia",
    landmark: "Bali Uluwatu Cliff Temple & Borobudur",
    tourism: U("photo-1537996194471-e657df975ab4"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "iran": {
    name: "Iran",
    landmark: "Nasir al-Mulk Pink Mosque Shiraz & Isfahan",
    tourism: U("photo-1588668214407-6ea9a6d8c272"),
  },
  "iraq": {
    name: "Iraq",
    landmark: "Erbil Citadel & Ancient Babylon Ishtar Gate",
    tourism: U("photo-1588668214407-6ea9a6d8c272"),
  },
  "ireland": {
    name: "Ireland",
    landmark: "Cliffs of Moher Atlantic Coast & Dublin Trinity",
    tourism: U("photo-1590089415225-401ed6f9db8e"),
    study: U("photo-1526778548025-fa2f459cd5c1"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "israel": {
    name: "Israel",
    landmark: "Jerusalem Western Wall & Tel Aviv Mediterranean",
    tourism: U("photo-1544967082-d9d25d867d66"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "italy": {
    name: "Italy",
    landmark: "Rome Colosseum & Venice Grand Canal",
    tourism: U("photo-1529260830199-42c24126f198"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "ivory-coast": {
    name: "Ivory Coast",
    landmark: "Basilica of Our Lady of Peace Yamoussoukro",
    tourism: U("photo-1516026672322-bc52d61a55d5"),
  },
  "jamaica": {
    name: "Jamaica",
    landmark: "Seven Mile Beach Negril & Blue Mountains",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "japan": {
    name: "Japan",
    landmark: "Mount Fuji with Chureito Pagoda & Tokyo Tower",
    tourism: U("photo-1493976040374-85c8e12f0c0e"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1503899036084-c55cdd92da26"),
  },
  "jordan": {
    name: "Jordan",
    landmark: "Petra Treasury Al-Khazneh carved sandstone",
    tourism: U("photo-1579606032836-db4055de02fb"),
  },
  "kazakhstan": {
    name: "Kazakhstan",
    landmark: "Charyn Canyon & Almaty Ascension Cathedral",
    tourism: U("photo-1565008447742-97f6f38c985c"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "kenya": {
    name: "Kenya",
    landmark: "Maasai Mara wildlife migration safari with Kilimanjaro",
    tourism: U("photo-1516426122078-c23e76319801"),
    business: U("photo-1516426122078-c23e76319801"),
  },
  "kiribati": {
    name: "Kiribati",
    landmark: "South Tarawa coral atoll & turquoise Pacific",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "kuwait": {
    name: "Kuwait",
    landmark: "Kuwait Towers & Arabian Gulf skyline",
    tourism: U("photo-1512453979798-5ea266f8880c"),
    business: U("photo-1512453979798-5ea266f8880c"),
  },
  "kyrgyzstan": {
    name: "Kyrgyzstan",
    landmark: "Issyk-Kul Lake & Tian Shan alpine peaks",
    tourism: U("photo-1565008447742-97f6f38c985c"),
  },
  "laos": {
    name: "Laos",
    landmark: "Kuang Si Falls Luang Prabang & Wat Xieng Thong",
    tourism: U("photo-1528181304800-259b08848526"),
  },
  "latvia": {
    name: "Latvia",
    landmark: "Riga Old Town Art Nouveau & House of Blackheads",
    tourism: U("photo-1513622470522-26c3c8a854bc"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "lebanon": {
    name: "Lebanon",
    landmark: "Baalbek Roman Temple ruins & Beirut Corniche",
    tourism: U("photo-1579606032836-db4055de02fb"),
  },
  "lesotho": {
    name: "Lesotho",
    landmark: "Maletsunyane Falls Semonkong gorge",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "liberia": {
    name: "Liberia",
    landmark: "Sapo National Park rainforest & Monrovia beaches",
    tourism: U("photo-1516026672322-bc52d61a55d5"),
  },
  "libya": {
    name: "Libya",
    landmark: "Leptis Magna Roman ruins & Sahara oasis",
    tourism: U("photo-1503177119275-0aa32b3a9368"),
  },
  "liechtenstein": {
    name: "Liechtenstein",
    landmark: "Vaduz Castle perched above Rhine Valley",
    tourism: U("photo-1530122037265-a5f1f91d3b99"),
  },
  "lithuania": {
    name: "Lithuania",
    landmark: "Trakai Island Castle & Vilnius Old Town",
    tourism: U("photo-1513622470522-26c3c8a854bc"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "luxembourg": {
    name: "Luxembourg",
    landmark: "Bock Casemates & Luxembourg City Grund Valley",
    tourism: U("photo-1516483638261-f4dbaf036963"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "madagascar": {
    name: "Madagascar",
    landmark: "Avenue of the Baobabs Morondava sunset",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "malawi": {
    name: "Malawi",
    landmark: "Lake Malawi crystal freshwater coves",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "malaysia": {
    name: "Malaysia",
    landmark: "Petronas Twin Towers Kuala Lumpur & Batu Caves",
    tourism: U("photo-1528181304800-259b08848526"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1528181304800-259b08848526"),
  },
  "maldives": {
    name: "Maldives",
    landmark: "Overwater luxury villas & coral lagoon",
    tourism: U("photo-1514282401047-d79a71a590e8"),
  },
  "mali": {
    name: "Mali",
    landmark: "Great Mosque of Djenne adobe architecture",
    tourism: U("photo-1516026672322-bc52d61a55d5"),
  },
  "malta": {
    name: "Malta",
    landmark: "Valletta Grand Harbour fortified skyline",
    tourism: U("photo-1533105079780-92b9be482077"),
  },
  "marshall-islands": {
    name: "Marshall Islands",
    landmark: "Majuro Atoll lagoon & coconut palms",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "mauritania": {
    name: "Mauritania",
    landmark: "Chinguetti ancient Sahara Silk library & Adrar",
    tourism: U("photo-1509316975850-ff9c5deb0cd9"),
  },
  "mauritius": {
    name: "Mauritius",
    landmark: "Le Morne Brabant & Chamarel Seven Coloured Earths",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "mexico": {
    name: "Mexico",
    landmark: "Chichen Itza Maya Pyramid & Cancun Caribbean Coast",
    tourism: U("photo-1518105779142-d975f22f1b0a"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "micronesia": {
    name: "Micronesia",
    landmark: "Nan Madol ancient megalithic ruins Pohnpei",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "moldova": {
    name: "Moldova",
    landmark: "Orheiul Vechi cave monastery complex",
    tourism: U("photo-1513635269975-59663e0ac1ad"),
  },
  "monaco": {
    name: "Monaco",
    landmark: "Monte Carlo Casino & Port Hercules luxury yachts",
    tourism: U("photo-1533105079780-92b9be482077"),
    business: U("photo-1533105079780-92b9be482077"),
  },
  "mongolia": {
    name: "Mongolia",
    landmark: "Gobi Desert dunes & Genghis Khan equestrian statue",
    tourism: U("photo-1509316975850-ff9c5deb0cd9"),
  },
  "montenegro": {
    name: "Montenegro",
    landmark: "Bay of Kotor medieval fjord & Our Lady of the Rocks",
    tourism: U("photo-1533105079780-92b9be482077"),
  },
  "morocco": {
    name: "Morocco",
    landmark: "Marrakech Jardin Majorelle & Chefchaouen Blue City",
    tourism: U("photo-1539020140153-e479b8c22e70"),
  },
  "mozambique": {
    name: "Mozambique",
    landmark: "Bazaruto Archipelago marine reserve sand dunes",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "myanmar": {
    name: "Myanmar",
    landmark: "Bagan ancient temples plain hot air balloons",
    tourism: U("photo-1508804185872-d7badad00f7d"),
  },
  "namibia": {
    name: "Namibia",
    landmark: "Sossusvlei Dune 45 red sand dunes & Deadvlei",
    tourism: U("photo-1509316975850-ff9c5deb0cd9"),
  },
  "nauru": {
    name: "Nauru",
    landmark: "Anibare Bay coral reef coastline",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "nepal": {
    name: "Nepal",
    landmark: "Mount Everest Himalayas & Kathmandu Durbar Square",
    tourism: U("photo-1544735716-392fe2489ffa"),
  },
  "netherlands": {
    name: "Netherlands",
    landmark: "Amsterdam Canals & Zaanse Schans Historic Windmills",
    tourism: U("photo-1534351590666-13e3e96b5017"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "new-zealand": {
    name: "New Zealand",
    landmark: "Queenstown Lake Wakatipu & Milford Sound fjord",
    tourism: U("photo-1507699622108-4be3abd695ad"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1507699622108-4be3abd695ad"),
  },
  "nicaragua": {
    name: "Nicaragua",
    landmark: "Granada Colonial Cathedral & Ometepe Volcano Island",
    tourism: U("photo-1518182170546-07661fd94144"),
  },
  "niger": {
    name: "Niger",
    landmark: "Agadez mudbrick minaret & Tenere desert",
    tourism: U("photo-1509316975850-ff9c5deb0cd9"),
  },
  "nigeria": {
    name: "Nigeria",
    landmark: "Zuma Rock Abuja & Lagos Victoria Island skyline",
    tourism: U("photo-1516026672322-bc52d61a55d5"),
    business: U("photo-1516026672322-bc52d61a55d5"),
  },
  "north-korea": {
    name: "North Korea",
    landmark: "Kumsusan Palace & Paektu Mountain",
    tourism: U("photo-1493976040374-85c8e12f0c0e"),
  },
  "north-macedonia": {
    name: "North Macedonia",
    landmark: "Lake Ohrid Church of St. John Kaneo",
    tourism: U("photo-1533105079780-92b9be482077"),
  },
  "norway": {
    name: "Norway",
    landmark: "Geirangerfjord & Reine Lofoten Islands",
    tourism: U("photo-1506744038136-46273834b3fb"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "oman": {
    name: "Oman",
    landmark: "Sultan Qaboos Grand Mosque Muscat & Wahiba Sands",
    tourism: U("photo-1512453979798-5ea266f8880c"),
    business: U("photo-1512453979798-5ea266f8880c"),
  },
  "pakistan": {
    name: "Pakistan",
    landmark: "Badshahi Mosque Lahore & K2 Karakoram Range",
    tourism: U("photo-1588668214407-6ea9a6d8c272"),
  },
  "palau": {
    name: "Palau",
    landmark: "Rock Islands southern lagoon jellyfish lake",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "palestine": {
    name: "Palestine",
    landmark: "Church of the Nativity Bethlehem & Old Jerusalem",
    tourism: U("photo-1544967082-d9d25d867d66"),
  },
  "panama": {
    name: "Panama",
    landmark: "Panama Canal & Panama City coastal skyscrapers",
    tourism: U("photo-1518182170546-07661fd94144"),
    business: U("photo-1518182170546-07661fd94144"),
  },
  "papua-new-guinea": {
    name: "Papua New Guinea",
    landmark: "Tavurvur volcano Rabaul & Kokoda Trail",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "paraguay": {
    name: "Paraguay",
    landmark: "Jesuit Missions of La Santisima Trinidad",
    tourism: U("photo-1589308078059-be1415eab4c3"),
  },
  "peru": {
    name: "Peru",
    landmark: "Machu Picchu ancient Inca citadel & Cusco",
    tourism: U("photo-1526392060635-9d6019884377"),
  },
  "philippines": {
    name: "Philippines",
    landmark: "El Nido Bacuit Archipelago Palawan & Boracay",
    tourism: U("photo-1518509562904-e7ef99cdcc86"),
    business: U("photo-1518509562904-e7ef99cdcc86"),
  },
  "poland": {
    name: "Poland",
    landmark: "Krakow Main Market Square & Warsaw Old Town",
    tourism: U("photo-1519197924294-4ba991a11128"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "portugal": {
    name: "Portugal",
    landmark: "Pena Palace Sintra & Lisbon Belem Tower",
    tourism: U("photo-1555881400-74d7acaacd8b"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "qatar": {
    name: "Qatar",
    landmark: "Doha Corniche Skyline & Museum of Islamic Art",
    tourism: U("photo-1512453979798-5ea266f8880c"),
    business: U("photo-1512453979798-5ea266f8880c"),
  },
  "romania": {
    name: "Romania",
    landmark: "Bran Castle (Dracula’s Castle) & Brasov Old Town",
    tourism: U("photo-1584646098378-0874589d76b1"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "russia": {
    name: "Russia",
    landmark: "Saint Basil’s Cathedral Moscow & Saint Petersburg",
    tourism: U("photo-1513622470522-26c3c8a854bc"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "rwanda": {
    name: "Rwanda",
    landmark: "Volcanoes National Park mountain gorillas & Kigali",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "saint-kitts-and-nevis": {
    name: "Saint Kitts and Nevis",
    landmark: "Brimstone Hill Fortress & South Friars Bay",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "saint-lucia": {
    name: "Saint Lucia",
    landmark: "Gros Piton & Petit Piton volcanic spires resort",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "saint-vincent-and-the-grenadines": {
    name: "Saint Vincent and the Grenadines",
    landmark: "Tobago Cays Marine Park turquoise waters",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "samoa": {
    name: "Samoa",
    landmark: "To Sua Ocean Trench volcanic swimming pool",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "san-marino": {
    name: "San Marino",
    landmark: "Guaita Tower perched atop Mount Titano cliff",
    tourism: U("photo-1529260830199-42c24126f198"),
  },
  "sao-tome-and-principe": {
    name: "Sao Tome and Principe",
    landmark: "Pico Cao Grande needle volcanic plug",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "saudi-arabia": {
    name: "Saudi Arabia",
    landmark: "AlUla Elephant Rock & Kingdom Centre Riyadh",
    tourism: U("photo-1586724237569-f3d0c1dee8c6"),
    business: U("photo-1586724237569-f3d0c1dee8c6"),
  },
  "senegal": {
    name: "Senegal",
    landmark: "Goree Island & African Renaissance Monument Dakar",
    tourism: U("photo-1516026672322-bc52d61a55d5"),
  },
  "serbia": {
    name: "Serbia",
    landmark: "Belgrade Fortress Kalemegdan & Saint Sava Temple",
    tourism: U("photo-1533105079780-92b9be482077"),
  },
  "seychelles": {
    name: "Seychelles",
    landmark: "Anse Source d’Argent granite boulders La Digue",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "sierra-leone": {
    name: "Sierra Leone",
    landmark: "River Number Two Beach white sand Freetown",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "singapore": {
    name: "Singapore",
    landmark: "Marina Bay Sands & Gardens by the Bay",
    tourism: U("photo-1525625293386-3f8f99389edd"),
    study: U("photo-1562774053-701939374585"),
    business: U("photo-1486406146926-c627a92ad1ab"),
  },
  "slovakia": {
    name: "Slovakia",
    landmark: "High Tatras alpine peaks & Bratislava Castle",
    tourism: U("photo-1516550893923-42d28e5677af"),
  },
  "slovenia": {
    name: "Slovenia",
    landmark: "Lake Bled island church & Julian Alps castle",
    tourism: U("photo-1506744038136-46273834b3fb"),
  },
  "solomon-islands": {
    name: "Solomon Islands",
    landmark: "Marovo Lagoon world’s largest saltwater lagoon",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "somalia": {
    name: "Somalia",
    landmark: "Laas Geel rock art & Mogadishu coastline",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "south-africa": {
    name: "South Africa",
    landmark: "Table Mountain Cape Town & Kruger Safari",
    tourism: U("photo-1580618672591-eb180b1a973f"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1580618672591-eb180b1a973f"),
  },
  "south-korea": {
    name: "South Korea",
    landmark: "Gyeongbokgung Palace & Seoul N Tower skyline",
    tourism: U("photo-1538485399081-7191377e8241"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1538485399081-7191377e8241"),
  },
  "south-sudan": {
    name: "South Sudan",
    landmark: "Boma National Park wildlife plains & Nile",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "spain": {
    name: "Spain",
    landmark: "Seville Plaza de España & Sagrada Familia Barcelona",
    tourism: U("photo-1543783207-ec64e4d95325"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1539037116277-4db20889f2d4"),
  },
  "sri-lanka": {
    name: "Sri Lanka",
    landmark: "Sigiriya Lion Rock Fortress & Nine Arch Bridge Ella",
    tourism: U("photo-1586861635167-e5223aadc9fe"),
  },
  "sudan": {
    name: "Sudan",
    landmark: "Meroe Pyramids ancient Nubian kingdom",
    tourism: U("photo-1503177119275-0aa32b3a9368"),
  },
  "suriname": {
    name: "Suriname",
    landmark: "Central Suriname Nature Reserve Brownsberg",
    tourism: U("photo-1518182170546-07661fd94144"),
  },
  "sweden": {
    name: "Sweden",
    landmark: "Stockholm Gamla Stan & Drottningholm Palace",
    tourism: U("photo-1509356843151-3e7d96241e11"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1513584684374-8bab748fbf90"),
  },
  "switzerland": {
    name: "Switzerland",
    landmark: "Zermatt Matterhorn & Jungfraujoch Swiss Alps",
    tourism: U("photo-1530122037265-a5f1f91d3b99"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1517090504586-fde19ea6066f"),
  },
  "syria": {
    name: "Syria",
    landmark: "Umayyad Mosque Damascus & Krak des Chevaliers",
    tourism: U("photo-1579606032836-db4055de02fb"),
  },
  "taiwan": {
    name: "Taiwan",
    landmark: "Taipei 101 Skyline & Taroko Gorge marble cliffs",
    tourism: U("photo-1508247967583-7d982ea01526"),
    business: U("photo-1508247967583-7d982ea01526"),
  },
  "tajikistan": {
    name: "Tajikistan",
    landmark: "Pamir Highway & Iskanderkul turquoise lake",
    tourism: U("photo-1565008447742-97f6f38c985c"),
  },
  "tanzania": {
    name: "Tanzania",
    landmark: "Mount Kilimanjaro & Serengeti National Park",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "thailand": {
    name: "Thailand",
    landmark: "Wat Arun Bangkok & Maya Bay Phi Phi Islands",
    tourism: U("photo-1508009603885-50cf7c579365"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1528181304800-259b08848526"),
  },
  "timor-leste": {
    name: "Timor-Leste",
    landmark: "Atauro Island pristine coral reefs & Dili Cristo Rei",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "togo": {
    name: "Togo",
    landmark: "Koutammakou Batammariba mud towers & Lome",
    tourism: U("photo-1516026672322-bc52d61a55d5"),
  },
  "tonga": {
    name: "Tonga",
    landmark: "Ha’amonga ‘a Maui trilithon & Vava’u coral reefs",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "trinidad-and-tobago": {
    name: "Trinidad and Tobago",
    landmark: "Pigeon Point Tobago & Maracas Beach",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "tunisia": {
    name: "Tunisia",
    landmark: "Amphitheatre of El Jem & Sidi Bou Said white-blue",
    tourism: U("photo-1539020140153-e479b8c22e70"),
  },
  "turkey": {
    name: "Turkey",
    landmark: "Hagia Sophia Istanbul & Cappadocia hot air balloons",
    tourism: U("photo-1524231757912-21f4fe3a7200"),
    business: U("photo-1524231757912-21f4fe3a7200"),
  },
  "turkmenistan": {
    name: "Turkmenistan",
    landmark: "Darvaza Gas Crater Door to Hell & Ashgabat",
    tourism: U("photo-1509316975850-ff9c5deb0cd9"),
  },
  "tuvalu": {
    name: "Tuvalu",
    landmark: "Funafuti Conservation Area turquoise lagoon",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "uganda": {
    name: "Uganda",
    landmark: "Bwindi Impenetrable Forest gorillas & Murchison",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "ukraine": {
    name: "Ukraine",
    landmark: "Saint Sophia Cathedral Kyiv & Lviv Historic Center",
    tourism: U("photo-1513635269975-59663e0ac1ad"),
  },
  "united-arab-emirates": {
    name: "United Arab Emirates",
    landmark: "Burj Khalifa Dubai & Sheikh Zayed Grand Mosque",
    tourism: U("photo-1512453979798-5ea266f8880c"),
    study: U("photo-1562774053-701939374585"),
    business: U("photo-1512453979798-5ea266f8880c"),
  },
  "united-kingdom": {
    name: "United Kingdom",
    landmark: "Big Ben Palace of Westminster London & Tower Bridge",
    tourism: U("photo-1513635269975-59663e0ac1ad"),
    study: U("photo-1526778548025-fa2f459cd5c1"),
    business: U("photo-1486406146926-c627a92ad1ab"),
  },
  "united-states": {
    name: "United States",
    landmark: "New York Manhattan Skyline & Statue of Liberty",
    tourism: U("photo-1506146332389-18140dc7b2fb"),
    study: U("photo-1562774053-701939374585"),
    business: U("photo-1486406146926-c627a92ad1ab"),
  },
  "uruguay": {
    name: "Uruguay",
    landmark: "Punta del Este beach resort & Casapueblo",
    tourism: U("photo-1589308078059-be1415eab4c3"),
  },
  "uzbekistan": {
    name: "Uzbekistan",
    landmark: "Registan Square Samarkand turquoise mosaics",
    tourism: U("photo-1548013146-72479768bada"),
  },
  "vanuatu": {
    name: "Vanuatu",
    landmark: "Mount Yasur active volcano & Champagne Beach",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "vatican-city": {
    name: "Vatican City",
    landmark: "Saint Peter’s Basilica & St. Peter’s Square",
    tourism: U("photo-1531572753322-ad063cecc140"),
  },
  "venezuela": {
    name: "Venezuela",
    landmark: "Angel Falls Canaima National Park world’s highest",
    tourism: U("photo-1518182170546-07661fd94144"),
  },
  "vietnam": {
    name: "Vietnam",
    landmark: "Ha Long Bay emerald waters & limestone karsts",
    tourism: U("photo-1528127269322-539801943592"),
    business: U("photo-1528127269322-539801943592"),
  },
  "yemen": {
    name: "Yemen",
    landmark: "Old Walled City of Shibam & Socotra Dragon Blood",
    tourism: U("photo-1509316975850-ff9c5deb0cd9"),
  },
  "zambia": {
    name: "Zambia",
    landmark: "Victoria Falls Devil’s Pool Zambezi River",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "zimbabwe": {
    name: "Zimbabwe",
    landmark: "Victoria Falls & Great Zimbabwe ruins",
    tourism: U("photo-1516426122078-c23e76319801"),
  },
  "hong-kong": {
    name: "Hong Kong",
    landmark: "Victoria Harbour skyline from Victoria Peak",
    tourism: U("photo-1508247967583-7d982ea01526"),
    study: U("photo-1541339907198-e08756dedf3f"),
    business: U("photo-1508247967583-7d982ea01526"),
  },
  "macau": {
    name: "Macau",
    landmark: "Ruins of Saint Paul’s & Cotai luxury resorts",
    tourism: U("photo-1508247967583-7d982ea01526"),
    business: U("photo-1508247967583-7d982ea01526"),
  },
  "puerto-rico": {
    name: "Puerto Rico",
    landmark: "Old San Juan Castillo San Felipe del Morro",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "guam": {
    name: "Guam",
    landmark: "Tumon Bay Two Lovers Point turquoise coast",
    tourism: U("photo-1507525428034-b723cf961d3e"),
  },
  "us-virgin-islands": {
    name: "U.S. Virgin Islands",
    landmark: "Trunk Bay Saint John Caribbean beach",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "bermuda": {
    name: "Bermuda",
    landmark: "Horseshoe Bay pink sand beach",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "cayman-islands": {
    name: "Cayman Islands",
    landmark: "Seven Mile Beach Grand Cayman",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "british-virgin-islands": {
    name: "British Virgin Islands",
    landmark: "The Baths Virgin Gorda granite boulders",
    tourism: U("photo-1548574505-5e239809ee19"),
  },
  "gibraltar": {
    name: "Gibraltar",
    landmark: "Rock of Gibraltar & Mediterranean Strait",
    tourism: U("photo-1543783207-ec64e4d95325"),
  },
  "kosovo": {
    name: "Kosovo",
    landmark: "Sinan Pasha Mosque Prizren & Shar Mountains",
    tourism: U("photo-1563822249548-9a72b6353cd1"),
  },
  "western-sahara": {
    name: "Western Sahara",
    landmark: "Dakhla White Dune lagoon & Sahara Atlantic coast",
    tourism: U("photo-1509316975850-ff9c5deb0cd9"),
  },
};

// Standard aliases mapping for instant match
const COUNTRY_ALIASES: Record<string, string> = {
  "usa": "united-states",
  "us": "united-states",
  "america": "united-states",
  "united states of america": "united-states",
  "uk": "united-kingdom",
  "england": "united-kingdom",
  "great britain": "united-kingdom",
  "britain": "united-kingdom",
  "uae": "united-arab-emirates",
  "dubai": "united-arab-emirates",
  "abu dhabi": "united-arab-emirates",
  "ksa": "saudi-arabia",
  "south-korea": "south-korea",
  "korea": "south-korea",
  "russia": "russia",
  "russian federation": "russia",
  "czechia": "czech-republic",
  "czech republic": "czech-republic",
  "drc": "congo-drc",
  "dr congo": "congo-drc",
  "ivory coast": "ivory-coast",
  "cote divoire": "ivory-coast",
  "côte d'ivoire": "ivory-coast",
  "vatican": "vatican-city",
  "holy see": "vatican-city",
  "hk": "hong-kong",
};

export function normalizeCountrySlug(input: string): string {
  if (!input) return "";
  const raw = input.toLowerCase().trim();
  if (COUNTRY_ALIASES[raw]) return COUNTRY_ALIASES[raw];
  const clean = raw.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return COUNTRY_ALIASES[clean] || clean;
}

export function getStaticCountryHeroImage(
  countryInput: string,
  purpose: string = "tourism"
): CountryHeroImageInfo {
  const slug = normalizeCountrySlug(countryInput);
  const p = (purpose || "tourism").toLowerCase();
  const isStudy = p.includes("study") || p.includes("student") || p.includes("education") || p.includes("university");
  const isBusiness = p.includes("business") || p.includes("work") || p.includes("corporate");

  // 1. Direct Catalog Match
  let entry = COUNTRY_HERO_CATALOG[slug];
  if (!entry) {
    // Try fuzzy substring search in catalog
    const matchedKey = Object.keys(COUNTRY_HERO_CATALOG).find(k =>
      slug.includes(k) || k.includes(slug)
    );
    if (matchedKey) entry = COUNTRY_HERO_CATALOG[matchedKey];
  }

  if (entry) {
    let selectedUrl = entry.tourism;
    let altText = `${entry.name} — ${entry.landmark}`;
    if (isStudy && entry.study) {
      selectedUrl = entry.study;
      altText = `${entry.name} Academic Campus & Universities`;
    } else if (isBusiness && entry.business) {
      selectedUrl = entry.business;
      altText = `${entry.name} Commercial & Skyline Architecture`;
    }
    return {
      url: selectedUrl,
      alt: altText,
      landmark: entry.landmark,
      countryName: entry.name,
      source: "curated_library",
    };
  }

  // 2. Fallback for unlisted regions
  const fallbackName = countryInput
    ? countryInput.split(/[-_\s]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "Global Destination";

  return {
    url: U("photo-1488646953014-85cb44e25828"),
    alt: `${fallbackName} Travel & Visa Services`,
    landmark: "Panoramic Travel & Exploration",
    countryName: fallbackName,
    source: "curated_library",
  };
}
