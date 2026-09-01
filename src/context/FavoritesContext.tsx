'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { favoritesApi } from '@/lib/api/favorites';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface FavoritesContextType {
  favoriteIds: number[];
  toggleFavorite: (propertyId: number) => Promise<boolean>;
  isFavorited: (propertyId: number) => boolean;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const { user } = useAuth();
  const { toast, error } = useToast();

  const refreshFavorites = async () => {
    if (!user) {
      setFavoriteIds([]);
      return;
    }
    try {
      const res = await favoritesApi.getFavorites();
      if (res.data?.property_ids) {
        setFavoriteIds(res.data.property_ids);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    refreshFavorites();
  }, [user]);

  const toggleFavorite = async (propertyId: number): Promise<boolean> => {
    if (!user) {
      toast('Please login to save properties to your favorites.', 'info');
      return false;
    }

    try {
      const res = await favoritesApi.toggle(propertyId);
      if (res.data) {
        if (res.data.favorited) {
          setFavoriteIds((prev) => [...prev, propertyId]);
          toast('Property added to your saved favorites.', 'success');
        } else {
          setFavoriteIds((prev) => prev.filter((id) => id !== propertyId));
          toast('Property removed from favorites.', 'info');
        }
        return res.data.favorited;
      }
      return false;
    } catch (err: any) {
      error(err.message || 'Could not update favorites.');
      return false;
    }
  };

  const isFavorited = (propertyId: number) => favoriteIds.includes(propertyId);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorited, refreshFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
