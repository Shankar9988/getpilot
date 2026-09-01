'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { favoritesApi } from '@/lib/api/favorites';
import { Property } from '@/types/property';
import PropertyCard from '@/components/property/PropertyCard';
import EmptyState from '@/components/common/EmptyState';
import { PropertyCardSkeleton } from '@/components/common/LoadingSpinner';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    favoritesApi.getFavorites().then((res) => {
      if (res.data?.favorites) {
        setFavorites(res.data.favorites);
      }
    }).catch(() => {
      setFavorites([]);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Saved Properties ({favorites.length})
          </h1>
          <p className="text-xs text-slate-500">
            Your shortlisted residences and workspaces saved for easy comparison.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="favorite"
          title="Your favorites list is empty"
          description="Click the heart icon on any property card while browsing to save homes you love here."
          actionText="Browse Properties"
          actionHref="/buy"
        />
      )}
    </div>
  );
}
