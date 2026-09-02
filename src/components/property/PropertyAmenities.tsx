'use client';

import React, { useState } from 'react';
import { Amenity } from '@/types/property';
import {
  Zap,
  Droplets,
  Building2,
  Waves,
  Dumbbell,
  Car,
  ChevronDown,
  FileText,
  ShieldCheck,
  Trees,
  Flame,
  Wind,
  Wifi,
  Lock,
  Sparkles,
  CheckCircle2,
  Download
} from 'lucide-react';

interface PropertyAmenitiesProps {
  amenities?: Amenity[];
  propertyTitle?: string;
}

const defaultAmenitiesList = [
  { name: 'Power Back Up', icon: Zap },
  { name: 'Rain Water Harvesting', icon: Droplets },
  { name: 'Club House', icon: Building2 },
  { name: 'Swimming Pool', icon: Waves },
  { name: 'Gymnasium', icon: Dumbbell },
  { name: 'Reserved Parking', icon: Car },
  { name: '24x7 Security & CCTV', icon: Lock },
  { name: 'High Speed Wifi', icon: Wifi },
  { name: 'Landscaped Gardens', icon: Trees },
  { name: 'Fire Fighting System', icon: Flame },
];

export default function PropertyAmenities({ amenities = [], propertyTitle }: PropertyAmenitiesProps) {
  const [showAll, setShowAll] = useState(false);

  const displayList = amenities.length > 0
    ? amenities.map(a => ({ name: a.name, icon: CheckCircle2 }))
    : defaultAmenitiesList;

  const visibleList = showAll ? displayList : displayList.slice(0, 6);
  const totalCount = displayList.length > 6 ? (amenities.length > 0 ? amenities.length : 25) : displayList.length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
        Amenities
      </h2>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-2">
        {visibleList.map((item, idx) => {
          const IconComponent = item.icon || CheckCircle2;
          return (
            <div key={idx} className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:text-[#9333ea] group-hover:bg-purple-50 group-hover:border-purple-200 transition-all shrink-0">
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Links (View All & Download Brochure) */}
      <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100 text-sm">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-1 font-bold text-rose-600 hover:text-rose-700 underline underline-offset-4 cursor-pointer transition-colors"
        >
          <span>{showAll ? 'Show fewer Amenities' : `View all Amenities(${totalCount})`}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`} />
        </button>

        <button
          onClick={() => alert(`Downloading brochure with full amenity details for ${propertyTitle || 'property'}...`)}
          className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-[#9333ea] underline underline-offset-4 cursor-pointer transition-colors"
        >
          <FileText className="w-4 h-4 text-slate-700" />
          <span>Download Brochure</span>
        </button>
      </div>
    </div>
  );
}
