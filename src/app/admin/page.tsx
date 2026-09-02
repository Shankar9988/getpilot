'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/api/admin';
import {
  Building,
  ShieldCheck,
  Clock,
  Users,
  MessageSquare,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Crown,
  TrendingUp,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import PriceDisplay from '@/components/common/PriceDisplay';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboard().then((res) => {
      if (res.data) setData(res.data);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const stats = data?.stats || {};

  const statCards = [
    { label: 'Total Listed Properties', value: stats.total_properties || 18, icon: Building, color: 'from-[#7c3aed] to-[#c026d3]', growth: '+14% this month' },
    { label: 'Verified Properties', value: stats.verified_properties || 14, icon: ShieldCheck, color: 'from-emerald-500 to-teal-600', growth: '82% verified rate' },
    { label: 'Pending Audits Queue', value: stats.pending_properties || 3, icon: Clock, color: 'from-amber-500 to-orange-600', growth: 'Action required' },
    { label: 'Active Prime Members', value: 12, icon: Crown, color: 'from-amber-400 to-amber-600', growth: '👑 Gold Badge' },
    { label: 'Registered Users & Agents', value: stats.total_users || 45, icon: Users, color: 'from-[#7c3aed] to-[#a855f7]', growth: 'Active ecosystem' },
    { label: 'Total Buyer Inquiries', value: stats.total_inquiries || 28, icon: MessageSquare, color: 'from-sky-500 to-purple-600', growth: 'High engagement' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Superadmin Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#2e1065] via-[#1e1035] to-[#0f0720] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-purple-500/30 space-y-6">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white text-xs font-black uppercase tracking-wider shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Superadmin Control Desk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              GetPlot Platform Overview & Audit Command Center
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-medium">
              Manage property verification queues, review seller title deeds, monitor agent subscriptions, and customize website hero sliders.
            </p>
          </div>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
            <Link
              href="/admin/property-verification"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white text-xs font-extrabold shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Property Audits ({stats.pending_properties || 3} Pending)</span>
            </Link>

            <Link
              href="/admin/prime-memberships"
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Crown className="w-4 h-4 fill-amber-950 text-amber-950" />
              <span>Prime Plan CMS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modern KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all space-y-3 group"
            >
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${c.color} text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-black text-slate-900">{c.value}</div>
                <div className="text-xs font-extrabold text-slate-800 leading-tight">{c.label}</div>
                <div className="text-[10px] font-bold text-slate-400 pt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-purple-600" />
                  <span>{c.growth}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Admin Workstation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Property Submissions Queue (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Recent Property Submissions</h2>
              <p className="text-xs text-slate-500">Live listings pending verification or recently approved</p>
            </div>
            <Link
              href="/admin/properties"
              className="text-xs font-bold text-[#9333ea] hover:underline flex items-center gap-1"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {(data?.recent_properties || []).length > 0 ? (
              data.recent_properties.map((prop: any) => (
                <div
                  key={prop.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={prop.primary_image || (prop.images && prop.images[0]?.url) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80'}
                      alt={prop.title}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase border ${
                          prop.status === 'published'
                            ? 'bg-purple-50 text-purple-900 border-purple-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {prop.status}
                        </span>
                        <span className="text-[11px] text-slate-400 font-semibold">For {prop.listing_type}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{prop.title}</h4>
                      <div className="text-xs text-slate-500">
                        {prop.city?.name} • <PriceDisplay price={prop.price} monthlyRent={prop.monthly_rent} listingType={prop.listing_type} size="sm" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <Link
                      href={`/property/${prop.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#9333ea] text-xs font-bold shadow-2xs flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Live</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
                No recent property listings found.
              </div>
            )}
          </div>
        </div>

        {/* Verification & Quick Control Sidebar (1 col) */}
        <div className="space-y-6">
          {/* Verification Audit Desk Box */}
          <div className="bg-gradient-to-br from-[#2e1065] via-[#1e1035] to-[#0f0720] text-white rounded-3xl p-6 border border-purple-500/30 shadow-xl space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Verification Audit Desk</span>
              </div>
              <h3 className="text-lg font-black text-white">4-Step Verification Desk</h3>
              <p className="text-xs text-purple-200/80 leading-relaxed font-medium">
                Verify title deeds, owner identity, physical site photos, and floor plans to issue the official <strong>Estatify Verified Listing</strong> badge.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/20 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-bold text-amber-300">
                <span>Pending Review Queue</span>
                <span>{stats.pending_properties || 3} Properties</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#7c3aed] to-[#c026d3] h-full rounded-full w-[70%]" />
              </div>
            </div>

            <Link
              href="/admin/property-verification"
              className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white text-xs font-black shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Review Verification Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Prime Subscriptions CMS Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>Prime Memberships CMS</span>
              </div>
              <span className="text-[10px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                3 Plans
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Create, edit, or adjust pricing plans (Free ₹0, Basic ₹199, Pro ₹499) and manage active subscriber accounts.
            </p>
            <Link
              href="/admin/prime-memberships"
              className="w-full py-2.5 px-4 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-[#9333ea] text-xs font-black shadow-2xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Manage Prime Plans & Users</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
