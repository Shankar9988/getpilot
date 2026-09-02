'use client';

import React, { useState } from 'react';
import { Crown, Users, Sparkles, CheckCircle2, ShieldCheck, Search, Filter, Edit, Plus } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface PrimeSubscriber {
  id: number;
  userName: string;
  email: string;
  plan: 'Free' | 'Basic' | 'Pro';
  listingsUsed: number;
  maxListings: string;
  price: string;
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired';
}

const mockSubscribers: PrimeSubscriber[] = [
  {
    id: 1,
    userName: 'Vikram Singh',
    email: 'vikram.singh@gmail.com',
    plan: 'Pro',
    listingsUsed: 14,
    maxListings: 'Unlimited',
    price: '₹ 499',
    startDate: '01/01/2026',
    expiryDate: '01/01/2027',
    status: 'Active',
  },
  {
    id: 2,
    userName: 'Sunita Rao',
    email: 'sunita.rao@outlook.com',
    plan: 'Basic',
    listingsUsed: 8,
    maxListings: '10 Listings',
    price: '₹ 199',
    startDate: '15/02/2026',
    expiryDate: '15/02/2027',
    status: 'Active',
  },
  {
    id: 3,
    userName: 'Amit Verma',
    email: 'amit.v@yahoo.com',
    plan: 'Free',
    listingsUsed: 2,
    maxListings: '2 Listings',
    price: '₹ 0',
    startDate: '10/08/2025',
    expiryDate: '10/08/2026',
    status: 'Active',
  },
];

export default function AdminPrimeMembershipsPage() {
  const [subscribers, setSubscribers] = useState<PrimeSubscriber[]>(mockSubscribers);
  const [search, setSearch] = useState('');
  const { success } = useToast();

  const handleUpdatePlan = (id: number, newPlan: 'Free' | 'Basic' | 'Pro') => {
    const limits = { Free: '2 Listings', Basic: '10 Listings', Pro: 'Unlimited' };
    const prices = { Free: '₹ 0', Basic: '₹ 199', Pro: '₹ 499' };

    setSubscribers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, plan: newPlan, maxListings: limits[newPlan], price: prices[newPlan] }
          : s
      )
    );
    success(`Updated user plan to ${newPlan}.`);
  };

  const filtered = subscribers.filter(
    (s) =>
      s.userName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-2 border border-purple-500/20">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Crown className="w-4 h-4 fill-amber-400" />
          <span>Prime Control Center</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          GetPlot Prime Memberships & Limits
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Manage Free (2 Listings), Basic ₹199 (10 Listings), and Pro ₹499 (Unlimited Listings) 1-year plans.
        </p>
      </div>

      {/* Plans Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">FREE PLAN</span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">1 Year Validity</span>
          </div>
          <div className="text-3xl font-black text-slate-900">₹ 0</div>
          <div className="text-xs text-slate-500 font-semibold">Limit: <span className="text-slate-900 font-bold">Max 2 Listings</span> per account</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-cyan-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-600 uppercase">BASIC PLAN</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-bold">50% OFF</span>
          </div>
          <div className="text-3xl font-black text-slate-900">₹ 199 <span className="text-xs font-medium text-slate-400 line-through">₹398</span></div>
          <div className="text-xs text-slate-500 font-semibold">Limit: <span className="text-cyan-700 font-bold">Max 10 Listings</span> per account</div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#2e1065] via-[#1e1035] to-[#0f0720] border border-purple-500/30 text-white shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 fill-amber-400" /> PRO PLAN
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">RECOMMENDED</span>
          </div>
          <div className="text-3xl font-black text-white">₹ 499 <span className="text-xs font-medium text-slate-400 line-through">₹998</span></div>
          <div className="text-xs text-purple-200 font-semibold">Limit: <span className="text-amber-400 font-bold">Unlimited Listings</span> per account</div>
        </div>
      </div>

      {/* Subscriber Directory Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-black text-slate-900">Active Prime Subscribers</h3>
            <p className="text-xs text-slate-500">Monitor active user plans and property listing allocations</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search subscriber name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#9333ea]"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.map((sub) => (
            <div key={sub.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 px-2 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-900 font-bold flex items-center justify-center text-sm">
                  {sub.userName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">{sub.userName}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      sub.plan === 'Pro' ? 'bg-amber-100 text-amber-900 border border-amber-200' : sub.plan === 'Basic' ? 'bg-cyan-100 text-cyan-900' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {sub.plan} Plan
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">{sub.email} • Price: {sub.price}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <div className="font-bold text-slate-900">{sub.listingsUsed} Listings Used</div>
                  <div className="text-slate-500 text-[11px]">Limit: {sub.maxListings} (Valid till {sub.expiryDate})</div>
                </div>

                <select
                  value={sub.plan}
                  onChange={(e) => handleUpdatePlan(sub.id, e.target.value as any)}
                  className="p-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 outline-none bg-white focus:border-[#9333ea]"
                >
                  <option value="Free">Set Free (2 Listings)</option>
                  <option value="Basic">Set Basic (10 Listings)</option>
                  <option value="Pro">Set Pro (Unlimited)</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
