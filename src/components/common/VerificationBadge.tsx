'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface VerificationBadgeProps {
  type?: 'property' | 'owner' | 'location' | 'legal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function VerificationBadge({
  type = 'property',
  size = 'md',
  className = '',
}: VerificationBadgeProps) {
  const configs = {
    property: {
      text: 'Verified Listing',
      icon: ShieldCheck,
      classes: 'bg-emerald-600/90 text-white border-emerald-500/40 shadow-sm shadow-emerald-950/20',
    },
    owner: {
      text: 'Owner Verified',
      icon: CheckCircle2,
      classes: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    location: {
      text: 'Location Checked',
      icon: CheckCircle2,
      classes: 'bg-sky-50 text-sky-800 border-sky-200',
    },
    legal: {
      text: 'Title Clear',
      icon: ShieldCheck,
      classes: 'bg-amber-50 text-amber-800 border-amber-200',
    },
  };

  const current = configs[type];
  const Icon = current.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border backdrop-blur-md transition-all ${current.classes} ${sizeClasses[size]} ${className}`}
    >
      <Icon className={`${iconSizes[size]} shrink-0`} />
      <span>{current.text}</span>
    </div>
  );
}
