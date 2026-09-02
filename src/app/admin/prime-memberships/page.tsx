'use client';

import React, { useState } from 'react';
import { Crown, Users, Sparkles, CheckCircle2, ShieldCheck, Search, Filter, Edit2, Plus, Trash2, X, AlertCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface PrimePlanConfig {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  discountBadge: string;
  limit: string;
  validity: string;
  isRecommended?: boolean;
}

interface PrimeSubscriber {
  id: number;
  userName: string;
  email: string;
  plan: string;
  listingsUsed: number;
  maxListings: string;
  price: string;
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Cancelled';
}

const initialPlans: PrimePlanConfig[] = [
  { id: 'free', name: 'Free', price: '₹ 0', originalPrice: '', discountBadge: 'Standard', limit: 'Max 2 Listings', validity: '1 Year' },
  { id: 'basic', name: 'Basic', price: '₹ 199', originalPrice: '₹ 398', discountBadge: '50% Off', limit: 'Max 10 Listings', validity: '1 Year' },
  { id: 'pro', name: 'Pro', price: '₹ 499', originalPrice: '₹ 998', discountBadge: '50% Off', limit: 'Unlimited Listings', validity: '1 Year', isRecommended: true },
];

const initialSubscribers: PrimeSubscriber[] = [
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
  const [plans, setPlans] = useState<PrimePlanConfig[]>(initialPlans);
  const [subscribers, setSubscribers] = useState<PrimeSubscriber[]>(initialSubscribers);
  const [search, setSearch] = useState('');
  const { success, error } = useToast();

  // Plan Edit / Create Modal State
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PrimePlanConfig | null>(null);
  const [planFormData, setPlanFormData] = useState<PrimePlanConfig>({
    id: '',
    name: '',
    price: '₹ 199',
    originalPrice: '₹ 398',
    discountBadge: '50% Off',
    limit: '10 Listings',
    validity: '1 Year',
    isRecommended: false,
  });

  const handleOpenPlanModal = (plan?: PrimePlanConfig) => {
    if (plan) {
      setEditingPlan(plan);
      setPlanFormData(plan);
    } else {
      setEditingPlan(null);
      setPlanFormData({
        id: `plan_${Date.now()}`,
        name: '',
        price: '₹ 299',
        originalPrice: '₹ 598',
        discountBadge: '50% Off',
        limit: '15 Listings',
        validity: '1 Year',
        isRecommended: false,
      });
    }
    setIsPlanModalOpen(true);
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planFormData.name) return;

    if (editingPlan) {
      setPlans((prev) => prev.map((p) => (p.id === editingPlan.id ? planFormData : p)));
      success(`Updated plan ${planFormData.name} successfully.`);
    } else {
      setPlans((prev) => [...prev, planFormData]);
      success(`Added new plan ${planFormData.name} successfully.`);
    }
    setIsPlanModalOpen(false);
  };

  const handleUpdateSubscriberPlan = (id: number, newPlanName: string) => {
    const targetPlan = plans.find((p) => p.name.toLowerCase() === newPlanName.toLowerCase()) || {
      name: newPlanName,
      price: '₹ 199',
      limit: '10 Listings',
    };

    setSubscribers((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              plan: targetPlan.name,
              price: targetPlan.price,
              maxListings: targetPlan.limit,
              status: 'Active',
            }
          : s
      )
    );
    success(`User subscription plan updated to ${newPlanName}.`);
  };

  const handleCancelSubscriber = (id: number) => {
    setSubscribers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Cancelled', plan: 'Cancelled' } : s))
    );
    error('Subscriber Prime Membership cancelled.');
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
          GetPlot Prime Membership & Plans CMS
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Manage pricing plans, listing limits, user subscriptions, and membership cancellations.
        </p>
      </div>

      {/* Plans Overview Cards with Admin Edit Button */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">Configured Membership Plans ({plans.length})</h2>
          <button
            onClick={() => handleOpenPlanModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Plan</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`p-6 rounded-3xl border shadow-xs space-y-3 relative ${
                p.isRecommended
                  ? 'bg-gradient-to-br from-[#2e1065] via-[#1e1035] to-[#0f0720] border-purple-500/30 text-white shadow-md'
                  : 'bg-white border-slate-200/80 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase ${p.isRecommended ? 'text-amber-400' : 'text-slate-400'}`}>
                  {p.name} Plan
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${p.isRecommended ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-slate-100 text-slate-700'}`}>
                  {p.discountBadge || p.validity}
                </span>
              </div>

              <div className="text-3xl font-black">
                {p.price} {p.originalPrice && <span className="text-xs font-medium text-slate-400 line-through">{p.originalPrice}</span>}
              </div>

              <div className={`text-xs font-semibold ${p.isRecommended ? 'text-purple-200' : 'text-slate-500'}`}>
                Limit: <span className="font-bold">{p.limit}</span> ({p.validity})
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleOpenPlanModal(p)}
                  className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    p.isRecommended
                      ? 'border-purple-400/30 bg-purple-900/40 text-purple-200 hover:bg-purple-800/40'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Plan Settings</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscriber Directory Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-black text-slate-900">Active Prime Subscribers Directory</h3>
            <p className="text-xs text-slate-500">Monitor active user plans, upgrade/downgrade, or cancel memberships</p>
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
                    <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      sub.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' : sub.plan === 'Pro' ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-cyan-100 text-cyan-900'
                    }`}>
                      {sub.plan}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">{sub.email} • Price: {sub.price}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="text-right">
                  <div className="font-bold text-slate-900">{sub.listingsUsed} Listings Used</div>
                  <div className="text-slate-500 text-[11px]">Limit: {sub.maxListings} (Valid till {sub.expiryDate})</div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={sub.plan}
                    onChange={(e) => handleUpdateSubscriberPlan(sub.id, e.target.value)}
                    className="p-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 outline-none bg-white focus:border-[#9333ea]"
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.name}>Change to {p.name}</option>
                    ))}
                  </select>

                  {sub.status !== 'Cancelled' && (
                    <button
                      onClick={() => handleCancelSubscriber(sub.id)}
                      className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                      title="Cancel Subscription"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PLAN EDIT / CREATE MODAL */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsPlanModalOpen(false)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full z-10 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">{editingPlan ? 'Edit Membership Plan' : 'Add New Membership Plan'}</h3>
              <button onClick={() => setIsPlanModalOpen(false)} className="text-slate-400 hover:text-slate-900">✕</button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Plan Name *</label>
                <input
                  type="text"
                  required
                  value={planFormData.name}
                  onChange={(e) => setPlanFormData({ ...planFormData, name: e.target.value })}
                  placeholder="e.g. Ultra Pro"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-[#9333ea]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price *</label>
                  <input
                    type="text"
                    required
                    value={planFormData.price}
                    onChange={(e) => setPlanFormData({ ...planFormData, price: e.target.value })}
                    placeholder="e.g. ₹ 499"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-[#9333ea]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original Price</label>
                  <input
                    type="text"
                    value={planFormData.originalPrice}
                    onChange={(e) => setPlanFormData({ ...planFormData, originalPrice: e.target.value })}
                    placeholder="e.g. ₹ 998"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-[#9333ea]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Listings Limit *</label>
                  <input
                    type="text"
                    required
                    value={planFormData.limit}
                    onChange={(e) => setPlanFormData({ ...planFormData, limit: e.target.value })}
                    placeholder="e.g. Unlimited Listings"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-[#9333ea]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Validity *</label>
                  <input
                    type="text"
                    required
                    value={planFormData.validity}
                    onChange={(e) => setPlanFormData({ ...planFormData, validity: e.target.value })}
                    placeholder="e.g. 1 Year"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-[#9333ea]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlanModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white font-bold shadow-md hover:opacity-95"
                >
                  Save Plan Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
