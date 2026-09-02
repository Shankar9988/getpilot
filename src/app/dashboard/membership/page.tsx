'use client';

import React from 'react';
import Link from 'next/link';
import { Crown, Clock, Calendar, CheckCircle2, ShieldCheck, Download, ArrowRight, Sparkles, CreditCard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface HistoryItem {
  id: string;
  planName: string;
  amount: string;
  paymentMethod: string;
  date: string;
  status: 'Successful' | 'Pending';
  expiryDate: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: 'TXN-984210',
    planName: 'Pro Prime Plan',
    amount: '₹ 499.00',
    paymentMethod: 'Razorpay UPI (GPay)',
    date: '01 Jan 2026, 10:30 AM',
    status: 'Successful',
    expiryDate: '01 Jan 2027',
  },
  {
    id: 'TXN-541209',
    planName: 'Basic Prime Plan',
    amount: '₹ 199.00',
    paymentMethod: 'Credit Card (HDFC)',
    date: '15 Feb 2025, 02:15 PM',
    status: 'Successful',
    expiryDate: '15 Feb 2026',
  },
];

export default function UserMembershipHistoryPage() {
  const { user } = useAuth();
  const currentPlanName = user?.prime_plan || 'Pro';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-2 border border-purple-500/20">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Crown className="w-4 h-4 fill-amber-400" />
          <span>My Membership & Subscriptions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Active Plan & Payment History
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          View your currently active GetPlot Prime plan, validity dates, remaining days, and invoice receipt history.
        </p>
      </div>

      {/* Active Plan Details Card */}
      <div className="bg-gradient-to-br from-[#2e1065] via-[#1e1035] to-[#0f0720] rounded-3xl p-6 sm:p-8 border border-purple-500/30 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-6">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold border border-amber-400/30">
              CURRENTLY ACTIVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2 pt-1">
              <Crown className="w-7 h-7 text-amber-400 fill-amber-400" />
              <span>{currentPlanName} Prime Plan</span>
            </h2>
            <p className="text-xs text-purple-200/80">
              Enjoy Unlimited Property Listings, Direct Owner Contacts, and Top Search Placement.
            </p>
          </div>

          <Link
            href="/prime"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c026d3] hover:opacity-95 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all shrink-0"
          >
            <span>Upgrade / Renew Plan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Plan Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 space-y-1">
            <div className="text-slate-400 font-semibold">Plan Cost</div>
            <div className="text-xl font-black text-white">₹ 499 / Year</div>
            <div className="text-[11px] text-amber-300 font-bold">50% Off Applied</div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 space-y-1">
            <div className="text-slate-400 font-semibold">Validity Period</div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5 pt-0.5">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>01/01/2026 - 01/01/2027</span>
            </div>
            <div className="text-[11px] text-purple-300 font-semibold">1 Year Full Membership</div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 space-y-1">
            <div className="text-slate-400 font-semibold">Status & Remaining</div>
            <div className="text-sm font-black text-amber-300 flex items-center gap-1.5 pt-0.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>304 Days Remaining</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active & Verified
            </div>
          </div>
        </div>
      </div>

      {/* Plan Subscription & Payment History Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-black text-slate-900">Payment & Transaction History</h3>
          <p className="text-xs text-slate-500">Receipts and invoice records of your Prime Membership orders</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-black">
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-3">Plan Name</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Payment Method</th>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{item.id}</td>
                  <td className="py-3.5 px-3 font-extrabold text-slate-900 flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span>{item.planName}</span>
                  </td>
                  <td className="py-3.5 px-3 font-black text-slate-900">{item.amount}</td>
                  <td className="py-3.5 px-3 font-medium text-slate-600">{item.paymentMethod}</td>
                  <td className="py-3.5 px-3 text-slate-500">{item.date}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => alert(`Downloading Invoice Receipt ${item.id}`)}
                      className="inline-flex items-center gap-1 text-[#9333ea] hover:underline font-bold text-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Receipt PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
