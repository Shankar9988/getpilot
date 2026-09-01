'use client';

import React from 'react';
import Link from 'next/link';
import { SearchX, Heart, Home, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  icon?: 'search' | 'favorite' | 'property' | 'inquiry';
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export default function EmptyState({
  icon = 'search',
  title,
  description,
  actionText,
  actionHref,
  onActionClick,
}: EmptyStateProps) {
  const icons = {
    search: SearchX,
    favorite: Heart,
    property: Home,
    inquiry: AlertCircle,
  };

  const Icon = icons[icon] || SearchX;

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-lg mx-auto my-6">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-5">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionText && (
        actionHref ? (
          <Link
            href={actionHref}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-xs"
          >
            {actionText}
          </Link>
        ) : (
          <button
            onClick={onActionClick}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-xs"
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
}
