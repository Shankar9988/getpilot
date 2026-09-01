'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (value: any) => void;
  className?: string;
}

export default function SortDropdown({ value, onChange, className = '' }: SortDropdownProps) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs">
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort by:</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer pr-2"
        >
          <option value="relevance">Relevance / Featured</option>
          <option value="newest">Newest Listed</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="area_high">Area: Largest First</option>
        </select>
      </div>
    </div>
  );
}
