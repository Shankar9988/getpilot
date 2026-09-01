'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Home,
  IndianRupee,
  ChevronDown
} from 'lucide-react';
import { locationsApi, taxonomiesApi } from '@/lib/api/locations';
import { City } from '@/types/location';
import { PropertyType } from '@/types/property';

interface HeroSearchProps {
  className?: string;
}

export default function HeroSearch({ className = '' }: HeroSearchProps) {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);

  // Search parameters
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  useEffect(() => {
    locationsApi.getCities().then((res) => {
      if (res.data) setCities(res.data);
    }).catch(() => {});

    taxonomiesApi.getPropertyTypes().then((res) => {
      if (res.data) setPropertyTypes(res.data);
    }).catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (selectedCity) params.append('city', selectedCity);
    if (selectedType) params.append('property_type', selectedType);

    if (selectedBudget) {
      if (selectedBudget === 'under-50l') {
        params.append('max_price', '5000000');
      } else if (selectedBudget === '50l-1cr') {
        params.append('min_price', '5000000');
        params.append('max_price', '10000000');
      } else if (selectedBudget === '1cr-3cr') {
        params.append('min_price', '10000000');
        params.append('max_price', '30000000');
      } else if (selectedBudget === 'above-3cr') {
        params.append('min_price', '30000000');
      }
    }

    const queryStr = params.toString();
    router.push(`/buy${queryStr ? `?${queryStr}` : ''}`);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      <div className="bg-white/95 backdrop-blur-xl rounded-full p-2.5 sm:p-3.5 pill-search-shadow border border-white/80">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-2 lg:gap-0">
          {/* Section 1: Location */}
          <div className="flex-1 w-full flex items-center gap-3.5 px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-slate-50/80 rounded-full lg:rounded-l-full lg:rounded-r-none transition-colors group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-bold text-slate-400">Location</label>
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-900 outline-none cursor-pointer appearance-none pr-5 truncate"
                >
                  <option value="">All Locations</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.slug}>
                      {city.name}, India
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-[1px] h-10 bg-slate-200" />

          {/* Section 2: Property Type */}
          <div className="flex-1 w-full flex items-center gap-3.5 px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-slate-50/80 rounded-full lg:rounded-none transition-colors group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Home className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-bold text-slate-400">Property Type</label>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-900 outline-none cursor-pointer appearance-none pr-5 truncate"
                >
                  <option value="">Any Type</option>
                  {propertyTypes.map((type) => (
                    <option key={type.id} value={type.slug}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-[1px] h-10 bg-slate-200" />

          {/* Section 3: Price Range */}
          <div className="flex-1 w-full flex items-center gap-3.5 px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-slate-50/80 rounded-full lg:rounded-none transition-colors group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-bold text-slate-400">Price Range</label>
              <div className="relative">
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-900 outline-none cursor-pointer appearance-none pr-5 truncate"
                >
                  <option value="">Any Budget</option>
                  <option value="under-50l">Under ₹50 Lakh</option>
                  <option value="50l-1cr">₹50 Lakh - ₹1 Crore</option>
                  <option value="1cr-3cr">₹1 Crore - ₹3 Crore</option>
                  <option value="above-3cr">₹3 Crore+</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* CTA: Purple Gradient Search Button */}
          <div className="w-full lg:w-auto p-1 shrink-0">
            <button
              type="submit"
              className="btn-gradient-purple w-full lg:w-auto px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 font-bold text-sm shadow-md active:scale-95 transition-all"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
