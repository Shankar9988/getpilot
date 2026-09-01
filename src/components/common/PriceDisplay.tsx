'use client';

import React from 'react';

interface PriceDisplayProps {
  price?: number | null;
  monthlyRent?: number | null;
  listingType?: string;
  isNegotiable?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function formatIndianPrice(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount) || amount <= 0) {
    return 'Price on Request';
  }

  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2).replace(/\.?0+$/, '')} Cr`;
  } else if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2).replace(/\.?0+$/, '')} Lakh`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
}

export default function PriceDisplay({
  price,
  monthlyRent,
  listingType,
  isNegotiable,
  className = '',
  size = 'md',
}: PriceDisplayProps) {
  const isRent = listingType === 'rent' || (monthlyRent && !price);
  const amount = isRent ? monthlyRent : (price || monthlyRent);
  const formatted = formatIndianPrice(amount);

  const sizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-lg font-bold',
    lg: 'text-2xl font-extrabold',
    xl: 'text-3xl font-black',
  };

  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <span className={`text-slate-900 tracking-tight ${sizeClasses[size]}`}>
        {formatted}
      </span>
      {isRent && amount && amount > 0 && (
        <span className="text-xs font-medium text-slate-500">/ mo</span>
      )}
      {isNegotiable && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
          Negotiable
        </span>
      )}
    </span>
  );
}
