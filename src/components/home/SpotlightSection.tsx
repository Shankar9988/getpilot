'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import PropertyCard from '@/components/property/PropertyCard';
import { Property } from '@/types/property';

interface SpotlightSectionProps {
  properties: Property[];
}

export default function SpotlightSection({ properties }: SpotlightSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ready' | 'owner' | 'luxury' | 'budget'>('all');

  const filteredProperties = properties.filter((p) => {
    const priceVal = p.price || p.monthly_rent || 0;
    const typeSlug = p.property_type?.slug || '';

    if (activeFilter === 'ready') return p.status?.toLowerCase().includes('published') || p.id % 2 === 0;
    if (activeFilter === 'owner') return p.is_verified || p.verification_status === 'verified';
    if (activeFilter === 'luxury') return priceVal >= 10000000 || typeSlug === 'villa' || typeSlug === 'penthouse';
    if (activeFilter === 'budget') return priceVal < 10000000;
    return true;
  });

  const displayList = filteredProperties.length > 0 ? filteredProperties.slice(0, 6) : properties.slice(0, 6);

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>MagicBricks Choice Properties</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured & Verified Properties in India
            </h2>
          </div>

          <Link
            href="/buy"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-emerald-600 hover:text-emerald-700 hover:underline transition-all"
          >
            <span>Explore All 100+ Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tab Filters Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            All Verified Properties
          </button>

          <button
            onClick={() => setActiveFilter('ready')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeFilter === 'ready'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            Ready to Move
          </button>

          <button
            onClick={() => setActiveFilter('owner')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeFilter === 'owner'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            Direct Owner Listings
          </button>

          <button
            onClick={() => setActiveFilter('luxury')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeFilter === 'luxury'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            Luxury Villas & Penthouses
          </button>

          <button
            onClick={() => setActiveFilter('budget')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeFilter === 'budget'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            Budget Friendly
          </button>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
