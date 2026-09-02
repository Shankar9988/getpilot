'use client';

import React, { useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { PropertyDetail } from '@/types/property';

interface MoreDetailsSectionProps {
  property: PropertyDetail;
  onContactClick?: () => void;
}

export default function MoreDetailsSection({ property, onContactClick }: MoreDetailsSectionProps) {
  const [readMore, setReadMore] = useState(false);

  // Price breakup
  const formatPriceBreakup = () => {
    if (property.price) {
      if (property.price >= 10000000) {
        return `₹${(property.price / 10000000).toFixed(2)} Cr`;
      } else if (property.price >= 100000) {
        return `₹${(property.price / 100000).toFixed(2)} Lac`;
      }
      return `₹${property.price.toLocaleString('en-IN')}`;
    }
    if (property.monthly_rent) {
      return `₹${property.monthly_rent.toLocaleString('en-IN')} / mo`;
    }
    return 'Price on Request';
  };

  // Booking Amount (10% estimated)
  const formatBookingAmount = () => {
    if (!property.price) return '₹5.0 Lac (Estimated)';
    const booking = property.price * 0.1;
    if (booking >= 10000000) {
      return `₹${(booking / 10000000).toFixed(2)} Cr`;
    } else if (booking >= 100000) {
      return `₹${(booking / 100000).toFixed(1)} Lac`;
    }
    return `₹${booking.toLocaleString('en-IN')}`;
  };

  // Address
  const fullAddress = [
    property.address,
    property.locality?.name,
    property.city?.name,
    property.state?.name,
    property.pincode ? `- ${property.pincode}` : '',
  ].filter(Boolean).join(', ');

  // Estimated EMI (8.5% interest, 20 yr tenure on 80% loan)
  const calculateEmi = () => {
    if (!property.price) return '47,042';
    const loanAmount = property.price * 0.8;
    const monthlyRate = 0.085 / 12;
    const tenureMonths = 240;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return Math.round(emi).toLocaleString('en-IN');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
        More Details
      </h2>

      {/* Key Details Rows */}
      <div className="space-y-4 text-sm text-slate-800">
        {/* Price Breakup */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-2 border-b border-slate-100">
          <div className="text-slate-500 font-medium">Price Breakup</div>
          <div className="sm:col-span-2 font-black text-slate-900 text-base">{formatPriceBreakup()}</div>
        </div>

        {/* Booking Amount */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-2 border-b border-slate-100">
          <div className="text-slate-500 font-medium">Booking Amount</div>
          <div className="sm:col-span-2 font-extrabold text-slate-900">{formatBookingAmount()}</div>
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-2 border-b border-slate-100">
          <div className="text-slate-500 font-medium">Address</div>
          <div className="sm:col-span-2 font-bold text-slate-900 leading-snug">{fullAddress}</div>
        </div>

        {/* Landmarks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-2 border-b border-slate-100">
          <div className="text-slate-500 font-medium">Landmarks</div>
          <div className="sm:col-span-2 font-bold text-slate-900">
            Near to {property.locality?.name || property.city?.name || 'Main Sector Road'}.
          </div>
        </div>

        {/* Furnishing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-2 border-b border-slate-100">
          <div className="text-slate-500 font-medium">Furnishing</div>
          <div className="sm:col-span-2 space-y-2">
            <div className="font-extrabold text-slate-900 capitalize">
              {property.furnishing_status?.replace('-', ' ') || 'Semi-Furnished'}
            </div>
            <div className="inline-flex items-center gap-2 p-2.5 px-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold hover:bg-amber-100/80 transition-colors cursor-pointer">
              <span>Register for Home Interiors Expo to get furnishing ideas</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
            </div>
          </div>
        </div>

        {/* Flooring */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-2 border-b border-slate-100">
          <div className="text-slate-500 font-medium">Flooring</div>
          <div className="sm:col-span-2 font-extrabold text-slate-900">Vitrified / Italian Marble</div>
        </div>

        {/* Loan Offered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-2 border-b border-slate-100">
          <div className="text-slate-500 font-medium">Loan Offered</div>
          <div className="sm:col-span-2 space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
              <span>Estimated EMI: ₹{calculateEmi()}</span>
              <Info className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <a href="#inquiry-form" className="inline-block text-xs font-bold text-[#9333ea] underline hover:text-purple-700">
              Apply for Home Loan
            </a>
            {/* Bank Badges */}
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-[11px] font-black text-rose-900 shadow-2xs">
                AXIS BANK
              </span>
              <span className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-[11px] font-black text-blue-900 shadow-2xs">
                HDFC BANK
              </span>
              <span className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-[11px] font-black text-orange-800 shadow-2xs">
                ICICI Bank
              </span>
              <span className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-700">
                +3 More
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="pt-4 border-t border-slate-200/80 space-y-3">
        <div className="text-sm font-extrabold text-slate-900">
          Description: <span className="font-semibold text-slate-600">Property Details</span>
        </div>
        <div className={`text-sm text-slate-600 leading-relaxed whitespace-pre-line ${!readMore ? 'line-clamp-3' : ''}`}>
          {property.description}
        </div>
        {property.description && property.description.length > 150 && (
          <button
            onClick={() => setReadMore(!readMore)}
            className="text-xs font-bold text-[#9333ea] hover:underline cursor-pointer focus:outline-none"
          >
            {readMore ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Contact Owner Button */}
      <div className="pt-4">
        <button
          onClick={onContactClick || (() => {
            const formEl = document.getElementById('inquiry-form');
            if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
          })}
          className="py-3.5 px-8 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white font-black text-sm shadow-md shadow-purple-500/25 transition-all active:scale-[0.99] cursor-pointer"
        >
          Contact Owner
        </button>
      </div>
    </div>
  );
}
