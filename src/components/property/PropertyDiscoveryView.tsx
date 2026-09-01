'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Property, PropertyFilterParams } from '@/types/property';
import { propertiesApi } from '@/lib/api/properties';
import PropertyCard from '@/components/property/PropertyCard';
import SearchFilters from '@/components/search/SearchFilters';
import FilterDrawer from '@/components/search/FilterDrawer';
import SortDropdown from '@/components/search/SortDropdown';
import Pagination from '@/components/common/Pagination';
import EmptyState from '@/components/common/EmptyState';
import { PropertyCardSkeleton } from '@/components/common/LoadingSpinner';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { SlidersHorizontal, Search } from 'lucide-react';

interface PropertyDiscoveryViewProps {
  title: string;
  subtitle: string;
  listingType: 'sale' | 'rent' | 'commercial';
  breadcrumbLabel: string;
}

export default function PropertyDiscoveryView({
  title,
  subtitle,
  listingType,
  breadcrumbLabel,
}: PropertyDiscoveryViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Initialize filters from query params
  const [filters, setFilters] = useState<PropertyFilterParams>({
    listing_type: listingType,
    search: searchParams.get('search') || undefined,
    city: searchParams.get('city') || undefined,
    locality: searchParams.get('locality') || undefined,
    property_type: searchParams.get('property_type') || undefined,
    min_price: searchParams.get('min_price') || undefined,
    max_price: searchParams.get('max_price') || undefined,
    bedrooms: searchParams.get('bedrooms') || undefined,
    furnishing: searchParams.get('furnishing') || undefined,
    amenities: searchParams.get('amenities') || undefined,
    verified: searchParams.get('verified') === 'true' ? true : undefined,
    sort: (searchParams.get('sort') as any) || 'relevance',
    page: Number(searchParams.get('page')) || 1,
  });

  const fetchProperties = async (currentFilters: PropertyFilterParams) => {
    setLoading(true);
    try {
      const res = await propertiesApi.getAll({
        ...currentFilters,
        listing_type: listingType,
      });

      if (res.data) {
        setProperties(res.data);
        if (res.meta) {
          setTotal(res.meta.total || 0);
          setCurrentPage(res.meta.current_page || 1);
          setLastPage(res.meta.last_page || 1);
        }
      }
    } catch {
      setProperties([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(filters);
  }, [filters, listingType]);

  const handleFilterChange = (newFilters: PropertyFilterParams) => {
    setFilters(newFilters);

    // Update URL without page reload
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '' && v !== 'all') {
        params.append(k, String(v));
      }
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (newSort: any) => {
    handleFilterChange({ ...filters, sort: newSort });
  };

  const handlePageChange = (page: number) => {
    handleFilterChange({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: breadcrumbLabel }]} />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{title}</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">{subtitle}</p>
        </div>

        {/* Search Input in Banner */}
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search address, locality, project..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange({ ...filters, search: e.target.value || undefined, page: 1 })}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Main Grid: Sidebar Filters & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28">
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              listingType={listingType}
            />
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Bar: Property Count, Mobile Filter Button, Sort Dropdown */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <div className="text-xs font-semibold text-slate-600">
                Showing <span className="font-extrabold text-slate-900">{total}</span> verified properties
              </div>
            </div>

            <SortDropdown
              value={filters.sort || 'relevance'}
              onChange={handleSortChange}
            />
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <EmptyState
              icon="search"
              title="No properties match your filters"
              description="Try adjusting your budget, removing specific BHK requirements, or selecting a broader location."
              actionText="Reset All Filters"
              onActionClick={() =>
                handleFilterChange({
                  listing_type: listingType,
                  sort: 'relevance',
                  page: 1,
                })
              }
            />
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <FilterDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        listingType={listingType}
      />
    </div>
  );
}
