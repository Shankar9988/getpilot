'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { propertiesApi } from '@/lib/api/properties';
import { inquiriesApi } from '@/lib/api/inquiries';
import { favoritesApi } from '@/lib/api/favorites';
import { Property } from '@/types/property';
import { Inquiry } from '@/types/inquiry';
import {
  Home,
  CheckCircle2,
  Clock,
  Heart,
  MessageSquareText,
  PlusCircle,
  ArrowRight,
  Eye,
  ExternalLink
} from 'lucide-react';
import PriceDisplay from '@/components/common/PriceDisplay';

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [favCount, setFavCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      propertiesApi.getMyProperties().catch(() => ({ data: [] })),
      inquiriesApi.getReceivedInquiries().catch(() => ({ data: [] })),
      favoritesApi.getFavorites().catch(() => ({ data: { favorites: [], property_ids: [] } })),
    ]).then(([propRes, inqRes, favRes]) => {
      if (propRes.data) setProperties(propRes.data);
      if (inqRes.data) setInquiries(inqRes.data);
      if (favRes.data?.property_ids) setFavCount(favRes.data.property_ids.length);
      setLoading(false);
    });
  }, []);

  const totalProps = properties.length;
  const publishedProps = properties.filter((p) => p.status === 'published').length;
  const pendingProps = properties.filter((p) => p.status === 'pending').length;

  const metrics = [
    { label: 'Total Listings', value: totalProps, icon: Home, color: 'text-slate-900', bg: 'bg-slate-100' },
    { label: 'Published & Live', value: publishedProps, icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'Pending Review', value: pendingProps, icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Inquiries Received', value: inquiries.length, icon: MessageSquareText, color: 'text-sky-700', bg: 'bg-sky-50' },
    { label: 'Saved Favorites', value: favCount, icon: Heart, color: 'text-rose-700', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            Account Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Manage your verified real estate listings, track buyer inquiries, and update your profile.
          </p>
        </div>

        <Link
          href="/post-property"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/40 transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Property</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3"
            >
              <div className={`w-10 h-10 rounded-xl ${m.bg} ${m.color} flex items-center justify-center font-bold`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">{m.value}</div>
                <div className="text-[11px] font-semibold text-slate-500 leading-tight">{m.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Properties Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">Your Listed Properties</h2>
            <p className="text-xs text-slate-500">Recently listed properties and their verification status.</p>
          </div>
          <Link
            href="/dashboard/properties"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {properties.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {properties.slice(0, 5).map((prop) => {
              const statusColors: Record<string, string> = {
                published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                pending: 'bg-amber-50 text-amber-700 border-amber-200',
                rejected: 'bg-rose-50 text-rose-700 border-rose-200',
                draft: 'bg-slate-100 text-slate-700 border-slate-200',
              };

              return (
                <div key={prop.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={prop.primary_image || (prop.images && prop.images[0]?.url) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80'}
                      alt={prop.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${statusColors[prop.status] || 'bg-slate-100 text-slate-700'}`}>
                          {prop.status}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">For {prop.listing_type}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">{prop.title}</h4>
                      <div className="text-xs text-slate-500">
                        {prop.city?.name} • <PriceDisplay price={prop.price} monthlyRent={prop.monthly_rent} listingType={prop.listing_type} size="sm" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Link
                      href={`/property/${prop.slug}`}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 space-y-3">
            <Home className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No properties listed yet</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Post your first property to start receiving verified buyer and tenant inquiries.
            </p>
            <Link
              href="/post-property"
              className="inline-block px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-emerald-600 transition-colors"
            >
              Post Free Listing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
