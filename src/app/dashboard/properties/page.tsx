'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { propertiesApi } from '@/lib/api/properties';
import { Property } from '@/types/property';
import { useToast } from '@/context/ToastContext';
import { PlusCircle, Eye, Trash2, Edit3, ExternalLink, ShieldCheck, Home } from 'lucide-react';
import PriceDisplay from '@/components/common/PriceDisplay';

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  const fetchProperties = async (status: string) => {
    setLoading(true);
    try {
      const res = await propertiesApi.getMyProperties(status);
      if (res.data) {
        setProperties(res.data);
      }
    } catch {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(activeTab);
  }, [activeTab]);

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete '${title}'?`)) return;
    try {
      await propertiesApi.delete(id);
      success('Property deleted successfully.');
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      error(err.message || 'Failed to delete property.');
    }
  };

  const tabs = [
    { id: 'all', label: 'All Listings' },
    { id: 'published', label: 'Published & Live' },
    { id: 'pending', label: 'Pending Verification' },
    { id: 'draft', label: 'Drafts' },
    { id: 'sold', label: 'Sold' },
    { id: 'rented', label: 'Rented' },
  ];

  const statusColors: Record<string, string> = {
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    rejected: 'bg-rose-50 text-rose-700 border-rose-200',
    draft: 'bg-slate-100 text-slate-700 border-slate-200',
    sold: 'bg-purple-50 text-purple-700 border-purple-200',
    rented: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            My Listed Properties
          </h1>
          <p className="text-xs text-slate-500">
            Track verification audits, edit property information, and manage listing statuses.
          </p>
        </div>

        <Link
          href="/post-property"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>Post New Property</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === t.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400">Loading listings...</div>
      ) : properties.length > 0 ? (
        <div className="space-y-3">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                <img
                  src={prop.primary_image || (prop.images && prop.images[0]?.url) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80'}
                  alt={prop.title}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusColors[prop.status] || 'bg-slate-100 text-slate-700'}`}>
                      {prop.status}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold uppercase">For {prop.listing_type}</span>
                    {prop.is_verified && (
                      <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 truncate max-w-lg">{prop.title}</h3>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>{prop.address}, {prop.city?.name}</span>
                    <span>•</span>
                    <PriceDisplay price={prop.price} monthlyRent={prop.monthly_rent} listingType={prop.listing_type} size="sm" />
                    <span>•</span>
                    <span>{prop.area} {prop.area_unit}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end md:self-center">
                <Link
                  href={`/property/${prop.slug}`}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </Link>
                <button
                  onClick={() => handleDelete(prop.id, prop.title)}
                  className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
          <Home className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No properties in this category</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You don&apos;t have any properties with status &lsquo;{activeTab}&rsquo;.
          </p>
          <Link
            href="/post-property"
            className="inline-block px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-emerald-600 transition-colors"
          >
            Post Property
          </Link>
        </div>
      )}
    </div>
  );
}
