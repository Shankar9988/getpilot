'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Home,
  IndianRupee,
  ChevronDown,
  Play,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { HeroSlide } from '@/types/heroSlide';

interface MagicHeroSectionProps {
  slides?: HeroSlide[];
}

const fallbackSlides: HeroSlide[] = [
  {
    id: 1,
    title: '#PataBadlo LifeBadlo',
    subtitle: 'Find Verified Homes, Plots & Commercial Spaces across India',
    badge_text: 'GetPlot Guarantee',
    image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    button_text: 'Watch Now',
    button_url: '/buy',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: 'Ultra-Luxury Villas & Apartments',
    subtitle: '100% Direct Owner Listings with Zero Brokerage',
    badge_text: 'Featured Collection',
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    button_text: 'Explore Now',
    button_url: '/buy?property_type=villa',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 3,
    title: 'Residential Plots & Commercial Hubs',
    subtitle: 'High-Yield Investment Opportunities in Top Cities',
    badge_text: 'Prime Real Estate',
    image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    button_text: 'View Plots',
    button_url: '/buy?property_type=residential-plot',
    sort_order: 3,
    is_active: true,
  },
];

export default function MagicHeroSection({ slides: propsSlides }: MagicHeroSectionProps) {
  const router = useRouter();
  const slides = propsSlides && propsSlides.length > 0 ? propsSlides : fallbackSlides;

  // Slider State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Search Bar States
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'projects' | 'pg' | 'plot' | 'commercial'>('buy');
  const [selectedCity, setSelectedCity] = useState('Jaipur');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Flat');
  const [selectedBudget, setSelectedBudget] = useState('Budget');

  // Slider Autoplay
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCity) params.set('city', selectedCity.toLowerCase().replace(/\s+/g, '-'));
    if (searchQuery) params.set('search', searchQuery);
    if (selectedType && selectedType !== 'All') {
      const typeSlug = selectedType.toLowerCase().replace(/\s+/g, '-');
      params.set('type', typeSlug);
    }

    if (activeTab === 'rent') {
      router.push(`/rent?${params.toString()}`);
    } else if (activeTab === 'commercial') {
      router.push(`/commercial?${params.toString()}`);
    } else if (activeTab === 'plot') {
      params.set('type', 'residential-plot');
      router.push(`/buy?${params.toString()}`);
    } else {
      router.push(`/buy?${params.toString()}`);
    }
  };

  const currentSlide = slides[currentSlideIndex] || slides[0];

  return (
    <section className="bg-[#f8f9fa] pt-[70px] pb-0 px-4 sm:px-6 lg:px-8 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* CENTER TAGLINE HEADER */}
        <div className="text-center">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">
            Start your <span className="font-extrabold text-[#d8232a]">#PataBadloLifeBadlo</span> Journey
          </h1>
        </div>

        {/* MAIN HERO CONTENT GRID (LEFT SEARCH WIDGET + RIGHT SLIDER CARD) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* LEFT: MAGICBRICKS SEARCH WIDGET (8 COLS) */}
          <div className="lg:col-span-8 space-y-4">
            {/* TABS ROW */}
            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 text-xs sm:text-sm font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setActiveTab('buy')}
                className={`pb-2 transition-all relative whitespace-nowrap ${
                  activeTab === 'buy'
                    ? 'text-[#d8232a] font-extrabold border-b-2 border-[#d8232a]'
                    : 'hover:text-slate-900'
                }`}
              >
                Buy
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('rent')}
                className={`pb-2 transition-all relative whitespace-nowrap ${
                  activeTab === 'rent'
                    ? 'text-[#d8232a] font-extrabold border-b-2 border-[#d8232a]'
                    : 'hover:text-slate-900'
                }`}
              >
                Rent
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className={`pb-2 transition-all relative whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'text-[#d8232a] font-extrabold border-b-2 border-[#d8232a]'
                    : 'hover:text-slate-900'
                }`}
              >
                New Projects
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pg')}
                className={`pb-2 transition-all relative whitespace-nowrap ${
                  activeTab === 'pg'
                    ? 'text-[#d8232a] font-extrabold border-b-2 border-[#d8232a]'
                    : 'hover:text-slate-900'
                }`}
              >
                PG
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('plot')}
                className={`pb-2 transition-all relative whitespace-nowrap ${
                  activeTab === 'plot'
                    ? 'text-[#d8232a] font-extrabold border-b-2 border-[#d8232a]'
                    : 'hover:text-slate-900'
                }`}
              >
                Plot
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('commercial')}
                className={`pb-2 transition-all relative whitespace-nowrap ${
                  activeTab === 'commercial'
                    ? 'text-[#d8232a] font-extrabold border-b-2 border-[#d8232a]'
                    : 'hover:text-slate-900'
                }`}
              >
                Commercial
              </button>

              <Link
                href="/post-property"
                className="pb-2 text-slate-500 hover:text-[#d8232a] transition-colors whitespace-nowrap font-medium text-xs hidden sm:inline-block"
              >
                Post Free Property Ad
              </Link>
            </div>

            {/* WHITE ROUNDED PILL SEARCH BAR */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white rounded-3xl lg:rounded-full p-2.5 sm:p-3 shadow-xl border border-slate-200/90 flex flex-col md:flex-row items-center gap-2 sm:gap-3 transition-all focus-within:ring-2 focus-within:ring-red-500/20"
            >
              {/* 1. Location Input + City Pill */}
              <div className="flex-1 w-full flex items-center gap-2 px-3 py-1.5 border-b md:border-b-0 md:border-r border-slate-200">
                <MapPin className="w-4 h-4 text-[#d8232a] shrink-0" />
                <span className="bg-red-50 text-[#d8232a] font-black text-xs px-2.5 py-1 rounded-full shrink-0 border border-red-100">
                  {selectedCity}
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Add locality, landmark or builder..."
                  className="w-full bg-transparent text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none placeholder:text-slate-400"
                />
              </div>

              {/* 2. Property Type Select */}
              <div className="w-full md:w-auto flex items-center gap-1.5 px-3 py-1.5 border-b md:border-b-0 md:border-r border-slate-200 shrink-0">
                <Home className="w-4 h-4 text-[#d8232a] shrink-0" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-transparent text-slate-800 font-bold text-xs sm:text-sm focus:outline-none cursor-pointer pr-1"
                >
                  <option value="Flat">Flat +1</option>
                  <option value="House">House / Villa</option>
                  <option value="Plot">Plot / Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              {/* 3. Budget Select */}
              <div className="w-full md:w-auto flex items-center gap-1.5 px-3 py-1.5 shrink-0">
                <IndianRupee className="w-4 h-4 text-[#d8232a] shrink-0" />
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="bg-transparent text-slate-800 font-bold text-xs sm:text-sm focus:outline-none cursor-pointer pr-1"
                >
                  <option value="Budget">Budget</option>
                  <option value="50L">Under ₹ 50 Lac</option>
                  <option value="1Cr">₹ 50 Lac - 1 Cr</option>
                  <option value="2Cr">Above ₹ 1 Cr</option>
                </select>
              </div>

              {/* 4. Crimson Red Search CTA Button */}
              <button
                type="submit"
                className="w-full md:w-auto bg-[#d8232a] hover:bg-red-700 text-white font-extrabold px-7 py-3 rounded-full flex items-center justify-center gap-2 text-sm shadow-md shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* RIGHT: HERO CAROUSEL SLIDER CARD (4 COLS) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/10] group bg-slate-900">
              {/* Background Image */}
              <img
                src={currentSlide.image_url}
                alt={currentSlide.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Slide Content */}
              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between text-white z-10">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                    {currentSlide.badge_text || '#PataBadlo'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-black leading-tight drop-shadow-md text-white">
                    {currentSlide.title}
                  </h3>
                  <p className="text-xs text-slate-200 font-medium line-clamp-1">
                    {currentSlide.subtitle}
                  </p>

                  <div className="pt-1 flex items-center justify-between">
                    <Link
                      href={currentSlide.button_url || '/buy'}
                      className="bg-[#d8232a] hover:bg-red-700 text-white text-xs font-extrabold px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                    >
                      <span>{currentSlide.button_text || 'Watch Now'}</span>
                      <Play className="w-3 h-3 fill-current" />
                    </Link>

                    {/* Slide Pagination Dots */}
                    <div className="flex items-center gap-1.5">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlideIndex(idx)}
                          className={`h-2 rounded-full transition-all ${
                            currentSlideIndex === idx ? 'w-5 bg-red-500' : 'w-2 bg-white/60 hover:bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
