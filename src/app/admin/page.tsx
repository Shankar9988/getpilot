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
  ExternalLink
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
    { label: 'Total Listed Properties', value: stats.total_properties || 0, icon: Building, color: 'text-slate-900', bg: 'bg-slate-100' },
    { label: 'Verified Properties', value: stats.verified_properties || 0, icon: ShieldCheck, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'Pending Verification Review', value: stats.pending_properties || 0, icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Registered Users & Agents', value: stats.total_users || 0, icon: Users, color: 'text-sky-700', bg: 'bg-sky-50' },
    { label: 'Total Inquiries Generated', value: stats.total_inquiries || 0, icon: MessageSquare, color: 'text-purple-700', bg: 'bg-purple-50' },
    { label: 'Published Blogs & CMS', value: stats.total_blogs || 0, icon: FileText, color: 'text-rose-700', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-2">
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
          Superadmin Control Center
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Platform Overview & Verification Metrics
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Moderate pending property submissions, audit title reviews, and manage platform users.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.color} flex items-center justify-center font-bold`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">{c.value}</div>
                <div className="text-xs font-semibold text-slate-500">{c.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Recent Property Listings</h2>
            <Link href="/admin/properties" className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {(data?.recent_properties || []).map((prop: any) => (
              <div key={prop.id} className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{prop.title}</div>
                  <div className="text-[11px] text-slate-500">{prop.city?.name} • For {prop.listing_type}</div>
                </div>
                <Link
                  href={`/property/${prop.slug}`}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Alert Callout */}
        <div className="bg-emerald-950 text-emerald-100 rounded-3xl p-6 border border-emerald-800 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Verification Desk</span>
            </div>
            <h3 className="text-lg font-bold text-white">Pending Audits Queue</h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Ensure all submissions meet Estatify&apos;s rigorous 4-step trust standard: physical site verification, owner identity, sanctioned floor plan, and clear encumbrance checks.
            </p>
          </div>

          <Link
            href="/admin/property-verification"
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition-colors shadow-md"
          >
            <span>Open Verification Queue ({stats.pending_properties || 0} Pending)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
