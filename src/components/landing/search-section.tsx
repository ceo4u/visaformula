'use client'

import { ChevronDown } from 'lucide-react'

export function SearchSection() {
  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-xl p-8 shadow-lg">
          <h2 className="text-white text-xl font-semibold mb-6">What do you need help with?</h2>

          {/* Tabs */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-4">
            {['Visitor Visa', 'Student Visa', 'Work Visa', 'Permanent Residence', 'Citizenship', 'Visa Appeal', 'Deportation Defence', 'Business Immigration', 'More'].map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  {index === 0 && <span>🏠</span>}
                  {index === 1 && <span>🎓</span>}
                  {index === 2 && <span>💼</span>}
                  {index === 3 && <span>🏘️</span>}
                  {index === 4 && <span>🏛️</span>}
                  {index === 5 && <span>📋</span>}
                  {index === 6 && <span>🛡️</span>}
                  {index === 7 && <span>🏢</span>}
                  {index === 8 && <span>⋯</span>}
                  <span className="text-xs">{tab}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Dropdowns and Search */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-white text-sm font-medium block mb-2">I want help with</label>
              <div className="relative">
                <select className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg appearance-none cursor-pointer text-sm">
                  <option>Select service</option>
                </select>
                <ChevronDown size={18} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-2">Country</label>
              <div className="relative">
                <select className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg appearance-none cursor-pointer text-sm">
                  <option>Select country</option>
                </select>
                <ChevronDown size={18} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-2">City or Region <span className="text-gray-400">(Optional)</span></label>
              <input 
                type="text" 
                placeholder="Enter city or region"
                className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg text-sm placeholder-gray-500"
              />
            </div>

            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 text-sm">
                Search Experts
              </button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-300 text-sm mb-3">Popular Searches:</p>
            <div className="flex flex-wrap gap-2">
              {['Canada PR', 'USA Visa Appeal', 'UK Student Visa', 'Australia Work Visa', 'Canada Visitor Visa'].map((search, index) => (
                <button
                  key={index}
                  className="text-gray-300 hover:text-white text-sm border border-gray-600 rounded px-3 py-1 hover:border-gray-500 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
