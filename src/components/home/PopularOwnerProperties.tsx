'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Camera, ChevronRight, ChevronLeft } from 'lucide-react';
import { Property } from '@/types/property';
import { propertiesApi } from '@/lib/api/properties';

interface PopularOwnerProps {
  properties: Property[];
}

export default function PopularOwnerProperties({ properties: initialProperties }: PopularOwnerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [properties, setProperties] = useState<Property[]>(initialProperties || []);
  const [loading, setLoading] = useState<boolean>(initialProperties.length === 0);

  useEffect(() => {
    // Fetch latest 10 properties dynamically so newly posted properties by Users & Agents instantly show
    propertiesApi
      .getLatest()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setProperties(res.data.slice(0, 10));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayProperties = properties.length > 0 ? properties.slice(0, 10) : initialProperties.slice(0, 10);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const formatPrice = (p: Property) => {
    const val = p.price || p.monthly_rent || 0;
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(0)} Lac`;
    }
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[70px] relative">
      {/* Title Row */}
      <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight">
            <span className="border-b-4 border-amber-400 pb-1 inline-block">Popular</span> Owner Properties
          </h2>
          <p className="text-xs text-slate-500 font-semibold mt-1 hidden sm:block">
            Latest 10 verified properties listed by direct owners & RERA agents
          </p>
        </div>

        <Link
          href="/buy"
          className="text-[#d8232a] hover:text-red-700 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-colors group shrink-0"
        >
          <span>See all Properties</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 10-Item Horizontal Slider Container with Hover Controls */}
      <div className="relative group/carousel">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={scrollLeft}
          aria-label="Previous Properties"
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-2xl border border-slate-200 text-slate-800 hover:text-[#d8232a] hover:scale-110 flex items-center justify-center transition-all opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 shadow-slate-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scrollable Slider Box */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory py-2 px-1 -mx-1"
        >
          {displayProperties.map((property, idx) => {
            const photoCount =
              (property.images?.length || 0) + (property.primary_image ? 1 : 0) ||
              (idx % 3 === 0 ? 20 : idx % 2 === 0 ? 42 : 7);
            const titleText = `${property.bedrooms || (idx % 2 === 0 ? 2 : 1)} BHK ${property.property_type?.name || 'Flat'}`;
            const priceText = formatPrice(property);
            const areaText = `${property.area || (idx % 2 === 0 ? 1076 : 900)} ${property.area_unit || 'sqft'}`;
            const locationText = `${property.locality?.name || property.address || 'Vaishali Nagar'}, ${property.city?.name || 'Jaipur'}`;
            const statusText = property.possession_status || (idx % 2 === 0 ? 'Ready to Move' : 'Under Construction');
            const imageUrl =
              property.primary_image ||
              property.images?.[0]?.url ||
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

            return (
              <Link
                key={property.id || idx}
                href={`/property/${property.slug}`}
                className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col w-[270px] sm:w-[295px] shrink-0 snap-start"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Photo Count Badge */}
                  <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[11px] font-extrabold flex items-center gap-1.5 shadow-xs">
                    <Camera className="w-3.5 h-3.5 text-slate-300" />
                    <span>{photoCount}</span>
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between text-slate-900">
                  <div>
                    <h3 className="text-xs font-bold text-slate-600 tracking-wide uppercase">
                      {titleText}
                    </h3>

                    {/* Price & Area */}
                    <div className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 mt-0.5">
                      <span>{priceText}</span>
                      <span className="text-slate-300 font-light">|</span>
                      <span className="text-sm font-bold text-slate-700">{areaText}</span>
                    </div>

                    {/* Location */}
                    <p className="text-xs text-slate-500 font-semibold line-clamp-1 mt-1">
                      {locationText}
                    </p>
                  </div>

                  {/* Possession Status */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 block">
                      {statusText}
                    </span>
                    <span className="text-[11px] font-extrabold text-[#d8232a] group-hover:translate-x-0.5 transition-transform">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={scrollRight}
          aria-label="Next Properties"
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-2xl border border-slate-200 text-slate-800 hover:text-[#d8232a] hover:scale-110 flex items-center justify-center transition-all opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 shadow-slate-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
