"use client";

import Link from "next/link";
import { Search, ChevronDown, MapPin, CheckCircle, Users, Award, Shield } from "lucide-react";
import { useState } from "react";
import { ExpertCard } from "@/components/ExpertCard";
import { UniversityCard } from "@/components/UniversityCard";
import { JobCard } from "@/components/JobCard";
import { TourCard } from "@/components/TourCard";

const experts = [
  { name: "Marcus Thorne, JD", role: "Immigration Attorney", rating: 4.5, reviews: 142, location: "New York, NY", price: "from $150", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face", badges: ["Open now", "Verified"], tags: ["US Visa", "H-1B", "L-1"] },
  { name: "Elena Rodriguez", role: "Immigration Consultant", rating: 5.0, reviews: 89, location: "Brooklyn, NY", price: "from $100", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face", badges: ["Verified"], tags: ["Green Card", "Family"] },
  { name: "Beacon Global Services", role: "Education Agent", rating: 4.0, reviews: 210, location: "Queens, NY", price: "from $80", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop&crop=face", badges: [], tags: ["F-1 Visa", "Admissions"] },
];

const universities = [
  { name: "University of Toronto", location: "Toronto, Canada", ranking: "21", rating: 4.8, reviews: 342, programs: "Engineering, CS, Business", tuition: "CAD 45k/yr", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop" },
  { name: "University of Melbourne", location: "Melbourne, Australia", ranking: "14", rating: 4.7, reviews: 256, programs: "Medicine, Arts, Law", tuition: "AUD 50k/yr", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop" },
  { name: "UCL", location: "London, UK", ranking: "9", rating: 4.6, reviews: 412, programs: "Architecture, Economics", tuition: "GBP 30k/yr", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop" },
];

const jobs = [
  { title: "Senior Software Engineer", company: "TechCorp Inc.", location: "San Francisco, USA", salary: "$140k - $180k", posted: "2d ago" },
  { title: "Registered Nurse", company: "HealthCare Plus", location: "Toronto, Canada", salary: "CAD 80k - 100k", posted: "5h ago" },
  { title: "Data Analyst", company: "DataViz GmbH", location: "Berlin, Germany", salary: "€60k - €80k", posted: "1w ago" },
];

const tours = [
  { name: "Ivy League Campus Tour", duration: "7 Days", covered: "Harvard, MIT, Yale, Columbia", rating: 4.9, reviews: 128, price: "$1,299", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop", badges: ["Visa assistance included", "Group discount"] },
  { name: "Australian Uni Explorer", duration: "10 Days", covered: "UniMelb, USyd, UNSW", rating: 4.7, reviews: 84, price: "$2,499", image: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=600&h=400&fit=crop", badges: ["Flights included"] },
  { name: "UK Russell Group Tour", duration: "8 Days", covered: "Oxford, Cambridge, Imperial", rating: 4.8, reviews: 96, price: "$1,899", image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&h=400&fit=crop", badges: ["Visa assistance included"] },
];

const emergencyExperts = [
  { name: "Swift Visa Appeals", desc: "Specializes in last-minute rejection appeals.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200&h=200&fit=crop" },
  { name: "24/7 Detention Legal", desc: "Round-the-clock emergency legal assistance.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop" },
  { name: "Metro Passport Express", desc: "Same-day document processing & courier.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&h=200&fit=crop" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Experts");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  return (
    <div className="bg-[#f5f5f5] min-h-screen text-[#222222]">
      {/* HERO SECTION */}
      <section className="relative h-[400px] w-full flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&h=800&fit=crop"
            alt="City skyline"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto mt-10">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
            Find the right expert. Explore your options.
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium mb-12 drop-shadow">
            Your global marketplace for immigration experts, top universities, overseas jobs, and more.
          </p>
        </div>
      </section>

      {/* SEARCH AREA (Overlapping Hero) */}
      <section className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200">
            {["Experts", "Universities", "Jobs", "Tours", "Emergency"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab
                  ? "text-[#0ea5e9] border-b-4 border-[#0ea5e9]"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search for ${activeTab.toLowerCase()}...`}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] outline-none"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location or Destination"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] outline-none"
                />
              </div>
              <button className="bg-[#0ea5e9] text-white px-8 py-3 rounded font-bold hover:bg-[#0284c7] transition-colors md:w-auto w-full">
                Search
              </button>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center text-sm font-medium text-blue-600 hover:underline"
            >
              Advanced Filters <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
            </button>

            {/* Collapsible Advanced Filters */}
            {showAdvancedFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="border border-gray-300 rounded p-2 text-sm outline-none focus:border-[#0ea5e9]">
                  <option>Any Budget</option>
                  <option>Under $1,000</option>
                  <option>$1,000 - $3,000</option>
                  <option>Over $3,000</option>
                </select>
                <select className="border border-gray-300 rounded p-2 text-sm outline-none focus:border-[#0ea5e9]">
                  <option>Any Language</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Mandarin</option>
                </select>
                <select className="border border-gray-300 rounded p-2 text-sm outline-none focus:border-[#0ea5e9]">
                  <option>Rating: Any</option>
                  <option>4.5 & up</option>
                  <option>4.0 & up</option>
                </select>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded text-[#0ea5e9] focus:ring-[#0ea5e9]" />
                  <span>Available Today</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DUAL REGISTRATION BANNER */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border text-center border-gray-200 rounded-lg p-8 shadow-sm flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-2">Looking for a Visa?</h2>
            <p className="text-gray-600 mb-6 text-center">Join thousands of seekers finding the right experts, universities, and jobs.</p>
            <Link href="/register-seeker">
              <button className="bg-white border border-[#0ea5e9] text-[#0ea5e9] px-6 py-2.5 rounded hover:bg-sky-50 font-medium transition-colors w-full">
                Register as Seeker
              </button>
            </Link>
          </div>
          <div className="bg-white border text-center border-gray-200 rounded-lg p-8 shadow-sm flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-2">Are you an Expert?</h2>
            <p className="text-gray-600 mb-6 text-center">List your services, reach more clients, and grow your immigration practice.</p>
            <Link href="/register-expert">
              <button className="bg-[#0ea5e9] text-white px-6 py-2.5 rounded hover:bg-[#0284c7] font-medium transition-colors w-full">
                Register as Expert
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-y border-gray-200 py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-[#0ea5e9]" />
            </div>
            <h3 className="font-bold mb-1">KYC Verified</h3>
            <p className="text-sm text-gray-500">100% verified professionals</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-[#0ea5e9]" />
            </div>
            <h3 className="font-bold mb-1">10K+ Visas</h3>
            <p className="text-sm text-gray-500">Successfully processed</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#0ea5e9]" />
            </div>
            <h3 className="font-bold mb-1">50K+ Applicants</h3>
            <p className="text-sm text-gray-500">Trusted by global seekers</p>
          </div>
        </div>
      </section>

      {/* TOP EXPERTS ROW */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6 text-[#0ea5e9]">Recommended Immigration Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert, idx) => (
            <ExpertCard key={idx} expert={expert} />
          ))}
        </div>
      </section>

      {/* TOP UNIVERSITIES ROW */}
      <section className="max-w-6xl mx-auto py-12 px-4 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-[#0ea5e9]">Top Universities for International Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni, idx) => (
            <UniversityCard key={idx} uni={uni} />
          ))}
        </div>
      </section>

      {/* OVERSEAS JOBS ROW */}
      <section className="max-w-6xl mx-auto py-12 px-4 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-[#0ea5e9]">Overseas Jobs (Visa Sponsorship)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <JobCard key={idx} job={job} />
          ))}
        </div>
      </section>

      {/* TOURS ROW */}
      <section className="max-w-6xl mx-auto py-12 px-4 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-[#0ea5e9]">Campus & Immigration Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour, idx) => (
            <TourCard key={idx} tour={tour} />
          ))}
        </div>
      </section>

      {/* EMERGENCY ROW */}
      <section className="max-w-6xl mx-auto py-12 px-4 mb-16 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-[#0ea5e9]">Emergency Legal Assistance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emergencyExperts.map((e) => (
            <div key={e.name} className="bg-white border-2 border-sky-200 flex items-center p-4 rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded mr-4 shrink-0 overflow-hidden">
                <img className="w-full h-full object-cover" src={e.image} alt={e.name} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm text-[#222222]">{e.name}</h3>
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded leading-tight">Open now</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
