'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { inquiriesApi } from '@/lib/api/inquiries';
import { Inquiry } from '@/types/inquiry';
import { useToast } from '@/context/ToastContext';
import { MessageSquareText, Phone, Mail, Clock, CheckCircle2, User, ExternalLink } from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';

export default function InquiriesPage() {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
  const [receivedInquiries, setReceivedInquiries] = useState<Inquiry[]>([]);
  const [sentInquiries, setSentInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const [recRes, sentRes] = await Promise.all([
        inquiriesApi.getReceivedInquiries().catch(() => ({ data: [] })),
        inquiriesApi.getSentInquiries().catch(() => ({ data: [] })),
      ]);
      if (recRes.data) setReceivedInquiries(recRes.data);
      if (sentRes.data) setSentInquiries(sentRes.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: number, status: 'new' | 'contacted' | 'closed') => {
    try {
      await inquiriesApi.updateStatus(id, status);
      success(`Inquiry marked as ${status}.`);
      setReceivedInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
      );
    } catch (err: any) {
      error(err.message || 'Failed to update inquiry status.');
    }
  };

  const list = activeTab === 'received' ? receivedInquiries : sentInquiries;

  const statusTags = {
    new: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    contacted: 'bg-sky-50 text-sky-800 border-sky-200',
    closed: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Inquiries & Direct Leads
        </h1>
        <p className="text-xs text-slate-500">
          Manage buyer contact requests and follow-ups on your listed properties.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('received')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'received'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Received Buyer Leads ({receivedInquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'sent'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Inquiries Sent by You ({sentInquiries.length})
        </button>
      </div>

      {/* Inquiries Feed */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400">Loading inquiries...</div>
      ) : list.length > 0 ? (
        <div className="space-y-4">
          {list.map((inq) => (
            <div
              key={inq.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{inq.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(inq.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase border ${statusTags[inq.status] || 'bg-slate-100'}`}>
                    {inq.status}
                  </span>

                  {activeTab === 'received' && (
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                      className="text-xs font-semibold p-1.5 rounded-xl border border-slate-200 bg-slate-50 outline-none"
                    >
                      <option value="new">Mark New</option>
                      <option value="contacted">Mark Contacted</option>
                      <option value="closed">Mark Closed</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Property Inquired */}
              {inq.property && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                  <div className="truncate">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Property Inquired</div>
                    <div className="text-xs font-bold text-slate-900 truncate">{inq.property.title}</div>
                    <div className="text-[11px] text-slate-500">{inq.property.city} • {inq.property.locality}</div>
                  </div>
                  <Link
                    href={`/property/${inq.property.slug}`}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-semibold flex items-center gap-1 shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">View Property</span>
                  </Link>
                </div>
              )}

              {/* Message */}
              <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 text-xs text-slate-700 leading-relaxed italic">
                &ldquo;{inq.message}&rdquo;
              </div>

              {/* Contact Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${inq.phone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {inq.phone}</span>
                </a>
                <a
                  href={`mailto:${inq.email}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email {inq.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="inquiry"
          title={activeTab === 'received' ? 'No inquiries received yet' : 'You have not sent any inquiries'}
          description={
            activeTab === 'received'
              ? 'When buyers or tenants submit inquiries on your verified listings, they will appear here.'
              : 'Browse verified listings and click "Contact Seller" to inquire directly.'
          }
          actionText="Browse Properties"
          actionHref="/buy"
        />
      )}
    </div>
  );
}
