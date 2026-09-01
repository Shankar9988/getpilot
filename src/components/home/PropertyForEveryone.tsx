'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PropertyForEveryone() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title with red underline accent */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          <span className="border-b-4 border-[#d8232a] pb-1 inline-block">We&apos;ve</span> got properties for everyone
        </h2>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* CARD 1: OWNER PROPERTIES */}
        <Link
          href="/buy?featured=true"
          className="group relative h-48 rounded-2xl overflow-hidden shadow-md border border-slate-200 block bg-slate-900 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
        >
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
            alt="Owner Properties"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white space-y-1">
            <span className="text-2xl sm:text-3xl font-black block tracking-tight">38,902</span>
            <h3 className="text-base font-extrabold text-white">Owner Properties</h3>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors pt-1">
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* CARD 2: PROJECTS */}
        <Link
          href="/buy"
          className="group relative h-48 rounded-2xl overflow-hidden shadow-md border border-slate-200 block bg-slate-900 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
        >
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
            alt="New Projects"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white">Projects</h3>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors pt-1">
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* CARD 3: CAMPAIGN WIN VOUCHERS BANNER */}
        <div className="relative h-48 rounded-2xl overflow-hidden shadow-md border border-amber-200/60 bg-gradient-to-br from-[#e8d5c4] via-[#f5e6d8] to-[#dfcbb8] p-5 flex items-center justify-between transition-all hover:shadow-2xl">
          <div className="space-y-2 max-w-[60%] z-10">
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
              Share your <span className="font-extrabold text-[#d8232a]">#GetPlotLifeBadlo</span> story and <span className="font-black">WIN</span> vouchers worth <span className="font-black text-slate-900">₹5000</span>
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#d8232a] hover:bg-red-700 text-white font-extrabold text-xs px-4 py-2 rounded-full shadow-md transition-all active:scale-95"
            >
              Click Here
            </Link>
          </div>

          <div className="w-32 h-full absolute right-0 bottom-0 pointer-events-none opacity-90">
            <img
              src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80"
              alt="Happy Couple"
              className="w-full h-full object-cover object-top rounded-r-2xl"
            />
          </div>
        </div>

        {/* CARD 4: BUDGET HOMES */}
        <Link
          href="/buy?sort=relevance"
          className="group relative h-48 rounded-2xl overflow-hidden shadow-md border border-slate-200 block bg-slate-900 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
        >
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
            alt="Budget Homes"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white space-y-1">
            <span className="text-2xl sm:text-3xl font-black block tracking-tight">797</span>
            <h3 className="text-base font-extrabold text-white">Budget Homes</h3>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors pt-1">
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
