'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building, DollarSign, ArrowRight, Sparkles, Filter, Check } from 'lucide-react';

interface MagicHeroSearchProps {
  cities: Array<{ id: number; name: string; slug: string }>;
  propertyTypes: Array<{ id: number; name: string; slug: string }>;
}

export default function MagicHeroSearch({ cities, propertyTypes }: MagicHeroSearchProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'commercial' | 'plots'>('buy');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [budgetRange, setBudgetRange] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (selectedCity) params.set('city', selectedCity);
    if (searchQuery) params.set('search', searchQuery);
    if (selectedType) params.set('type', selectedType);
    if (budgetRange) params.set('budget', budgetRange);

    if (activeTab === 'rent') {
      router.push(`/rent?${params.toString()}`);
    } else if (activeTab === 'commercial') {
      router.push(`/commercial?${params.toString()}`);
    } else if (activeTab === 'plots') {
      params.set('type', 'residential-plot');
      router.push(`/buy?${params.toString()}`);
    } else {
      router.push(`/buy?${params.toString()}`);
    }
  };

  const quickTags = [
    { label: '2 BHK Flats', type: 'apartment', query: '2 bhk' },
    { label: 'Ready to Move', filter: 'ready' },
    { label: 'Luxury Villas', type: 'villa' },
    { label: 'Plots in Jaipur', city: 'jaipur', type: 'residential-plot' },
    { label: 'Owner Properties', filter: 'owner' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tab Navigation Pill Bar */}
      <div className="flex items-center justify-center sm:justify-start gap-1 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-t-2xl sm:rounded-t-3xl border border-slate-800 w-fit mx-auto sm:mx-0 shadow-2xl">
        <button
          type="button"
          onClick={() => setActiveTab('buy')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
            activeTab === 'buy'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <span>Buy</span>
          {activeTab === 'buy' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rent')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
            activeTab === 'rent'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <span>Rent</span>
          {activeTab === 'rent' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('commercial')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
            activeTab === 'commercial'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <span>Commercial</span>
          {activeTab === 'commercial' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('plots')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
            activeTab === 'plots'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <span>Plots / Land</span>
          {activeTab === 'plots' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        </button>
      </div>

      {/* Main Search Container */}
      <form
        onSubmit={handleSearch}
        className="bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-b-3xl sm:rounded-tr-3xl shadow-2xl border border-slate-100 flex flex-col gap-4 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* 1. City Dropdown */}
          <div className="md:col-span-3 relative">
            <div className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-slate-800 font-bold text-xs sm:text-sm focus:outline-none cursor-pointer"
              >
                <option value="">All Major Cities</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.slug}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Locality / Project Search Input */}
          <div className="md:col-span-4 relative">
            <div className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Locality, Project or Builder..."
                className="w-full bg-transparent text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* 3. Property Type Dropdown */}
          <div className="md:col-span-3 relative">
            <div className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
              <Building className="w-4 h-4 text-indigo-600 shrink-0" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-transparent text-slate-800 font-bold text-xs sm:text-sm focus:outline-none cursor-pointer"
              >
                <option value="">Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type.id} value={type.slug}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Search CTA Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Tags (MagicBricks Popular Searches Strip) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Popular:</span>
          </span>
          {quickTags.map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                const params = new URLSearchParams();
                if (tag.city) params.set('city', tag.city);
                if (tag.type) params.set('type', tag.type);
                if (tag.query) params.set('search', tag.query);
                router.push(`/buy?${params.toString()}`);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-bold transition-all border border-slate-200/60 hover:border-emerald-200"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
