'use client';

import React from 'react';
import Link from 'next/link';
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Sparkles,
  ShieldCheck,
  Building,
  ArrowRight
} from 'lucide-react';
import { Property } from '@/types/property';
import VerificationBadge from '../common/VerificationBadge';
import PriceDisplay from '../common/PriceDisplay';
import { useFavorites } from '@/context/FavoritesContext';

interface PropertyCardProps {
  property: Property;
  className?: string;
  badgeLabel?: 'Featured' | 'New' | 'Hot Deal';
}

export default function PropertyCard({
  property,
  className = '',
  badgeLabel,
}: PropertyCardProps) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(property.id);

  const fallbackImage =
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';
  const displayImage =
    property.primary_image || (property.images && property.images[0]?.url) || fallbackImage;

  const locationText =
    [property.locality?.name, property.city?.name].filter(Boolean).join(', ') || property.address;

  // Determine badge type based on property flags
  const badge =
    badgeLabel ||
    (property.is_featured
      ? 'Featured'
      : property.listing_type === 'rent'
      ? 'New'
      : 'Hot Deal');

  const badgeStyles = {
    Featured: 'bg-violet-100/90 text-violet-700 border-violet-200',
    New: 'bg-emerald-100/90 text-emerald-700 border-emerald-200',
    'Hot Deal': 'bg-pink-100/90 text-pink-700 border-pink-200',
  };

  return (
    <div
      className={`group bg-white rounded-3xl border border-slate-100 nestoria-card-shadow nestoria-card-hover flex flex-col overflow-hidden ${className}`}
    >
      {/* Media & Image Container */}
      <div className="relative aspect-16/11 w-full bg-slate-100 overflow-hidden">
        <Link href={`/property/${property.slug}`} className="block w-full h-full">
          <img
            src={displayImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Top Badges Bar */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
          <div className="pointer-events-auto">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold shadow-xs backdrop-blur-md border ${badgeStyles[badge]}`}
            >
              {badge}
            </span>
          </div>

          {/* Favorite Heart Button in Frosted Circle */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className={`pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-md ${
              favorited
                ? 'bg-rose-500 text-white shadow-rose-950/30'
                : 'bg-white/85 hover:bg-white text-slate-700 hover:text-rose-500'
            }`}
            aria-label={favorited ? 'Remove from saved' : 'Save property'}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Property Title */}
          <Link href={`/property/${property.slug}`} className="group-hover:text-indigo-600 transition-colors block">
            <h3 className="text-base font-black text-slate-900 line-clamp-1 leading-snug tracking-tight">
              {property.title}
            </h3>
          </Link>

          {/* Location with Pin Icon */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">{locationText}</span>
          </div>
        </div>

        {/* Specs Row: Beds, Baths, Sqft */}
        <div className="flex items-center gap-4 text-xs font-bold text-slate-600 pt-2 border-t border-slate-100">
          {property.bedrooms ? (
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-slate-400" />
              <span>{property.bedrooms} Beds</span>
            </div>
          ) : null}

          {property.bathrooms ? (
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.bathrooms} Baths</span>
            </div>
          ) : null}

          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-slate-400" />
            <span>{property.area} sqft</span>
          </div>
        </div>

        {/* Bottom Price & View Details Action */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div>
            <PriceDisplay
              price={property.price}
              monthlyRent={property.monthly_rent}
              listingType={property.listing_type}
              isNegotiable={property.is_negotiable}
              size="md"
            />
          </div>

          <Link
            href={`/property/${property.slug}`}
            className="btn-dark-navy px-4 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 hover:bg-indigo-600 transition-colors"
          >
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
