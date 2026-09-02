'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/api/admin';
import { Property } from '@/types/property';
import { useToast } from '@/context/ToastContext';
import {
  Building,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import PriceDisplay from '@/components/common/PriceDisplay';
import Pagination from '@/components/common/Pagination';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getProperties({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: search || undefined,
        page,
      });
      if (res.data) {
        setProperties(res.data);
        if (res.meta) {
          setTotal(res.meta.total || 0);
          setLastPage(res.meta.last_page || 1);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [statusFilter, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProperties();
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await adminApi.updatePropertyStatus(id, status);
      success(`Property status set to ${status}.`);
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: status as any } : p))
      );
    } catch (err: any) {
      error(err.message || 'Failed to update property status.');
    }
  };

  const handleToggleFeatured = async (id: number) => {
    try {
      const res = await adminApi.toggleFeatured(id);
      success(res.message || 'Featured status updated.');
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_featured: res.data?.is_featured ?? !p.is_featured } : p))
      );
    } catch (err: any) {
      error(err.message || 'Failed to toggle featured status.');
    }
  };

  const statusColors: Record<string, string> = {
    published: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    pending: 'bg-amber-50 text-amber-800 border-amber-200',
    rejected: 'bg-rose-50 text-rose-800 border-rose-200',
    draft: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Property Management & Moderation
        </h1>
        <p className="text-xs text-slate-500">
          Approve, reject, feature, and audit all properties submitted across the platform.
        </p>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'pending', 'published', 'rejected'].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search title, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#9333ea]"
          />
        </form>
      </div>

      {/* Properties Table */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400">Loading properties table...</div>
      ) : properties.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {properties.map((prop) => (
              <div key={prop.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start gap-4 min-w-0">
                  <img
                    src={prop.primary_image || (prop.images && prop.images[0]?.url) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80'}
                    alt={prop.title}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusColors[prop.status] || 'bg-slate-100'}`}>
                        {prop.status}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold uppercase">For {prop.listing_type}</span>
                      {prop.is_verified && (
                        <span className="text-[#9333ea] text-xs font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verified
                        </span>
                      )}
                      {prop.is_featured && (
                        <span className="text-amber-700 text-xs font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 truncate max-w-md">{prop.title}</h3>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2">
                      <span>{prop.city?.name}</span>
                      <span>•</span>
                      <PriceDisplay price={prop.price} monthlyRent={prop.monthly_rent} listingType={prop.listing_type} size="sm" />
                    </div>
                  </div>
                </div>

                {/* Moderation Controls */}
                <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => handleToggleFeatured(prop.id)}
                    className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                      prop.is_featured
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    title={prop.is_featured ? 'Remove featured' : 'Feature on homepage'}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  {prop.status !== 'published' && (
                    <button
                      onClick={() => handleUpdateStatus(prop.id, 'published')}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white text-xs font-bold shadow-xs transition-all"
                    >
                      Approve & Publish
                    </button>
                  )}

                  {prop.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(prop.id, 'rejected')}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors"
                    >
                      Reject
                    </button>
                  )}

                  <Link
                    href={`/property/${prop.slug}`}
                    className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold"
                    title="View public page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100 flex justify-center">
            <Pagination
              currentPage={page}
              lastPage={lastPage}
              onPageChange={setPage}
            />
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
          No properties found matching current filter criteria.
        </div>
      )}
    </div>
  );
}
