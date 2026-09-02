'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/api/admin';
import { Inquiry } from '@/types/inquiry';
import { MessageSquare, Phone, Mail, ExternalLink, Clock } from 'lucide-react';

export default function AdminInquiriesPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboard().then((res) => {
      if (res.data) setData(res.data);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const inquiries: Inquiry[] = data?.recent_inquiries || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Inquiries & Buyer Leads Audit
        </h1>
        <p className="text-xs text-slate-500">
          Platform-wide lead audit across residential and commercial listings.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400">Loading inquiries audit...</div>
      ) : inquiries.length > 0 ? (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div key={inq.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{inq.name}</h3>
                  <div className="text-xs text-slate-500">{inq.email} • {inq.phone}</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-50 text-purple-900 border border-purple-200">
                  {inq.status}
                </span>
              </div>

              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl italic">
                &ldquo;{inq.message}&rdquo;
              </div>

              {inq.property && (
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 pt-1">
                  <span className="truncate max-w-sm">Property: {inq.property.title}</span>
                  <Link
                    href={`/property/${inq.property.slug}`}
                    className="text-[#9333ea] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>View Listing</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500">
          No inquiries recorded yet.
        </div>
      )}
    </div>
  );
}
