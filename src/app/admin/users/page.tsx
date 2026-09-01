'use client';

import React, { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api/admin';
import { User } from '@/types/user';
import { useToast } from '@/context/ToastContext';
import { Users, ShieldCheck, Search, CheckCircle2, Ban } from 'lucide-react';
import Pagination from '@/components/common/Pagination';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers({
        role: roleFilter !== 'all' ? roleFilter : undefined,
        search: search || undefined,
        page,
      });
      if (res.data) {
        setUsers(res.data);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          User Directory & Roles ({total})
        </h1>
        <p className="text-xs text-slate-500">
          Manage buyers, property owners, and certified RERA real estate brokers.
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
                  ? 'bg-slate-900 text-white shadow-xs'
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
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-emerald-500"
          />
        </form>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400">Loading user directory...</div>
      ) : users.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {users.map((u) => (
              <div key={u.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm shrink-0 overflow-hidden">
                    {u.avatar ? (
                      <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                    ) : (
                      u.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{u.name}</h4>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
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
                      <div className="text-[11px] font-semibold text-emerald-700">{u.company_name}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleToggleStatus(u.id, u.status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      u.status === 'active'
                        ? 'border border-rose-200 text-rose-700 hover:bg-rose-50'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {u.status === 'active' ? 'Suspend Account' : 'Activate Account'}
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
    </div>
  );
}
