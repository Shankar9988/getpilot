'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ExternalLink, Star, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

interface LocalityItem {
  id: number;
  name: string;
  slug: string;
  price_range: string;
  rating: number;
  reviews_count: number;
  properties_count: number;
  image_url: string;
}

const POPULAR_LOCALITIES: LocalityItem[] = [
  {
    id: 1,
    name: 'Vaishali Nagar',
    slug: 'vaishali-nagar',
    price_range: '₹ 4,167 - ₹ 21,905 per sqft',
    rating: 4.8,
    reviews_count: 219,
    properties_count: 4486,
    image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    name: 'Ajmer Road',
    slug: 'ajmer-road',
    price_range: '₹ 3,159 - ₹ 14,905 per sqft',
    rating: 4.7,
    reviews_count: 148,
    properties_count: 8943,
    image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    name: 'Mansarovar',
    slug: 'mansarovar',
    price_range: '₹ 4,200 - ₹ 16,800 per sqft',
    rating: 4.6,
    reviews_count: 392,
    properties_count: 6149,
    image_url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 4,
    name: 'Jagatpura',
    slug: 'jagatpura',
    price_range: '₹ 3,800 - ₹ 15,200 per sqft',
    rating: 4.5,
    reviews_count: 184,
    properties_count: 5210,
    image_url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 5,
    name: 'Tonk Road',
    slug: 'tonk-road',
    price_range: '₹ 4,500 - ₹ 22,000 per sqft',
    rating: 4.4,
    reviews_count: 270,
    properties_count: 3850,
    image_url: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 6,
    name: 'Malviya Nagar',
    slug: 'malviya-nagar',
    price_range: '₹ 6,200 - ₹ 28,000 per sqft',
    rating: 4.9,
    reviews_count: 412,
    properties_count: 2940,
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 7,
    name: 'Sirsi Road',
    slug: 'sirsi-road',
    price_range: '₹ 3,200 - ₹ 12,500 per sqft',
    rating: 4.3,
    reviews_count: 115,
    properties_count: 4120,
    image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=300&q=80',
  },
];

export default function PopularLocalitiesSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[70px]">
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Left Feature Card */}
        <div className="bg-[#e6f7f7] rounded-3xl p-6 sm:p-8 border border-teal-100/90 min-w-[240px] lg:w-[260px] shrink-0 flex flex-col justify-center space-y-2 relative overflow-hidden shadow-xs">
          <span className="font-serif italic text-3xl sm:text-4xl text-teal-800 tracking-wide block">
            Explore
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
            Popular Localities in Jaipur
          </h2>
          <div className="w-12 h-1 bg-teal-500 rounded-full mt-2" />
        </div>

        {/* Right Locality Cards Slider */}
        <div className="relative flex-1 group/carousel min-w-0 flex items-center">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Previous Localities"
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-2xl border border-slate-200 text-slate-800 hover:text-teal-600 hover:scale-110 flex items-center justify-center transition-all opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 shadow-slate-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory py-2 px-1 -mx-1 w-full"
          >
            {POPULAR_LOCALITIES.map((loc) => (
              <Link
                key={loc.id}
                href={`/buy?locality=${loc.slug}`}
                className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between w-[275px] sm:w-[305px] shrink-0 snap-start relative"
              >
                {/* Locality Header */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-teal-700 transition-colors flex items-center gap-1.5 truncate">
                      <span>{loc.name}</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-slate-500">
                    {loc.price_range}
                  </p>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 pt-2">
                    <span className="text-amber-500 font-extrabold flex items-center gap-1">
                      {loc.rating} <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    </span>
                    <span className="text-slate-400 font-light">|</span>
                    <span className="text-slate-500 font-medium">{loc.reviews_count} Reviews</span>
                  </div>
                </div>

                {/* Bottom Cyan Box with Floating Round Thumbnail */}
                <div className="pt-6 mt-4 relative">
                  {/* Round Locality Thumbnail */}
                  <div className="flex justify-center -mb-5 relative z-10">
                    <img
                      src={loc.image_url}
                      alt={loc.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
                    />
                  </div>

                  {/* Cyan Pill Container */}
                  <div className="bg-[#e6f7f7] rounded-xl p-3 pt-6 text-center border border-teal-100">
                    <span className="text-xs font-extrabold text-[#d8232a] group-hover:underline inline-flex items-center justify-center gap-1">
                      <span>{loc.properties_count.toLocaleString()} Properties for Sale</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Next Localities"
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-2xl border border-slate-200 text-slate-800 hover:text-teal-600 hover:scale-110 flex items-center justify-center transition-all opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 shadow-slate-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
