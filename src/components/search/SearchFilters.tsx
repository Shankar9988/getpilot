'use client';

import React, { useState, useEffect } from 'react';
import { PropertyFilterParams, PropertyType, Amenity } from '@/types/property';
import { City, Locality } from '@/types/location';
import { locationsApi, taxonomiesApi } from '@/lib/api/locations';
import { ShieldCheck, RotateCcw, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';

interface SearchFiltersProps {
  filters: PropertyFilterParams;
  onFilterChange: (newFilters: PropertyFilterParams) => void;
  listingType?: 'sale' | 'rent' | 'commercial';
  className?: string;
}

export default function SearchFilters({
  filters,
  onFilterChange,
  listingType,
  className = '',
}: SearchFiltersProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [localities, setLocalities] = useState<Locality[]>([]);
  const [types, setTypes] = useState<PropertyType[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<Amenity[]>([]);

  useEffect(() => {
    locationsApi.getCities().then((res) => res.data && setCities(res.data)).catch(() => {});
    taxonomiesApi.getPropertyTypes(listingType === 'commercial').then((res) => res.data && setTypes(res.data)).catch(() => {});
    taxonomiesApi.getAmenities().then((res) => res.data && setAmenitiesList(res.data)).catch(() => {});
  }, [listingType]);

  useEffect(() => {
    if (filters.city) {
      locationsApi.getLocalities(filters.city).then((res) => res.data && setLocalities(res.data)).catch(() => {});
    } else {
      setLocalities([]);
    }
  }, [filters.city]);

  const updateParam = (key: keyof PropertyFilterParams, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value,
      page: 1, // reset pagination
    });
  };

  const handleAmenityToggle = (slug: string) => {
    const current = filters.amenities ? filters.amenities.split(',').filter(Boolean) : [];
    const updated = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    updateParam('amenities', updated.length > 0 ? updated.join(',') : undefined);
  };

  const clearAll = () => {
    onFilterChange({
      listing_type: listingType || filters.listing_type,
      sort: filters.sort || 'relevance',
      page: 1,
    });
  };

  const isCommercial = listingType === 'commercial' || filters.listing_type === 'commercial';
  const selectedAmenities = filters.amenities ? filters.amenities.split(',') : [];

  return (
    <div className={`bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-500" />
          <h3 className="text-base font-extrabold text-slate-900">Filters</h3>
        </div>
        <button
          onClick={clearAll}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Verified Only Toggle */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-950">Verified Listings Only</span>
        </div>
        <input
          type="checkbox"
          checked={Boolean(filters.verified)}
          onChange={(e) => updateParam('verified', e.target.checked || undefined)}
          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer accent-emerald-600"
        />
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">City</label>
        <select
          value={filters.city || ''}
          onChange={(e) => {
            updateParam('city', e.target.value || undefined);
            updateParam('locality', undefined);
          }}
          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 focus:border-amber-500 focus:bg-white transition-colors outline-none"
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Locality (shown if city selected) */}
      {localities.length > 0 && (
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Locality / Area</label>
          <select
            value={filters.locality || ''}
            onChange={(e) => updateParam('locality', e.target.value || undefined)}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 focus:border-amber-500 focus:bg-white transition-colors outline-none"
          >
            <option value="">All Localities in City</option>
            {localities.map((l) => (
              <option key={l.id} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Property Type */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">Property Type</label>
        <select
          value={filters.property_type || ''}
          onChange={(e) => updateParam('property_type', e.target.value || undefined)}
          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 focus:border-amber-500 focus:bg-white transition-colors outline-none"
        >
          <option value="">All Property Types</option>
          {types.map((t) => (
            <option key={t.id} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bedrooms (Non-commercial only) */}
      {!isCommercial && (
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Bedrooms (BHK)</label>
          <div className="grid grid-cols-5 gap-1.5">
            {['1', '2', '3', '4', '5+'].map((bhk) => {
              const active = String(filters.bedrooms) === bhk;
              return (
                <button
                  key={bhk}
                  type="button"
                  onClick={() => updateParam('bedrooms', active ? undefined : bhk)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-slate-900 text-amber-400 shadow-xs border border-amber-500/40'
                      : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {bhk}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Range (Min & Max) */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">
          Budget / Price Range (₹)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.min_price || ''}
            onChange={(e) => updateParam('min_price', e.target.value || undefined)}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:border-amber-500 focus:bg-white outline-none"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.max_price || ''}
            onChange={(e) => updateParam('max_price', e.target.value || undefined)}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:border-amber-500 focus:bg-white outline-none"
          />
        </div>
      </div>

      {/* Furnishing Status */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">Furnishing</label>
        <select
          value={filters.furnishing || ''}
          onChange={(e) => updateParam('furnishing', e.target.value || undefined)}
          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 focus:border-amber-500 focus:bg-white transition-colors outline-none"
        >
          <option value="">Any Furnishing</option>
          <option value="fully-furnished">Fully Furnished</option>
          <option value="semi-furnished">Semi-Furnished</option>
          <option value="unfurnished">Unfurnished</option>
        </select>
      </div>

      {/* Amenities (Checkboxes) */}
      {amenitiesList.length > 0 && (
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700">Amenities</label>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {amenitiesList.map((a) => {
              const checked = selectedAmenities.includes(a.slug);
              return (
                <label
                  key={a.id}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-700"
                >
                  <span>{a.name}</span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleAmenityToggle(a.slug)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500"
                  />
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
