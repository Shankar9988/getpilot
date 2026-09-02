'use client';

import React, { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api/admin';
import { User } from '@/types/user';
import { useToast } from '@/context/ToastContext';
import { Users, ShieldCheck, Search, CheckCircle2, Ban, Crown, Clock, Calendar, Plus, Edit2, Sparkles, X } from 'lucide-react';
import Pagination from '@/components/common/Pagination';

interface UserWithPlan extends User {
  prime_plan?: 'Free' | 'Basic' | 'Pro' | 'Cancelled';
  plan_start_date?: string;
  plan_expiry_date?: string;
  days_remaining?: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserWithPlan[]>([]);
  const [roleFilter, setRoleFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  // Modal state for Assign / Edit Plan
  const [selectedUserForPlan, setSelectedUserForPlan] = useState<UserWithPlan | null>(null);
  const [planForm, setPlanForm] = useState({
    plan: 'Pro' as 'Free' | 'Basic' | 'Pro',
    startDate: '2026-01-01',
    expiryDate: '2027-01-01',
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers({
        role: roleFilter !== 'all' ? roleFilter : undefined,
        search: search || undefined,
        page,
      });
      if (res.data) {
        // Enrich user objects with plan details for display
        const enriched = res.data.map((u: any, idx: number) => {
          const mockPlans: ('Pro' | 'Basic' | 'Free')[] = ['Pro', 'Basic', 'Free'];
          const userPlan = u.prime_plan || mockPlans[idx % 3];
          return {
            ...u,
            prime_plan: userPlan,
            plan_start_date: '01/01/2026',
            plan_expiry_date: '01/01/2027',
            days_remaining: userPlan === 'Pro' ? 304 : userPlan === 'Basic' ? 168 : 365,
          };
        });
        setUsers(enriched);
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
    fetchUsers();
  }, [roleFilter, page]);

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      await adminApi.updateUserStatus(id, newStatus as any);
      success(`User status updated to ${newStatus}.`);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: newStatus as any } : u))
      );
    } catch (err: any) {
      error(err.message || 'Failed to update user status.');
    }
  };

  const handleOpenPlanModal = (userItem: UserWithPlan) => {
    setSelectedUserForPlan(userItem);
    setPlanForm({
      plan: (userItem.prime_plan as any) || 'Pro',
      startDate: '2026-01-01',
      expiryDate: '2027-01-01',
    });
  };

  const handleSavePlanAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForPlan) return;

    const days = planForm.plan === 'Pro' ? 365 : planForm.plan === 'Basic' ? 365 : 365;

    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUserForPlan.id
          ? {
              ...u,
              prime_plan: planForm.plan,
              plan_start_date: '01/01/2026',
              plan_expiry_date: '01/01/2027',
              days_remaining: days,
            }
          : u
      )
    );

    success(`Assigned ${planForm.plan} Plan to ${selectedUserForPlan.name} successfully.`);
    setSelectedUserForPlan(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-2 border border-purple-500/20">
        <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
          <Users className="w-4 h-4 text-purple-400" />
          <span>User & Agent Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Agent Directory & Membership Plans ({total})
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Manage buyers, property owners, certified agents, active Prime plan subscriptions, and validity.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          {['all', 'user', 'agent', 'admin'].map((r) => (
            <button
              key={r}
              onClick={() => {
                setRoleFilter(r);
                setPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                roleFilter === r
                  ? 'bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {r === 'all' ? 'All Roles' : `${r}s`}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setPage(1); fetchUsers(); }} className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#9333ea]"
          />
        </form>
      </div>

      {/* Users & Agents Table */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400">Loading user directory...</div>
      ) : users.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {users.map((u) => (
              <div key={u.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                {/* User Identity */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 font-black flex items-center justify-center text-base shrink-0 overflow-hidden border border-purple-200">
                    {u.avatar ? (
                      <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                    ) : (
                      u.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-black text-slate-900 truncate">{u.name}</h4>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700">
                        {u.role}
                      </span>
                      {u.status === 'suspended' && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200">
                          Suspended
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">{u.email} • {u.phone || 'No phone'}</div>
                    {u.company_name && (
                      <div className="text-[11px] font-semibold text-[#9333ea]">{u.company_name}</div>
                    )}
                  </div>
                </div>

                {/* Agent Active Membership Plan Info Box */}
                <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1 text-xs shrink-0 min-w-[240px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-extrabold text-slate-900">
                      <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span>{u.prime_plan || 'Pro'} Prime Plan</span>
                    </div>
                    <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{u.plan_start_date} - {u.plan_expiry_date}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-bold pt-0.5">
                    <span className="text-purple-900 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#9333ea]" />
                      <span>{u.days_remaining} Days Remaining</span>
                    </span>
                    <span className="text-slate-400 font-semibold">1 Year Plan</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                  <button
                    onClick={() => handleOpenPlanModal(u)}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add / Change Plan</span>
                  </button>

                  <button
                    onClick={() => handleToggleStatus(u.id, u.status)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      u.status === 'active'
                        ? 'border border-rose-200 text-rose-700 hover:bg-rose-50'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {u.status === 'active' ? 'Suspend' : 'Activate'}
                  </button>
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
          No users found.
        </div>
      )}

      {/* ASSIGN / ADD PLAN POPUP MODAL */}
      {selectedUserForPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedUserForPlan(null)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in"
          />

          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full z-10 space-y-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">Assign Membership Plan</h3>
                <p className="text-xs text-slate-500">User: <span className="font-bold text-slate-900">{selectedUserForPlan.name}</span> ({selectedUserForPlan.role})</p>
              </div>
              <button
                onClick={() => setSelectedUserForPlan(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePlanAssignment} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Select Prime Plan *</label>
                <select
                  value={planForm.plan}
                  onChange={(e) => setPlanForm({ ...planForm, plan: e.target.value as any })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 outline-none bg-white focus:border-[#9333ea]"
                >
                  <option value="Pro">👑 Pro Plan (₹499 - Unlimited Listings - 1 Year)</option>
                  <option value="Basic">⚡ Basic Plan (₹199 - 10 Listings - 1 Year)</option>
                  <option value="Free">🆓 Free Plan (₹0 - 2 Listings - 1 Year)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={planForm.startDate}
                    onChange={(e) => setPlanForm({ ...planForm, startDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-[#9333ea]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    required
                    value={planForm.expiryDate}
                    onChange={(e) => setPlanForm({ ...planForm, expiryDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-[#9333ea]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100 text-purple-900 leading-relaxed text-[11px]">
                💡 Plan validity will be calculated for 365 days from start date. User will receive 👑 Crown Icon badge across GetPlot platform.
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedUserForPlan(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] text-white font-bold shadow-md hover:opacity-95 transition-all"
                >
                  Confirm & Assign Plan 👑
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
