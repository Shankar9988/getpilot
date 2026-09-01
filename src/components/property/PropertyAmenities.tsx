'use client';

import React from 'react';
import { Amenity } from '@/types/property';
import {
  ShieldCheck,
  Car,
  Zap,
  Activity,
  Waves,
  Coffee,
  Smile,
  Flame,
  PhoneCall,
  AlertTriangle,
  Trees,
  Droplets,
  BatteryCharging,
  Trash2,
  Wind,
  CheckCircle2,
  Check
} from 'lucide-react';

interface PropertyAmenitiesProps {
  amenities: Amenity[];
}

export default function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  if (!amenities || amenities.length === 0) return null;

  const iconMap: Record<string, any> = {
    'shield-check': ShieldCheck,
    'car': Car,
    'zap': Zap,
    'activity': Activity,
    'waves': Waves,
    'coffee': Coffee,
    'smile': Smile,
    'flame': Flame,
    'phone-call': PhoneCall,
    'alert-triangle': AlertTriangle,
    'trees': Trees,
    'droplets': Droplets,
    'battery-charging': BatteryCharging,
    'trash-2': Trash2,
    'wind': Wind,
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Amenities & Infrastructure
        </h2>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {amenities.length} Features Included
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {amenities.map((item) => {
          const Icon = (item.icon && iconMap[item.icon]) ? iconMap[item.icon] : CheckCircle2;
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-xs shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-800 leading-snug">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
