'use client';

import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import SearchFilters from './SearchFilters';
import { PropertyFilterParams } from '@/types/property';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: PropertyFilterParams;
  onFilterChange: (filters: PropertyFilterParams) => void;
  listingType?: 'sale' | 'rent' | 'commercial';
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  listingType,
}: FilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Content */}
      <div className="relative ml-auto w-full max-w-md h-full bg-white flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">Filter Properties</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <SearchFilters
            filters={filters}
            onFilterChange={(f) => {
              onFilterChange(f);
            }}
            listingType={listingType}
            className="border-0 shadow-none p-0"
          />
        </div>

        <div className="p-4 border-t border-slate-100 bg-white">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-colors"
          >
            Apply Filters & View Results
          </button>
        </div>
      </div>
    </div>
  );
}
